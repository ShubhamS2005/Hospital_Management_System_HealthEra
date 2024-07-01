import mongoose from "mongoose";
import validator from "validator";

const messageScheema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:[3,"first name must contain atleast three characters "]
    },
    lastname:{
        type:String,
        required:true,
        minlength:[3,"last name must contain atleast three characters "]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[11,"phone number must contain eleven digits "]
    },
    message:{
        type:String,
        required:true,
        minlength:[10,"message must contain atleast 10 chaacters "]
    },
})

export const Message=mongoose.model("Message",messageScheema)