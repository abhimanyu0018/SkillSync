import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
        },
        desc: {
            type: String,
            require: true
        },
        thumbnail: {
            type: String,
            require: true
        },
        price: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
            // ref: "Category"
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isComplete: {
            type: Boolean,
            default: false,
        },
        liveCode: {
            type: String,
            default: "none"
        }
    },
    {timestamps: true}
)

// static create course method
// courseSchema.statics.createCourse = async function() {

// }

export const Course = mongoose.model("Course",courseSchema)