// CourseCards.js

import React, { useState, useEffect, useContext } from "react";
import { IoIosPricetags } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const CourseCards = ({ selectedCategory, searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const { token } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, searchQuery]); // Fetch courses whenever selectedCategory or searchQuery changes

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/category/explore`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // Filter courses based on selectedCategory and searchQuery
      const filteredCourses = data.courses.filter(
        (course) =>
          (selectedCategory === "All" ||
            course.category === selectedCategory) &&
          (course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setCourses(filteredCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <NavLink
            key={index}
            to={{ pathname: `/course/${course._id}`, state: { course } }}
          >
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
                    __html: truncateDescription(course.desc, 100),
                  }}
                />{" "}
              </div>
              <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs font-regular text-gray-800 mr-1 flex flex-row items-center">
                  <IoIosPricetags size={20} />
                  <span className="ml-1 text-base">₹{course.price}</span>
                </span>

                <span className="flex justify-center items-center gap-1 text-white bg-blue-600 py-2 px-4 rounded-xl shadow-md  transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-black">
                  View Skill
                </span>
              </div>
            </div>{" "}
          </NavLink>
        ))
      ) : (
        <div className="text-gray-700 w-full h-full col-span-5 text-center text-5xl my-10">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CourseCards;
