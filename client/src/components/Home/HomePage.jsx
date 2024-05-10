import React, { useContext } from "react";
import Feature from "./Feature";
import Explore from "./Explore";
import Hero from "./Hero";
import Testimonial from "./Testimonial";
import FAQSection from "./FAQSection";
import Contact from "./Contact";
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {
  const { role } = useContext(AuthContext);
  return (
    <div>
      <Hero />
      {role !== "instructor" && <Explore />}
      <Feature />
      <Contact />
      <Testimonial />
      <FAQSection />
    </div>
  );
};

export default HomePage;
