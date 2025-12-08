import React from 'react';

import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className=" h-full  " >
             <h1 className="text-5xl text-center mt-15 font-bold">Pleace Login now!</h1>
            <form action="" className='card-body flex items-center justify-center'>
                <div className="card mx-auto w-full max-w-sm shrink-0l">
      <div className="card-body">
        <fieldset className="fieldset">
       
            {/* email */}
          <label className="label">Email</label>
          <input type="email" className="input rounded-full" placeholder="Email" />
          {/* password */}
          <label className="label">Password</label>
          <input type="password" className="input rounded-full" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4 rounded-full">Login</button>
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
        </div>
    );
};

export default Login;