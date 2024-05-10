import React from "react";
import avatar from "../../imageAssets/avatar1.png";
import avatar2 from "../../imageAssets/avatar2.png";

const Testimonial = () => {
  const Reviews = [
    {
      id: 1,
      Role: "Data Analyst",
      description: `“SkillSync transformed our family's learning journey. Safe, interactive, and progress tracking features are invaluable for parents.”`,
      name: "Abhimanyu Kanaujia",
      avatar: avatar,
    },
    {
      id: 2,
      Role: "Full Stack Developer",
      description: `“SkillSync transformed our family's learning journey. Safe, interactive, and progress tracking features are invaluable for parents.”`,
      profilePic: "https://example.com/profile2.jpg",
      name: "Srijan Agrawal",
      avatar: avatar2,
    },
    {
      id: 3,
      Role: "Software Developer",
      description: `“SkillSync, a true game-changer! Flexible content, tailored assessments, and excellent support. Integral to our school district's success.”`,
      profilePic: "https://example.com/profile3.jpg",
      name: "Shreyansh Vyas",
      avatar: avatar,
    },
  ];
  return (
    // Testimonial components
    <div className="px-8 py-8 mx-auto max-w-screen-lg">
      {/* testimonial content */}
      <div className="flex flex-col gap-8 justify-center items-center">
        <h2 className="text-3xl font-bold">What Others Say About Us</h2>
        {/* testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-8">
          {/* testimonial cards */}
          {Reviews.map((Review) => (
            <div
              key={Review.id}
              className="flex flex-col justify-center items-center border border-gray-300 rounded-lg shadow-md p-6 gap-4  ease-in-out duration-300 hover:shadow-lg hover:border-blue-500 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036"
              >
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              {/* testimonial text */}
              <div className="text-gray-700 text-sm">{Review.description}</div>
              {/* testimonial details */}
              <div className="flex flex-col items-center">
                <h3 className=" text-base font-bold text-gray-800">
                  {Review.name}
                </h3>
                <p className="text-gray-800 text-sm">{Review.Role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
