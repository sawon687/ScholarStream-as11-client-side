import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const { createUser, ProfileUpadate } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const axiosSecure = useAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCreateUser = (data) => {
    const profileImage = data.photo[0];

    createUser(data.email, data.password).then(() => {
      const formData = new FormData();
      formData.append('image', profileImage);

      const imageApiUrl = `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGE_API_KEY}`;
      axios.post(imageApiUrl, formData).then((res) => {
        const photoURL = res.data.data.url;
        ProfileUpadate({ photoURL, displayName: data.name });

        const userInfo = { ...data, photo: photoURL };
        delete userInfo.password;

        axiosSecure.post('/user', userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Account created successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        });
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-6 bg-gradient-to-r from-indigo-50 to-purple-50">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-indigo-700">
        Create Account
      </h1>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-5 md:p-6 border border-white/30">
        <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder=" "
              className="peer w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition placeholder-transparent text-sm"
            />
            <label className="absolute left-4 top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-indigo-600 peer-focus:text-xs">
              Name
            </label>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Photo */}
          <div>
            <input
              type="file"
              {...register('photo', { required: 'Photo is required' })}
              className="file-input w-full rounded-full"
            />
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder=" "
              className="peer w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition placeholder-transparent text-sm"
            />
            <label className="absolute left-4 top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-indigo-600 peer-focus:text-xs">
              Email
            </label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters' },
                validate: {
                  hasCapital: (value) => /[A-Z]/.test(value) || '1 capital letter',
                  hasNumber: (value) => /\d/.test(value) || '1 number',
                  hasSpecial: (value) => /[\W_]/.test(value) || '1 special character',
                },
              })}
              placeholder=" "
              className="peer w-full px-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition placeholder-transparent pr-9 text-sm"
            />
            <label className="absolute left-4 top-2.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-indigo-600 peer-focus:text-xs">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition transform duration-300 text-sm">
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center mt-2 text-xs text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-3">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
