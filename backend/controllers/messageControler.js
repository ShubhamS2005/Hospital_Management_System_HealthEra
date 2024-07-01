import { Message } from "../models/message_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"

export const sendMessage=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,phone,message}=req.body
    if(!firstname||!lastname||!email||!phone||!message){
        return next(new ErrorHandler("Please fill full form",400));
    }
    await Message.create({firstname,lastname,email,phone,message})
    res.status(200).json({
        success:true,
        message:"Message send succesfully"  
    })
})
export const GetAllMessages=catchAsyncErrors(async(req,res,next)=>{
   const messages=await Message.find()
   res.status(200).json({
    success:true,
    messages
   })
})

