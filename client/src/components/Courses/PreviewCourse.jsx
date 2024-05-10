import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import toast from "react-hot-toast";

function PreviewCourse() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigation = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCourses();
  }, []);

  const { token, courseIdEntry } = useContext(AuthContext);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/course/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseID: id }), // Sending course ID in the request body
      });
      console.log(response);
      const data = await response.json();
      setData(data);

      console.log("data", data);
      courseIdEntry(id);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  function extractDate(timestamp) {
    const date = new Date(timestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();

    // Formatting the date
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/dashboard/deleteCourse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: id }), // Sending course ID in the request body
        }
      );
      console.log("response for delete", response);
      if (response.ok) {
        navigation("/dashboard");
        toast.success("Course Delete Successfully");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendNotification = () => {
    setShowNotification(true);
  };

  const sendNotification = async () => {
    setShowNotification(false);
    console.log("Message sent:", message);
    try {
      const response = await fetch(
        `${apiUrl}/api/user/notification/sendbyinstrutor`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: id, notificationMessage: message }), // Sending course ID in the request body
        }
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    // Close the notification bar
    setShowNotification(false);
    // Reset the message input
    setMessage("");
  };

  return (
    <div className="mx-auto py-8 px-24 bg-gray-200">
      {data && (
        <>
          <span className="flex justify-end flex-wrap items-end lg:mx-[7rem]">
            <IconButton
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <SettingsIcon style={{ fontSize: 40 }} />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <NavLink to={`/editCourse/${id}`}>
                <MenuItem onClick={handleClose}>Edit Course</MenuItem>
              </NavLink>
              <NavLink onClick={deleteHandler}>
                <MenuItem onClick={handleClose}>Delete Course</MenuItem>
              </NavLink>
            </Menu>
          </span>
          <span className=" flex justify-center items-center flex-wrap mt-[-4rem]">
            <h2 className="font-bold text-3xl mb-4 text-gray-400">
              {data.category}
            </h2>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5">
            {/* Product Image */}
            <div className="md:order-1">
              <img
                src={data.thumbnail}
                alt={data.name}
                className="w-full rounded-lg shadow-lg h-[400px] object-cover"
              />
            </div>
            {/* Product Details */}
            <div className="md:order-2">
              <h2 className="text-3xl font-semibold mb-2">{data.name}</h2>
              <p className="text-gray-700 mb-4">
                This is Created By {data.instructor.firstName}{" "}
                {data.instructor.lastName} at {extractDate(data.createdAt)}
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">Price:</span>
                <span className="text-green-500 font-semibold mb-2 md:mb-0">
                  ₹{data.price}{" "}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">
                  Enrolled Students:
                </span>
                <span className="text-green-500 font-semibold mb-2 md:mb-0">
                  {data.enrolledStudents.length}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">
                  About Course Creator:
                </span>
                <span className="text-gray-500 font-semibold mb-2 md:mb-0">
                  {data.instructor.profile.about}{" "}
                </span>
              </div>
              <NavLink to={"/liveClass"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-6 mb-4">
                  Go Live
                </button>
              </NavLink>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSendNotification}
              >
                Send Notification
              </button>
              {showNotification && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-semibold mb-6">
                      Send Notification
                    </h2>

                    {/* Your message input */}
                    <textarea
                      className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2 mb-4"
                      placeholder="Type your notification message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {/* Send button */}
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      onClick={() => sendNotification()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">Course Overview</h2>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: data.desc }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewCourse;
