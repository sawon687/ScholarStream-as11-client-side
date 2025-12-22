import React from "react";
import { Link } from "react-router";

const ForbiddenError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md text-center animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center shadow-inner">
            <span className="text-red-500 font-black text-5xl">!</span>
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-white drop-shadow mb-4 tracking-tight">
          403
        </h1>

        <h2 className="text-2xl font-bold text-white/90 mb-3">
          Forbidden Access
        </h2>

        <p className="text-white/70 mb-8 leading-relaxed">
          You do not have permission to view this page.  
          Please return to a safe location.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-white/20 text-white font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl bg-black/30 text-white font-medium hover:bg-black/40 transition-all duration-300 backdrop-blur-md border border-white/10 shadow-lg"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenError;
