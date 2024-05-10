import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
};

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const { token } = useContext(AuthContext);
  let number = 1;
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/invoice`, {
          headers: {
            method: "GET",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("data", data);
        setInvoices(data.invoices); // Assuming your API returns an array of invoices
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust formatting as needed
  };

  console.log("invoices =>", invoices);
  return (
    <section className="bg-white my-10 w-full">
      <div className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        My Invoice History
      </div>
      <div>
        <div className="flex flex-wrap mb-[170px]">
          <div className="w-full ">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-center bg-blue-600">
                  <tr>
                    <th className={TdStyle.ThStyle}>S.No</th>
                    <th className={TdStyle.ThStyle}>Course Name</th>
                    <th className={TdStyle.ThStyle}>Course Price</th>
                    <th className={TdStyle.ThStyle}>Order ID</th>
                    <th className={TdStyle.ThStyle}>Payment ID</th>
                    <th className={TdStyle.ThStyle}> Date</th>
                  </tr>
                </thead>

                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan="6" className=" text-gray-700 w-full h-screen col-span-5 text-center text-5xl my-10">No invoice records found</td>
                    </tr>
                  ) : (
                    invoices.map((invoice, index) => (
                      <tr key={index}>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          {number++}
                        </td>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          {invoice.course.name}
                        </td>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          ₹{invoice.course.price}
                        </td>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          {invoice.razorpay_order_id}
                        </td>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          {invoice.razorpay_payment_id}
                        </td>
                        <td
                          className={
                            index % 2 === 0 ? TdStyle.TdStyle : TdStyle.TdStyle2
                          }
                        >
                          {formatTimestamp(invoice.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invoices;
