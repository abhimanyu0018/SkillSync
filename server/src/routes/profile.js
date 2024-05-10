import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import { getUserDetails,updateProfile } from "../controllers/profileController.js"





const profileRouter = express.Router()

profileRouter.use(requireAuth)
// get profile info route

profileRouter.get('/', getUserDetails )

// edit profile info route

profileRouter.post('/save', updateProfile )


export default profileRouter;