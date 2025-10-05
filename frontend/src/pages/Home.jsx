import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaListAlt, FaPlusCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 text-center px-6 py-12">
      {/* Title */}
      <h1 className="text-5xl font-bold text-blue-600 mb-4 animate-fadeIn">
        Welcome to Expense Tracker 💰
      </h1>
      <p className="text-gray-700 max-w-2xl mb-12 text-lg">
        Track your daily expenses, stay organized, and take control of your finances.
        Add new expenses, view all your spending, and analyze where your money goes!
      </p>

      {/* Helpful Notes / Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Add Expenses Card */}
        <div className="p-6 bg-white shadow-2xl rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <FaPlusCircle className="text-blue-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Add Expenses</h3>
          <p className="text-gray-600 mb-4">
            Quickly add your expenses with title, category, and amount.
          </p>
          <Link
            to="/addexpense"
            className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Go to Add Expense →
          </Link>
        </div>

        {/* View Expenses Card */}
        <div className="p-6 bg-white shadow-2xl rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <FaListAlt className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">View Expenses</h3>
          <p className="text-gray-600 mb-4">
            See all your expenses in one place and manage them easily.
          </p>
          <Link
            to="/viewexpenses"
            className="inline-block px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            Go to View Expenses →
          </Link>
        </div>

        {/* Stay Organized Card */}
        <div className="p-6 bg-white shadow-2xl rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <FaMoneyBillWave className="text-purple-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
          <p className="text-gray-600">
            Get insights into your spending patterns and save money.
          </p>
        </div>
      </div>
    </div>
  );
}
