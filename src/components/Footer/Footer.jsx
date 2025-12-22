import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
            ScholarStream
          </h1>
          <p className="text-gray-200 max-w-xs">
            Your gateway to scholarships and educational opportunities. Explore, apply, and grow with ScholarStream.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="flex flex-col gap-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/allScholarship" className="hover:underline">All Scholarships</a></li>
            <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-3">
            <a href="#" className="hover:bg-white hover:text-indigo-600 transition-all duration-200 p-2 rounded-full"><FaFacebookF /></a>
            <a href="#" className="hover:bg-white hover:text-indigo-600 transition-all duration-200 p-2 rounded-full"><FaXTwitter /></a>
            <a href="#" className="hover:bg-white hover:text-indigo-600 transition-all duration-200 p-2 rounded-full"><FaInstagram /></a>
            <a href="#" className="hover:bg-white hover:text-indigo-600 transition-all duration-200 p-2 rounded-full"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
    {/* Footer Bottom */}
<footer className=" text-gray-200 mt-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="border-t border-gray-700 pt-4 text-center text-sm">
      © {new Date().getFullYear()} MD AL Jihad Sawon. All Rights Reserved.
    </div>
  </div>
</footer>

    </footer>
  );
};

export default Footer;
