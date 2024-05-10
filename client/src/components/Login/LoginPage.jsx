import React, { useContext } from "react";
import loginImg from "../../imageAssets/loginImage.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const { setIsLoggedIn, login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const navigation = useNavigate();
  

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to backend
      const response = await fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const UserName = `${data.firstName} ${data.lastName}`
      if (response.ok) {
        // Handle successful login
        login(data.token, data.email, data.role, UserName);
        console.log("Login successful:", data);
        toast.success("Login Successfully");
        // You can perform additional actions here, such as redirecting to another page
        navigation("/dashboard");
        // Set the login state true here
        setIsLoggedIn(true);
      } else {
        // Handle authentication error
        console.error("Login failed");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle any other errors
      console.error("Login error:", error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-full">
        {/* Left: Image  */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={loginImg}
            alt="Placeholder Image"
            className="object-cover w-full h-full "
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>

          {/* Form Started */}
          <form onSubmit={submitHandler}>
            {/* Username Input */}
            <label className="mb-7">
              <p className="block text-gray-600">Email Address</p>
              <input
                required
                type="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Enter your Email address"
                name="email"
                autoComplete="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              />
            </label>

            {/* Password Input  */}
            <label className="mb-4 relative">
              <p className="block text-gray-600">Password</p>
              <input
                required
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={changeHandler}
                name="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              />
              {/* show password icon */}
              <span
                className="absolute cursor-pointer right-4 top-[4.2rem]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} />
                ) : (
                  <AiOutlineEye fontSize={24} />
                )}
              </span>
            </label>

            {/* Login Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-4">
              Login
            </button>
          </form>
          {/* Sign up  Link */}
          <NavLink to="/signup">
            <div className="mt-6 text-blue-500 text-center">
              <div className="hover:underline">Sign up Here</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
