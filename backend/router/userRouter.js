import express from "express"
import {AddDetailsUser, AddNewAdmin, AdminLogout, DeleteAppointmentUser, GetAllDoctors, GetUser, PatientLogout, UpdateUserElement, UserRegister, addNewDoctor, login} from "../controllers/userController.js"
import {isAdminAuthenticated,isPatientAuthenticated} from "../middleware/auth.js"
import multer from "multer"
import { DeleteWard, UpdateWardElement, getAllWards, postWard } from "../controllers/WardController.js"
import { DischargePatient, GetPatient, GetWardPatients, UpdatePatientElement, UpdatePatientElementId, getAllPatients, postAdmitPatient } from "../controllers/PatientAdmitController.js"

const user_router =express.Router()
const uploader=multer({
    storage:multer.diskStorage({}),
    limits:{filzesize:500000}
})
// post requests
user_router.post("/register",UserRegister)
user_router.post("/login",login)
user_router.post("/admin/addnew",isAdminAuthenticated,AddNewAdmin)
user_router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor)
user_router.post("/admin/postward",postWard)
user_router.post("/admin/admit-patient",postAdmitPatient)




// put requests
user_router.put("/update/:id",UpdateUserElement)
user_router.put("/add-details/:id",AddDetailsUser)

user_router.put("/ward/update/:id",UpdateWardElement)

user_router.put("/patient/update/:id",UpdatePatientElement)
user_router.put("/patient/updateId/:id",UpdatePatientElementId)
user_router.put("/patient/discharge/:id",DischargePatient)






// Delete Requests
user_router.delete("/delete/:id",DeleteAppointmentUser)
user_router.delete("/ward/delete/:id",DeleteWard)




// get requests
user_router.get("/patient/me",isPatientAuthenticated,GetUser)
user_router.get("/patient/logout",isPatientAuthenticated,PatientLogout)

user_router.get("/doctors",GetAllDoctors)
user_router.get("/admin/me",isAdminAuthenticated,GetUser)
user_router.get("/admin/logout",isAdminAuthenticated,AdminLogout)

user_router.get("/getallwards",getAllWards)


user_router.get("/getallpatients",getAllPatients)
user_router.get("/get-ward-patients/:id",GetWardPatients)
user_router.get("/get-patient/:id",GetPatient)












export default user_router