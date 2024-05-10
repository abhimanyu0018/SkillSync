import React, { useContext } from "react";
import SkillSearchBar from "./SkillSearchBar";
import { AuthContext } from "../../context/AuthContext";
import heroImg from "../../Assets/newHero.svg";
import { NavLink } from "react-router-dom";
const Hero = () => {
  const { role } = useContext(AuthContext);
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Background Image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="animate-typing text-5xl font-bold leading-tight mb-4">
          {" "}
          Learn from the best, teach the world
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          {" "}
          SkillSync is an online learning platform offering courses taught by
          world-renowned experts. Explore a wide range of skills and get started
          today.
        </p>
        {role === "instructor" && (
          <NavLink to={"/dashboard"}>
            <div className="animate-bounce hover:cursor-pointer inline-flex text-md font-medium bg-blue-500 mt-3 px-4 py-4 rounded-lg tracking-wide text-white">
              <span class="ml-2">Get Started</span>
            </div>
          </NavLink>
        )}
        {role === "student" && <SkillSearchBar />}
        {role !== "instructor" && role !== "student" && <SkillSearchBar />}
      </div>
    </div>
  );
};

export default Hero;
