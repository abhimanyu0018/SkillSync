import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-white bg-[#003366] py-4">
      <div className="flex flex-col justify-between h-full">
        <div className="my-4">Contact us at our social media handles</div>
        <div className="flex justify-center items-center gap-2">
          {/* Social media icons */}
          <a
            href="https://www.linkedin.com/in/srijan-agrawal-961281240/"
            target="_blank"
            rel="noopener"
            className="hover:scale-125 transition-all ease-in-out duration-300"
          >
            <FaFacebook size={29} />
          </a>
          <a
            href="https://www.instagram.com/_srijan_agrawal_?igsh=dWtidG5wNzdrdDd1"
            target="_blank"
            rel="noopener"
            className="hover:scale-125 transition-all ease-in-out duration-300"
          >
            <FaInstagram size={29} />
          </a>
          <a
            href="https://www.linkedin.com/in/srijan-agrawal-961281240/"
            className="hover:scale-125 transition-all ease-in-out duration-300"
          >
            <FaLinkedin size={29} />
          </a>
        </div>
        <div className="flex justify-center my-4">
          {/* About and Contact links */}
          <NavLink to={"/about"} className="text-white mr-4 hover:underline">
            About Us
          </NavLink>
          <NavLink to={"/contact"} className="text-white hover:underline">
            Contact Us
          </NavLink>
        </div>
        <div className="text-white text-opacity-75 mt-auto">
          Copyright &copy; 2024 SkillSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
