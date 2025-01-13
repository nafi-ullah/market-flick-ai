import React from "react";
import { FiShare } from "react-icons/fi";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white  z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold my-3"> <Image
                src="/marktelogo.png" // Replace with the path to the avatar image
                alt="User Avatar"
                width={60}
                height={60}
                className="rounded-full"
              /></span>
          </div>

          {/* Right: Share button and avatar */}
          <div className="flex items-center space-x-4">
            {/* Share Button */}
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 focus:outline-none">
              <FiShare className="mr-2" />
              <span className="text-sm font-medium">Share</span>
            </button>

            {/* Avatar */}
            <div className="w-8 h-8">
              <Image
                src="/avatar.png" // Replace with the path to the avatar image
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
