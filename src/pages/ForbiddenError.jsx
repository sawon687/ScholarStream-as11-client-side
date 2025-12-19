import React from 'react';
import { Link } from 'react-router';

const ForbiddenError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-6">Forbidden Access</h2>
        <p className="text-gray-600 mb-8">
          You don&apos;t have permission to access this page.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenError;
