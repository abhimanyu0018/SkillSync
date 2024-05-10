import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function CourseContentPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [enrolled, setEnrolled] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    checkEnrolled();
    fetchCourses();
  }, []);

  const { token, courseIdEntry } = useContext(AuthContext);
  const navigation = useNavigate();

  const checkEnrolled = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/user/check/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: id }),
      });
      const data = await response.json(); // Extract JSON data from the response
      console.log("response =>", data);

      // Check if user is enrolled in the course
      if (data.success) {
        setEnrolled(false);
      }
    } catch (error) {
      console.error("Error fetching checkEnrolled:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/course/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseID: id }),
      });
      console.log(response);
      const data = await response.json();
      setData(data);
      courseIdEntry(id);

      console.log("data", data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const checkouthandler = async (amount) => {
    try {
      const getKeyResponse = await fetch(`${apiUrl}/api/enroll/getkey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { key } = await getKeyResponse.json();

      const checkoutResponse = await fetch(`${apiUrl}/api/enroll/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
      const { order } = await checkoutResponse.json();

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "SkillSync",
        description: "Razorpay tutorial",
        order_id: order.id,
        handler: async function (response) {
          try {
            const paymentVerificationResponse = await fetch(
              `${apiUrl}/api/enroll/paymentverification`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: order.id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  courseId: data._id,
                }),
              }
            );
            navigation("/dashboard");
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle payment verification error
          }
        },
        notes: {
          address: "razorpay official",
        },
        prefill: {
          name: "SkillSync",
          email: "skillsync@gmail.com",
          contact: "1234567890",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
    }
  };

  function extractDate(timestamp) {
    const date = new Date(timestamp);

    // Extracting date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();

    // Formatting the date
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  }

  return (
    <div className=" mx-auto py-8 px-24 bg-gray-200">
      {data && (
        <>
          <h2 className="text-center font-bold text-3xl mb-4 text-gray-400">
            {data.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-5">
            {/* Product Image */}
            <div className="md:order-1">
              <img
                src={data.thumbnail}
                alt={data.name}
                className="w-full rounded-lg shadow-lg h-[400px] object-cover"
              />
            </div>
            {/* Product Details */}
            <div className="md:order-2">
              <h2 className="text-3xl font-semibold mb-2">{data.name}</h2>
              <p className="text-gray-700 mb-4">
                This is Created By {data.instructor.firstName}{" "}
                {data.instructor.lastName} at {extractDate(data.createdAt)}
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">Price:</span>
                <span className="text-green-500 font-semibold mb-2 md:mb-0">
                  ₹{data.price}{" "}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">
                  Enrolled Students:
                </span>
                <span className="text-green-500 font-semibold mb-2 md:mb-0">
                  {data.enrolledStudents.length} Enrolled{" "}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:mb-4">
                <span className="text-gray-700 font-semibold mr-2">
                  About Course Creator:
                </span>
                <span className="text-gray-500 font-semibold mb-2 md:mb-0">
                  {data.instructor.profile.about}{" "}
                </span>
              </div>
              {!enrolled ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-6 mb-4"
                  onClick={() => checkouthandler(data.price)}
                >
                  Enroll Now
                </button>
              ) : (
                <NavLink to={"/liveClass"}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-6 mb-4">
                    Join Class
                  </button>
                </NavLink>
              )}
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">Course Overview</h2>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: data.desc }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseContentPage;
