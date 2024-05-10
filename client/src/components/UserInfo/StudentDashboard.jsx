import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoIosPricetags } from "react-icons/io";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCourses();
  }, []);

  console.log("courses =>", courses);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include your authentication token here
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCourses(data.courses.courses);
      console.log("data =>", data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };
  return (
    <div>
      {" "}
      <div className="container min-h-screen mx-auto py-8 ">
        <div className=" p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold mb-4">
              Welcome to Your Dashboard
            </h1>
            {courses.length === 0 ? (
              <div></div>
            ) : (
              <NavLink to={"/explore"}>
                <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Explore Skills
                </button>
              </NavLink>
            )}
          </div>

          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>

          <div className="px-6 py-8">
            {courses.length === 0 ? (
              <div>
                <h1 className="text-3xl font-semibold text-center mb-4">
                  No Courses
                </h1>
                <div className="text-center mb-8">
                  <p className="text-gray-700">
                    You haven't enrolled any courses yet. Start your learning
                    journey now!
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <NavLink to={"/explore"}>
                    <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                      Explore Skills
                    </button>
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {courses.map((course) => (
                  //courses cards
                  <NavLink key={course._id} to={`/course/${course._id}`}>
                    <div className="rounded overflow-hidden shadow-lg flex flex-col hover:cursor-pointer w-full h-full">
                      <div className="relative">
                        <img
                          className="w-full object-cover h-[250px]"
                          src={course.thumbnail}
                          alt={course.name}
                          loading="lazy"
                        />
                        <div className="hover:opacity-25 transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-800 opacity-15"></div>
                        <div className="text-xs absolute top-0 right-0 bg-blue-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-blue-600 transition duration-500 ease-in-out">
                          {course.category}
                        </div>
                      </div>
                      <div className="px-6 py-4 mb-auto bg-white">
                        <div className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out  mb-2">
                          {course.name}
                        </div>
                        <p
                          className="text-gray-700 mb-6"
                          dangerouslySetInnerHTML={{
                            __html: truncateDescription(course.desc, 75),
                          }}
                        />{" "}
                      </div>
                      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span className="py-1 text-xs font-regular text-gray-800 mr-1 flex flex-row items-center">
                          <IoIosPricetags size={20} />
                          <span className="ml-1 text-base">
                            ₹{course.price}
                          </span>
                        </span>
                        <span className="flex justify-center items-center gap-1 text-white bg-blue-600 py-2 px-4 rounded-xl shadow-md  transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black">
                          View Skill
                        </span>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
