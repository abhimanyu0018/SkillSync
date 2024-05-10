import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";

// Controller function to send notification email to all enrolled students of a course
export const sendNotificationEmail = async (req, res) => {
    const { courseId } = req.body;
    
    try {
        // Check if the user is an instructor
        if (req.user.role !== 'instructor') {
            return res.status(403).json({ success: false, message: "You are not authorized to send notification emails" });
        }
        
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        
        // Set up Nodemailer transporter
        const notificationMessage = `your live class for ${course.name}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // Your project's Gmail password
            }
        });

        // Get enrolled students' email addresses
        const enrolledStudentsEmails = await getEnrolledStudentsEmails(course);

        // Set up email options
        const mailOptions = {
            from: 'SkillSync', // Sender address
            to: enrolledStudentsEmails.join(', '), // Receiver addresses (enrolled students)
            subject: 'Notification: Live Session Started', // Email subject
            text: notificationMessage 
            
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: "Failed to send notification email" });
            }
            console.log('Notification email sent:', info.response);
            return res.status(200).json({ success: true, message: "Notification email sent successfully" });
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};


export const sendNotificationEmailByInstrutor = async (req, res) => {
    const { courseId, notificationMessage } = req.body;
    
    try {
        // Check if the user is an instructor
        if (req.user.role !== 'instructor') {
            return res.status(403).json({ success: false, message: "You are not authorized to send notification emails" });
        }
        
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        
        // Set up Nodemailer transporter
        // const notificationMessage = `your live class for ${course.name}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // Your project's Gmail password
            }
        });

        // Get enrolled students' email addresses
        const enrolledStudentsEmails = await getEnrolledStudentsEmails(course);

        // Set up email options
        const mailOptions = {
            from: 'SkillSync', // Sender address
            to: enrolledStudentsEmails.join(', '), // Receiver addresses (enrolled students)
            subject: 'Notification: Live Session Started', // Email subject
            text: notificationMessage 
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: "Failed to send notification email" });
            }
            console.log('Notification email sent:', info.response);
            return res.status(200).json({ success: true, message: "Notification email sent successfully" });
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Helper function to get enrolled students' email addresses
const getEnrolledStudentsEmails = async (course) => {
    const enrolledStudents = await User.find({ _id: { $in: course.enrolledStudents } });
    return enrolledStudents.map(student => student.email);
};


