"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Page() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setUserLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const getMe = async (userid) => {
        const { data } = await axios.get("/api/get-me?userId=" + userid);
        setUser(data.data);
      };
      getMe(userId);
    }
  }, []);

  if (!userLoggedIn) {
    return redirect("/login");
  }
  return (
    <div className="min-h-screen flex flex-col gap-6 w-full">
      <Header />
      <section className="max-w-4xl mx-auto p-2 rounded-md border w-full">
        <h1 className="text-center">Profile Data</h1>
        {user && (
          <div className="flex flex-col gap-2 justify-center items-center mt-10">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        )}
      </section>
    </div>
  );
}
