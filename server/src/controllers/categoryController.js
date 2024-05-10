import asyncHandler from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";



// Add new category to db
export const addCategory = asyncHandler( async (req,res) => {
    const { name } = req.body;

    try {
        const category = await Category.addCategory(name)

        res.status(200).json({ category })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        
    }
})

// get all category form db 

export const getAllCategoryAndCourse = asyncHandler( async (req,res) => {
    try {
        const categories = await Category.getAllCategory()

        const courses = await Course.find({}) 
        // console.log(courses)
        res.status(200).json({ categories: categories, courses: courses })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        
    }
})