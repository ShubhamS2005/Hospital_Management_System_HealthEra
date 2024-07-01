import {Ward} from "../models/WardModel.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
export const postWard=catchAsyncErrors(async(req,res,next)=>{
    const {
        wardname,
        number_of_beds,
        price,
        room_name,
        facilities,
        capacity,
    }=req.body
    if( !wardname||
        !number_of_beds||
        !price||
        !room_name||
        !facilities||
        !capacity
    ){
            return next(new ErrorHandler("please Fill full form",400))
        }
    const totalRooms=(number_of_beds/capacity)

    const isConflict=await Ward.find({
        wardname:wardname
    })
    
    if(isConflict.length>1){
        return next(new ErrorHandler("Ward Name is already Present",400))
    }
    const ward= await Ward.create({
        wardname,
        number_of_beds,
        price,
        room_name,
        facilities,
        capacity,   
        number_of_rooms:totalRooms
    })
    res.status(200).json({
        success:true,
        message:"Ward Data Added Succesfuly",
        ward
    })
})

export const getAllWards=catchAsyncErrors(async(req,res,next)=>{
    const wards=await Ward.find()
    let total_beds=0
    let total_price=0
    let total_rooms=0
    let availableBeds=0

    
    for(let i=0;i<wards.length;i++){
        total_beds=(wards[i].number_of_rooms)*(wards[i].capacity)+total_beds
        total_rooms=wards[i].number_of_rooms+total_rooms
        total_price=wards[i].price+total_price

        availableBeds=wards[i].number_of_beds+ availableBeds
    }
    
    res.status(200).json({
        success:true,
        wards,
        total_beds,
        total_price,
        total_rooms,
        availableBeds
        
    })
})

export const UpdateWardElement=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let ward=await Ward.findById(id)
    if(!ward){
       return next(new ErrorHandler("Ward Not Found",404)) 
    }
    ward=await Ward.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"Ward Details Updated",
        ward,
    })
})

export const DeleteWard=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let ward=await Ward.findById(id)
    if(!ward){
       return next(new ErrorHandler("Appointment Not Found",404)) 
    }
    await ward.deleteOne()
    res.status(200).json({
        success:true,
        message:"Ward Details Deleted"
    })
})

