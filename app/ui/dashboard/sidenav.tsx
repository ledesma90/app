"use client";
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col  ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      {/* Header with Logo and Collapse Button */}
      <div
        className={`flex items-center justify-between h-16 px-4 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center justify-center h-16 ${
            !isCollapsed ? "rounded-md bg-blue-600 p-4" : ""
          }`}
        >
          {!isCollapsed && <AcmeLogo />}
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className=" hover:text-gray-300 focus:outline-none"
          title={isCollapsed ? "Expandir menú" : "Contraer menú"}
        >
          {isCollapsed ? (
            <ArrowRightIcon className="h-6 w-6" />
          ) : (
            <ArrowLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow overflow-y-auto">
        <NavLinks isCollapsed={isCollapsed} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center h-16 border-t border-gray-700">
        {/* Sign Out Button */}
        <button className=" hover:text-gray-300 focus:outline-none">
          <PowerIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
