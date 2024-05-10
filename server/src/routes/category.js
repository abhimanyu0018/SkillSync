import express from "express";
import { addCategory,getAllCategoryAndCourse } from "../controllers/categoryController.js";


const categoryRouter = express.Router();

// router for -  add category 

categoryRouter.post('/addCategory', addCategory)

// router for - get all categories

categoryRouter.get('/explore', getAllCategoryAndCourse)


export default categoryRouter;