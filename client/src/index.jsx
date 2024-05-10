import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      <Toaster />
      <ToastContainer
        toastClassName={() =>
          "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
        }
        bodyClassName={() => "text-black text-base font-normal"}
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
);
