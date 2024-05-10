import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    gender: "",
    dob: "",
    about: "",
    password: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const { token , login } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api/user/dashboard/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await response.json();
      // Check if userData is not null or undefined before setting the state
      const userName = `${userData.firstName} ${userData.lastName}`
      login(token , userData.email , userData.role , userName)


      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        role: userData.role || "",
        gender: userData.gender || "none",
        dob: userData.dob || "2024-04-10",
        about: userData.about || "none",
        password: userData.password || "",
      });
    } catch (error) {
      console.error("Error fetching user details: ", error);
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEdit(false);
    try {
      // Make request to update profile with formData
      const response = await fetch(
        `${apiUrl}/api/user/dashboard/profile/save`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast.success("Profile Changed Successfully");
        const userName = `${formData.firstName} ${formData.lastName}`
        login(token , formData.email , formData.role , userName)

      } else {
        toast.error("Profile Changes Error");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile");
    }
    console.log(formData);
  };

  return (
    <section className="py-10 bg-gray-100 bg-opacity-50 bg-gradient-to-r from-blue-100 via-gray-100   to-blue-100">
      <div className="mx-auto container max-w-5xl shadow-md bg-gray-100">
        <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-blue-400 rounded-t">
          <h1 className="text-center text-3xl">My Profile</h1>
        </div>
        <form className="bg-white space-y-6" onSubmit={handleSubmit}>
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto text-3xl">Account</h2>
            <div className="md:w-2/3 max-w-md mx-auto">
              <label className="text-sm text-gray-400">Email</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <MdOutlineEmail className="w-6 text-gray-400 mx-auto" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2 cursor-not-allowed"
                  placeholder="email@example.com"
                  disabled
                />
              </div>
              <label className="text-sm text-gray-400">Role</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2 cursor-not-allowed"
                  placeholder="Role"
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto text-3xl">
              Personal info
            </h2>
            <div className="md:w-2/3 mx-auto max-w-md space-y-5">
              <div>
                <label className="text-sm text-gray-400">First name</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="First Name"
                    autoComplete="username"
                    disabled={!edit}
                  />
                </div>
                <label className="text-sm text-gray-400">Last name</label>
                <div className="w-full inline-flex border">
                  <div className="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Last Name"
                    autoComplete="username"
                    disabled={!edit}
                  />
                </div>

                <label className="text-sm text-gray-400">Gender</label>
                <div className="relative inline-block w-full">
                  <select
                    name="gender"
                    disabled={!edit}
                    value={formData.gender}
                    onChange={handleChange}
                    className="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 14.707a1 1 0 01-1.414-1.414L11.586 10 7.88 6.293a1 1 0 111.414-1.414l4.707 4.707a1 1 0 010 1.414l-4.707 4.707a1 1 0 01-.707.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <label className="text-sm text-gray-400">Date of Birth</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Date of Birth"
                    autoComplete="username"
                    disabled={!edit}
                  />
                </div>

                <label className="text-sm text-gray-400">Bio</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 flex items-center justify-center">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  {/* bio */}
                  <textarea
                    type="text"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2 h-40 resize-none"
                    placeholder="Enter about yourself"
                    disabled={!edit}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm ml-12 text-3xl ">
              Change password
            </h2>

            <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div className="w-full inline-flex border-b">
                <div className="w-1/12 pt-2">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                  placeholder="New Password"
                  autoComplete="current-password"
                  disabled={!edit}
                />
                {/* show password icon */}
                <span
                  className=" cursor-pointer mt-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={25} />
                  ) : (
                    <AiOutlineEye fontSize={25} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-100 flex items-center justify-center  p-4 text-center text-gray-500">
            {edit ? (
              <button
                type="submit"
                className="text-white mx-auto rounded-md text-center bg-blue-600 py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:scale-110 duration-700 ease-in-out"
              >
                {" "}
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Save Changes
              </button>
            ) : (
              <button
                type="submit"
                className="text-white shadow-lg mx-auto rounded-md text-center bg-black py-2 px-4 inline-flex items-center focus:outline-none md:float-right hover:scale-110 duration-700 ease-in-out"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  setEdit((prev) => !prev); // Toggle the edit state
                }}
              >
                {" "}
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
