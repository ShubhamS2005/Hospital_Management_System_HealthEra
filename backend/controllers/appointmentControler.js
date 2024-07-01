import {Appointment} from "../models/appointmentSchema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import { User } from "../models/user_scheema.js"


export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    appointmentDate,
    department,
    doctor_firstname,
    doctor_lastname,
    hasVisited,
    Address
    }=req.body
    if( !firstname||
        !lastname||
        !email||
        !phone||
        !dob||
        !gender||
        !appointmentDate||
        !department||
        !doctor_firstname||
        !doctor_lastname||
        !Address){
            return next(new ErrorHandler("please Fill full form",400))
        }
    const isConflict=await User.find({
        firstname:doctor_firstname,
        lastname:doctor_lastname,
        role:"Doctor",
        doctorDepartment:department
    })
    if(isConflict.length===0){
        return next(new ErrorHandler("No Doctor Found",400))
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("More than one doctor with same credentials ! please contact through Email or Phone",400))
    }
    const doctorId=isConflict[0]._id
    const patientId=req.user._id
    const appointment= await Appointment.create({
        firstname,
        lastname,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
        doctor:{
            firstname:doctor_firstname,
            lastname:doctor_lastname
        },
        hasVisited,
        Address,
        doctorId,
        patientId
    })
    res.status(200).json({
        success:true,
        message:"Appointment sent successfully",
        appointment
    })

})

export const getAllApointments=catchAsyncErrors(async(req,res,next)=>{
    const appointments=await Appointment.find()
    res.status(200).json({
        success:true,
        appointments,
    })
})

export const UpdateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let appointment=await Appointment.findById(id)
    if(!appointment){
       return next(new ErrorHandler("Appointment Not Found",404)) 
    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"Appointment Status Updated",
        appointment,
    })
})

export const DeleteAppointment=catchAsyncErrors(async(req,res,next)=>{
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

export const GetUserAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const appointment=await Appointment.find({patientId:id})
    if(!appointment){
       return next(new ErrorHandler("Appointment Not Found",404)) 
    }
    res.status(200).json({
        success:true,
        appointment,
    })
})