import express from "express"
import { UpdateAppointmentStatus, getAllApointments, postAppointment ,DeleteAppointment, GetUserAppointment} from "../controllers/appointmentControler.js"
import {isAdminAuthenticated,isPatientAuthenticated} from "../middleware/auth.js"

const appointment_router =express.Router()

appointment_router.post("/post",isPatientAuthenticated,postAppointment)
appointment_router.get("/getall",isAdminAuthenticated,getAllApointments)
appointment_router.put("/update/:id",isAdminAuthenticated,UpdateAppointmentStatus)

appointment_router.delete("/delete/:id",isAdminAuthenticated,DeleteAppointment)

appointment_router.get("/get-appointment/:id",isPatientAuthenticated,GetUserAppointment)













export default appointment_router