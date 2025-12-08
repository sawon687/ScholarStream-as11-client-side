import React from 'react';
import { motion } from "framer-motion";
import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {signupUser}=UseAuth();
   const {
      register,
      handleSubmit,
     
      formState: { errors },
    } = useForm()

  const handleSignup=(data)=>{
    console.log(data)
     signupUser(data.email,data.password).then(res=>{
      console.log(res)
     })
  }
    return (
        <motion.div className=" h-full  " initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} >
             <h1 className="text-5xl text-center mt-15 font-bold">Pleace Login now!</h1>
            <form onSubmit={handleSubmit(handleSignup)} className='card-body flex items-center justify-center'>
                <div className="card mx-auto w-full max-w-sm shrink-0l">
      <div className="card-body">
        <fieldset className="fieldset">
       
            {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input rounded-full" placeholder="Email" />
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password')} className="input rounded-full" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary mt-4 rounded-full">Login</button>
        </fieldset>
        <div className="text-sm">
  Don't have an account?{" "}
  <Link to="/register" className="link link-hover text-primary">
    Register
  </Link>
</div>

        <h1 className='text-center text-xl'>-or-</h1>
        {/* Google */}
        <GoogleLogin></GoogleLogin>
      </div>
    </div>
            </form>
        </motion.div>
    );
};

export default Login;