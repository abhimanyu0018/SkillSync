import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            enum: ["male","female","other","none"],
            default: "none"
        },
        dob: {
            type: String,
            default: "none"
        },
        about: {
            type: String,
            default: "none"
        }
    },
    {timestamps: true}
)


export const Profile = mongoose.model("Profile",profileSchema)