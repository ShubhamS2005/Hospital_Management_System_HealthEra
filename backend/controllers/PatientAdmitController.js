import {Ward} from "../models/WardModel.js"
import {User} from "../models/user_scheema.js"
import {PatientAdmit} from "../models/PatientAdmitSchema.js"

import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"


export const postAdmitPatient=catchAsyncErrors(async(req,res,next)=>{
    const {
    firstname,
    lastname,
    email,
    phone,
    dob,
    gender,
    admitDate,
    wardname,
    room_name,
    admited,
    department,
    doctor_firstname,
    doctor_lastname,
    }=req.body
    if( !firstname||
        !lastname||
        !email||
        !phone||
        !dob||
        !gender||
        !admitDate||
        !wardname||
       !room_name||
        !admited||
        !department||
        !doctor_firstname||
        !doctor_lastname
    )
        {
        return next(new ErrorHandler("please Fill full form",400))
        }

    // Doctor Id gathered
    const isConflictDoctor=await User.find({
        firstname:doctor_firstname,
        lastname:doctor_lastname,
        role:"Doctor",
        doctorDepartment:department,
    })
    if(isConflictDoctor.length===0){
        return next(new ErrorHandler("No Doctor Found",400))
    }
    const doctorId=isConflictDoctor[0]._id

     // Ward Id Gathered
     const isWard=await Ward.findOne({
        wardname:wardname
    })
    if(!isWard){
        return next(new ErrorHandler("No Ward Found",400))
    }
    

    //patient id Gathered
    const isPatient=await User.findOne({
        email:email,
    })
    if(!isPatient){
        const spassword="1234"
        const patient=await User.create({
            firstname,lastname,email,phone,dob,gender,password:spassword,role:'Patient'
        })
        const patientAdmit=await PatientAdmit.create({
            firstname,
            lastname,
            email,
            phone,
            dob,
            gender,
            admitDate,
            doctorId,
            patientId:patient._id,
            wardId:isWard._id,
            wardname,
            room_name,
            admited,
            department,
            doctor:{
                firstname:doctor_firstname,
                lastname:doctor_lastname
            },
        })
        const bedCount= isWard.number_of_beds
        const bedUpdate=await Ward.findByIdAndUpdate(isWard._id,
            {
                number_of_beds:bedCount-1
            },{
                new:true,
                runValidators:true,
                useFindAndModify:false,
            }
        )

    
        res.status(200).json({
            success:true,
            message:"Patient Admited successfully",
            patientAdmit,
            patient,
            bedUpdate
        })
    }
    else{
        const isPatientId=isPatient._id
        const patientAdmit=await PatientAdmit.create({
            firstname,
            lastname,
            email,
            phone,
            dob,
            gender,
            admitDate,
            doctorId,
            patientId:isPatientId,
            wardId:isWard._id,
            wardname,
            room_name,
            admited,
            department,
            doctor:{
                firstname:doctor_firstname,
                lastname:doctor_lastname
            },
        })
        const bedCount= isWard.number_of_beds
        const bedUpdate=await Ward.findByIdAndUpdate(isWard._id,
            {
                number_of_beds:bedCount-1
            },{
                new:true,
                runValidators:true,
                useFindAndModify:false,
            }
        )

        res.status(200).json({
            success:true,
            message:"Patient Admited successfully",
            patientAdmit,
            bedUpdate
        })
    }

})

export const getAllPatients=catchAsyncErrors(async(req,res,next)=>{
    const patients=await PatientAdmit.find()
    res.status(200).json({
        success:true,
        patients,
    })
})


export const GetWardPatients=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const wardmates=await PatientAdmit.find({wardId:id})
    const wardname= wardmates[0].wardname
    const roomname= wardmates[0].room_name
    if(!wardmates){
       return next(new ErrorHandler("No Ward Found",404)) 
    }
    res.status(200).json({
        success:true,
        wardmates,
        wardname,
        roomname
    })
})


export const UpdatePatientElement=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let Patient=await PatientAdmit.findById(id)
    if(!Patient){
       return next(new ErrorHandler("Patient Not Found",404)) 
    }
    Patient=await PatientAdmit.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"Patient Details Updated",
        Patient,
    })
})

export const UpdatePatientElementId=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const {oldid,wardname,room_name}=req.body
    let Patient=await PatientAdmit.findById(id)
    if(!Patient){
       return next(new ErrorHandler("Patient Not Found",404)) 
    }
    let NewWard=await Ward.findOne({wardname:wardname,room_name:room_name})
    let newBeds=NewWard.number_of_beds-1
    
    NewWard=await Ward.findByIdAndUpdate(NewWard._id,{
        number_of_beds:newBeds,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })


    Patient=await PatientAdmit.findByIdAndUpdate(id,
        {
            wardname:wardname,
            room_name:room_name,
            wardId:NewWard._id,
        },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    
    let OldWard=await Ward.findById(oldid)
  
    let oldBeds=OldWard.number_of_beds+1
     OldWard=await Ward.findByIdAndUpdate(oldid,{
        number_of_beds:oldBeds
     },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    


    if(!OldWard){
        return next(new ErrorHandler("Something Went Wrong",404)) 
    }
    if(!NewWard){
        return next(new ErrorHandler("WardName or Roomname wrong",404))
    }


    res.status(200).json({
        success:true,
        message:"Patient Details Updated",
        Patient,
        NewWard,
        OldWard
    })
})

export const GetPatient=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const patient=await PatientAdmit.findById(id)
    const PatientData=await User.findOne({_id:patient.patientId})
    let ward=await Ward.findById(patient.wardId)
    
    if(!patient){
        return next(new ErrorHandler("Patient Not Found",404)) 
    }
    res.status(200).json({
        success:true,
        patient,
        PatientData,
        ward
    })
})

export const DischargePatient=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const {wardId}=req.body
    let Patient=await PatientAdmit.findById(id)

    if(!Patient){
       return next(new ErrorHandler("Patient Not Found",404)) 
    }

    const Currentdate=new Date()
    let difference_in_time=Currentdate.getTime()-Patient.admitDate.getTime()
    let difference_in_days=Math.floor(difference_in_time/(1000*3600*24))
            
    let ward=await Ward.findById(wardId)
    if(!ward){
        return next(new ErrorHandler("Ward Not Found",404)) 
     }

    let cost=difference_in_days*ward.price

    let Beds=ward.number_of_beds+1
     ward=await Ward.findByIdAndUpdate(wardId,{
        number_of_beds:Beds
     },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    Patient=await PatientAdmit.findByIdAndUpdate(id,
        {
            is_discharged:1,
            cost:cost,
            number_of_days:difference_in_days,
            discharge_date:Currentdate
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
            
    
    res.status(200).json({
        success:true,
        difference_in_days,
        Patient,
        message:"Patient is Discharged",
        cost,
        ward
    })  
})

