import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ message = "Page Not Found" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg text-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{message}</h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong or the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:scale-105 transform transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
