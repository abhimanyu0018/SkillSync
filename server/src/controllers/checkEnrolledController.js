// Middleware to check if the user is already enrolled in the course
import { User } from "../models/user.model.js";

export const checkEnrollment = async (req, res) => {
    try {
      const userId = req.user._id;
      const { courseId } = req.body; 
  
      // Check if the user is enrolled or not

      const user = await User.findById(userId).populate("courses");

      const enrolledCourses = user.courses.map(course => course._id.toString());
  
      if (enrolledCourses.includes(courseId)) {
        return res.status(400).json({ success: false, error: "User is already enrolled in this course." });
      }
  
      // If not enrolled, proceed to the next
      else 
      res.status(200).json({success: true, message: "can proceed to payment"});

    } catch (error) {
      console.error("Error checking enrollment:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

  