import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import toast from "react-hot-toast";

function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const apiKey = process.env.CONTACT_ACCESS_KEY;

  const { submit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "SkillSync",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset(); // Reset form after successful submission
      toast.success(message);
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
      toast.error(message);
    },
  });

  const onSubmit = (data) => {
    // Submit form data via useWeb3Forms hook
    submit(data);
  };

  return (
    <section className="relative bg-white text-gray-800 mt-10">
      <div className="container mx-auto px-5 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto md:w-2/3 lg:w-1/2"
        >
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="mb-4 text-5xl font-medium">Contact Us</h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              Feel free to reach out to us! Whether you have a question,
              feedback, or a collaboration proposal, we'd love to hear from you.
            </p>
          </div>
          <div className="-m-2 flex flex-wrap">
            <div className="w-1/2 p-2">
              <input
                required
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                {...register("name")} // Register inputs with react-hook-form
                className="w-full rounded border border-gray-300 py-1 px-3 text-base leading-8 placeholder-gray-500 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                placeholder="Name"
              />
            </div>
            <div className="w-1/2 p-2">
              <input
                required
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                {...register("email")} // Register inputs with react-hook-form
                className="w-full rounded border border-gray-300 py-1 px-3 text-base leading-8 placeholder-gray-500 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                placeholder="Email"
              />
            </div>
            <div className="mt-4 w-full p-2">
              <textarea
                required
                id="message"
                name="message"
                onChange={handleChange}
                {...register("message")} // Register inputs with react-hook-form
                className="h-32 w-full resize-none rounded border border-gray-300 py-1 px-3 text-base leading-6 placeholder-gray-500 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                placeholder="Message"
              />
            </div>
            <div className="w-full p-2">
              <button
                type="submit"
                className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
