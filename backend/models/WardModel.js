import mongoose from "mongoose";


const wardScheema=new mongoose.Schema({
    wardname:{
        type:String,
        required:true,
        minlength:[3,"ward name must contain atleast three characters "]
    },
    number_of_beds:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        requied:true,
    },
    room_name:{
        type:String,
        required:true,
        minlength:[3,"room name must contain atleast three characters "]
    },
    facilities:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
    number_of_rooms:{
        type:Number,
        required:true,
    }
    
})
export const Ward=mongoose.model("ward",wardScheema)