import express from "express";
import { getInstructerInfo } from "../controllers/courseController.js"
import  requireAuth  from "../middlewares/requireAuth.js"


const instructorRouter = express.Router()

instructorRouter.use(requireAuth)

// get instructor info route 

instructorRouter.post('/', getInstructerInfo )



export default instructorRouter