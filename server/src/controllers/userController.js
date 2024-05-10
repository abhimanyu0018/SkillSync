import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Profile } from "../models/profile.model.js"; 

import jwt from "jsonwebtoken"


const  createToken = (_id) => {
   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login controller
export const loginUser = async (req,res) => {
    
    const {email,password} = req.body;
    
    try {
        const user = await User.login(email, password)

        //create Token
        const token = createToken(user._id)
        
        res.status(200).json({email,role: user.role,firstName: user.firstName,lastName: user.lastName, token})

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
        
    }
    
}

//signup controller
export const signupUser = asyncHandler( async (req,res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password, role)

         // Create Profile for the user
         const profile = await Profile.create({});

         // Update user's profile reference
         user.profile = profile._id;
         await user.save();

        //create Token
        const token = createToken(user._id)

        res.status(200).json({email,role: user.role,firstName: user.firstName,lastName: user.lastName, token})
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
   

})
