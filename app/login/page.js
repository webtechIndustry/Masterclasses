"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormDataSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/login-api", formData);
    console.log(data, "data from api response");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border mt-4 p-3 min-h-[40vh]">
      <h2 className="text-2xl text-center">Login User</h2>
      <form onSubmit={handleFormDataSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter valid Email"
            className="border p-2 bg-gray-100 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
            className="border p-2 bg-gray-100 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white mt-2 rounded-md p-2 cursor-pointer"
        >
          Login User
        </button>
      </form>
    </div>
  );
}
