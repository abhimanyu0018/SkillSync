import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import { checkEnrollment } from "../controllers/checkEnrolledController.js";



const checkEnrollRouter = express.Router()

checkEnrollRouter.use(requireAuth)


checkEnrollRouter.post('/enroll',  checkEnrollment )


export default checkEnrollRouter