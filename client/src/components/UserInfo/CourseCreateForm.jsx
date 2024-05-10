import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

function CourseCreateForm() {
  const [courseData, setCourseData] = useState({
    name: "",
    desc: "",
    thumbnail: null,
    price: "",
    category: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, thumbnail: file });
  };

  const handleDescriptionChange = (value) => {
    setCourseData({ ...courseData, desc: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", courseData.name);
      formData.append("desc", courseData.desc);
      formData.append("thumbnail", courseData.thumbnail);
      formData.append("price", courseData.price);
      formData.append("category", courseData.category);

      const response = await fetch(
        `${apiUrl}/api/user/dashboard/createCourse`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Course Created Successfully");
        navigate("/dashboard");
      } else {
        toast.error("Course Creation Failed");
        console.error("Course Creation error");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
            Create Course
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
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
                required
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
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 p-2 block w-full border rounded-md"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1 p-2 block w-full border rounded-md"
                placeholder="Price"
                value={courseData.price}
                onChange={(e) =>
                  setCourseData({ ...courseData, price: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill Category
              </label>
              <select
                className="mt-1 p-2 block w-full border rounded-md"
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    category: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Skill Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Programming">Programming</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Management">Management</option>
                <option value="Media">Media</option>
                <option value="Communication">Communication</option>
                <option value="Finance">Finance</option>
                <option value="Economics">Economics</option>
                <option value="Crytocurrency & Blockchain">
                  Crytocurrency & Blockchain
                </option>
                <option value="Network & Security">Network & Security</option>
                <option value="Operating System">Operating System</option>
                <option value="Design">Design</option>
                <option value="Fitness">Fitness</option>
                <option value="Yoga">Yoga</option>
                <option value="Music">Music</option>
                <option value="Academics">Academics</option>
                <option value="Dance">Dance</option>
                <option value="Photography">Photography</option>
                <option value="Art & Craft">Art & Craft</option>{" "}
                <option value="Art & Craft">Cooking</option>{" "}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Create Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseCreateForm;
