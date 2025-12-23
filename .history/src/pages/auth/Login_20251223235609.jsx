import { motion } from "framer-motion";
import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Loading from "../Loading";
import useRole from "../../Hook/useRole";
import Swal from "sweetalert2";

const Login = () => {
  const { signupUser } = UseAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (data) => {
    signupUser(data.email, data.password).then(res => {
      navigate(from, { replace: true });
    }).catch(error => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title:`${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };



  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 bg-gradient-to-r from-indigo-50 to-purple-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-700">
        Welcome Back!
      </h1>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/30">
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition placeholder-transparent"
              required
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-indigo-600 peer-focus:text-sm">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register('password')}
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition placeholder-transparent pr-10"
              required
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-indigo-600 peer-focus:text-sm">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition transform duration-300"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-3 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            state={{ from: location.state?.from }}
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center">
          <GoogleLogin />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
