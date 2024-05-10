import { Course } from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";

//course Controller

// controller for creating course
export const createCourse = async (req, res) => {
  try {
    const { name, desc, price, category } = req.body;
    const instructor = req.user; // Assuming the authenticated user is the instructor
    // console.log(req.body)
    // Check if a course with the same name exists for the instructor
    const existingCourse = await Course.findOne({ name, instructor });

    if (existingCourse) {
      return res
        .status(400)
        .json({
          error: "Course with the same name already exists for this instructor",
        });
    }

    // Upload thumbnail to Cloudinary
    const thumbnailUrl = await uploadThumbnail(req.file);

    // Create the course
    const course = new Course({
      name,
      desc,
      thumbnail: thumbnailUrl,
      price,
      category,
      instructor: instructor._id,
    });

    await course.save();

    // Update the user's courses array
    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: course._id },
    });

    return res.status(201).json(course);
  } catch (error) {
    // Handle errors
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Function to upload thumbnail to Cloudinary
const uploadThumbnail = async (file) => {
  try {
    if (!file) {
      throw new Error("No thumbnail uploaded");
    }

    // Get local file path
    const localFilePath = file.path;

    // Upload the file on Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    // Return the URL of the uploaded thumbnail
    return cloudinaryResponse.url;
  } catch (error) {
    throw error;
  }
};

// controller for fetch user courses
export const getMyCourse = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user)

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let courses;

    if (user.role === "student") {
      // If user is a student, fetch courses they are enrolled in
      courses = await User.findById(user._id).populate("courses");
    } else if (user.role === "instructor") {
      // If user is an instructor, fetch courses they have created
      courses = await Course.find({ instructor: user._id });
    } else {
      // Invalid user role
      return res.status(400).json({ error: "Invalid user role" });
    }

    res.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getInstructerInfo = async (req, res) => {
  const { courseID } = req.body;

  try {
    const course = await Course.findById(courseID).populate({
      path: "instructor",
      populate: {
        path: "profile",
        model: "Profile",
        select: "gender dob about",
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Remove the password
    if (course && course.instructor) {
      course.instructor.password = undefined;
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for deleting course

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // if (course.instructor.toString() !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to delete this course" });
    // }
    
    // Delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // Return success message
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: error.message });
  }
};

// update a course

export const updateCourse = async (req, res) => {
  const { courseId, name, desc } = req.body;
  const userId = req.user._id;

  try {
    // Find and update the course by ID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        name,
        desc,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (updatedCourse.instructor.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this course" });
    }

    // Return the updated course
    return res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
