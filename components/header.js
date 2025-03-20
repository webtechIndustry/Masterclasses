import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        setUserLoggedIn(true);
      }
    }
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem("authToken");
    setUserLoggedIn(false);
  };
  return (
    <nav className="w-full flex justify-between bg-black text-white p-6">
      <div>
        <h2>NextJs MasterClass</h2>
      </div>
      <div>
        {userLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>Dashboard</Link>
            <button
              onClick={handleUserLogout}
              className="text-white cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/login"}>Login</Link>
            <Link href={"/create-user"}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
