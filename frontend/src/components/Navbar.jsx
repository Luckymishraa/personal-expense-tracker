import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    ["Home", "/"],
    ["Add Expense", "/addexpense"],
    ["View Expenses", "/viewexpenses"],
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 shadow-lg px-6 py-4 flex justify-between items-center transition-all duration-300">
      {/* Left side: App Title */}
      <div className="text-2xl font-bold text-blue-600 tracking-wide">Expense Tracker</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8">
        {menus.map(([name, path]) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `relative text-gray-700 font-medium hover:text-blue-600 
                 after:block after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 
                 after:bg-blue-600 hover:after:w-full after:transition-all 
                 ${isActive ? "after:w-full text-blue-600" : ""}`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 space-y-3 animate-slideDown">
          {menus.map(([name, path]) => (
            <li key={name} className="w-full text-center">
              <NavLink
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-gray-700 font-medium py-2 hover:text-blue-600 
                   ${isActive ? "text-blue-600 font-semibold" : ""}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
