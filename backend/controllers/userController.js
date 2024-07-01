import {User} from "../models/user_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
import { Appointment } from "../models/appointmentSchema.js"

export const UserRegister=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phone,dob,gender,password,role,doctorDepartment}=req.body
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!password||!role){
        return next(new ErrorHandler("Please fill full form",400));
    }
    const user=await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User Already registered",400));
    }
    else{
        await User.create({firstname,lastname,email,phone,dob,gender,password,role,doctorDepartment})
        // generateToken(user,"user registered",200,res)
        res.status(200).json({
            success:true,
            message:"User Registered"
        })
    }
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,role,confirmPassword}=req.body;
    if(!email||!password||!confirmPassword||!role){
        return next(new ErrorHandler("Please Provide all details",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and confirm password not same",400));
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",400));
    }
    generateToken(user,"User Logged in Successfully",200,res)
})

export const AddNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phone,dob,gender,password}=req.body
    if(!firstname||!lastname||!email||!phone||!dob||!gender||!password){
        return next(new ErrorHandler("Please fill full form",400));
    }
    const isRegistered=await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email exists`,400));
    }
    const admin=await User.create({firstname,lastname,email,phone,dob,gender,password,role:"Admin"})
    res.status(200).json({
        success:true,
        message:"New Admin is added"
    })

})

export const GetAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"})
    res.status(200).json({
        success:true,
        doctors
    })

})

export const GetUser=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })

})

export const AdminLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Admin Log out succesfully"
    })
})

export const PatientLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Patient Log out succesfully"
    })
})


export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

export const UpdateUserElement=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params
  let user=await User.findById(id)
  if(!user){
     return next(new ErrorHandler("User Not Found",404)) 
  }
  user=await User.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
  })
  res.status(200).json({
      success:true,
      message:"Status Updated",
      user,
  })
})

export const DeleteAppointmentUser=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params
  let appointment=await Appointment.findById(id)
  if(!appointment){
     return next(new ErrorHandler("Appointment Not Found",404)) 
  }
  await appointment.deleteOne()
  res.status(200).json({
      success:true,
      message:"Appointment Deleted"
  })
})

export const AddDetailsUser=catchAsyncErrors(async(req,res,next)=>{
  const {id}=req.params
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Patient Avatar Required!", 400));
  }
  const { patientAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(patientAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    bloodgrp,
    height,
    weight,
    MedicalHistory
  } = req.body;
  if (
    !bloodgrp||
    !height||
    !weight||
    !MedicalHistory||
    !patientAvatar  
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findById(id);
  if (!isRegistered) {
    return next(
      new ErrorHandler("Patient Not Found", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    patientAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Patient Avatar To Cloudinary", 500)
    );
  }
  const patient= await User.findByIdAndUpdate(id,
    {
    bloodgrp,
    height,
    weight,
    MedicalHistory,
    patientAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false,
}
)
  res.status(200).json({
    success: true,
    message: "Patient is Updated",
    patient,
  });

})