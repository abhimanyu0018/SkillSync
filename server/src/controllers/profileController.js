import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";




// Fetch user details controller
export const getUserDetails = asyncHandler(async (req, res) => {

    const userId = req.user._id; 
    
    try {
        // Fetch user details 
        const user = await User.findById(userId).select('firstName lastName email role profile ');

        // Fetch profile 
        const profile = await Profile.findById(user.profile).select('gender dob about');

        
        const userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            gender: profile.gender,
            dob: profile.dob,
            about: profile.about
            
        };

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// Update profile controller
export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { firstName, lastName, password, gender, dob, about } = req.body;

    try {
        // Update firstName and lastName in the User model
        const user = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName },
            { new: true }
        );

        // Update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            user.password = hash;
        }

        // Update profile attributes
        const profile = await Profile.findByIdAndUpdate(
            user.profile,
            {gender, about, dob },
            { new: true }
        );

        // Save user and profile changes
        await user.save();
        await profile.save();

        res.status(200).json({ user, profile });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});
