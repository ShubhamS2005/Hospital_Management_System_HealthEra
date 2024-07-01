import express from "express"
import {GetAllMessages, sendMessage} from "../controllers/messageControler.js"
import { isAdminAuthenticated } from "../middleware/auth.js"


const router =express.Router()
router.post("/send",sendMessage)
router.get("/getallmessages",isAdminAuthenticated,GetAllMessages)

export default router