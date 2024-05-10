import React from "react";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <section style={{ backgroundColor: "#667eea" }}>
        <div className="container mx-auto px-6 text-center py-20">
          <h2 className="mb-6 text-4xl font-bold text-center text-white">
            Elevate Your Web Experience Today!
          </h2>
          <p className="my-4 text-xl text-white">
            We're passionate about crafting exceptional web experiences tailored
            to your needs. Share your feedback with us, and let's embark on a
            journey to transform your online presence.
          </p>
          <NavLink to={"/contact"}>
            <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
              Contact Us
            </button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Contact;
