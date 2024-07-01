import mongoose from "mongoose";
import validator from "validator";


const PatientAdmitScheema=new mongoose.Schema({
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
        minlength:[10,"phone number must contain Ten digits "],
        maxlength:[10,"phone number must contain Ten digits "]

    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    department:{
        type:String,
        required:true,
    },
    admitDate:{
        type:Date,
        required:true
    },
    doctor:{
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
    },
    wardId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    wardname:{
        type:String,
        required:true,
    },
    room_name:{
        type:String,
        required:true,
    },
    number_of_days:{
        type:Number,
    },
    cost:{
        type:Number,
    },
    is_discharged:{
        type:Number,
        default:0
    },
    admited:{
        type:String,
        required:true,
        enum:["OPD","Emergency","Referal"]
    },
    discharge_date:{
        type:Date,
    },

})
export const PatientAdmit=mongoose.model("patientAdmit",PatientAdmitScheema)