import React, { useState, useEffect, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import CourseCards from "./CourseCards";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const ExplorePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetchCategories();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const fetchCategories = async () => {
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
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  return (
    <div className="h-full w-full">
      <div className="mx-auto py-3 overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <div className="w-full text-gray-700 md:text-center text-4xl font-semibold">
            Explore Skills
          </div>
        </div>
        <div className="relative mt-6 max-w-lg mx-auto mb-10">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <IoSearch size={20} />
          </span>

          <input
            className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Dropdown menu for selecting categories */}
        <div className="mt-4 mb-5 mx-auto max-w-md">
          <select
            className="w-full border rounded-md pl-2 pr-8 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* All Cards things are here */}

        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-medium text-gray-700 ml-6">
              Top {selectedCategory} Courses
            </h3>
          </div>

          {/* cards */}

          <div className="h-full w-full p-3">
            <CourseCards
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
