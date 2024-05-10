import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useParams } from "react-router-dom";

function EditCourse() {
  const [courseData, setCourseData] = useState({
    name: "",
    desc: "",
  });
  const { id } = useParams();
  const navigation = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const { token } = useContext(AuthContext);

  const handleDescriptionChange = (value) => {
    setCourseData({ ...courseData, desc: value });
  };

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
      setCourseData(data);

      console.log("data", data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${apiUrl}/api/user/dashboard/updateCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            name: courseData.name,
            desc: courseData.desc,
          }), // Sending course ID in the request body
        }
      );
      console.log(response);
      navigation("/dashboard");
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
            Edit Course
          </h2>
          <form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <input
                type="text"
                className="mt-1 p-2 block w-full border rounded-md"
                placeholder="Course Name"
                value={courseData.name}
                onChange={(e) =>
                  setCourseData({ ...courseData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={courseData.desc}
                onChange={handleDescriptionChange}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "video",
                ]}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Edit Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
