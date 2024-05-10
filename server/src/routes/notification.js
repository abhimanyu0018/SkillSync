import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import {sendNotificationEmail, sendNotificationEmailByInstrutor} from "../controllers/notificationController.js"

const notificationRouter = express.Router()


notificationRouter.use(requireAuth)


notificationRouter.post('/send', sendNotificationEmail)
notificationRouter.post('/sendbyinstrutor', sendNotificationEmailByInstrutor)


export default notificationRouter