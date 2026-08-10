"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import NavLink from "./NavLink.client";
import SelectSeason from "./SelectSeason.client";

/**
 * Nav Component (Client-Side)
 *
 * The navigation bar for the application. Includes a logo, navigation links, and a season selector.
 * Conditionally renders a Sign Out or Sign In button based on the user's authentication status.
 *
 * @returns {JSX.Element} - A styled navigation bar with logo, links, and authentication controls.
 */

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();
        console.log("Staus: ", data);
        setIsLoggedIn(data.LoggedIn);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggedIn(false); // Update state to reflect logged-out status
        window.location.href = "/"; // Redirect to home page
      } else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handle sign in
  const handleSignIn = () => {
    window.location.href = "/auth/login"; // Redirect to login page
  };
  return (
    <nav className=" w-full px-16 flex justify-between items-center shadow-sm z-50 backdrop-blur-md h-[100px]">
      {/* Logo */}
      <div>
        <Image
          src="/logo.png"
          alt="leaf Finder Logo"
          height={500}
          width={500}
          className="h-[100px] w-[250px]"
          priority
        />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/nps">NPS</NavLink>
      </div>

      {/* Auth and Season Select */}
      <div className="flex items-center space-x-4">
        <SelectSeason />
        {loading ? (
          <p>Loading...</p>
        ) : isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="text-gray-700 hover:text-gray-900"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="text-gray-700 hover:text-gray-900"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
