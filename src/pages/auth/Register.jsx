import React from 'react';
import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div className=" h-full  " >

            <form action="" className='card-body flex items-center justify-center'>
                <div className="card mx-auto w-full max-w-sm shrink-0l">
                    <h1 className="text-4xl text-center  font-bold">Pleace Register now !</h1>
                    <div className="card-body">
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" className="input rounded-full" placeholder="Enter your Name" />
                            <label className="label">Photo</label>
                            <input type="file" className="file-input rounded-full" />
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" className="input rounded-full" placeholder="Email" />
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" className="input rounded-full" placeholder="Password" />
                            <div className="text-sm">
                                Already have an account?{" "}
                                <Link to="/Login" className="link link-hover text-primary">
                                    Login
                                </Link>
                            </div>

                            <button className="btn btn-neutral mt-4 rounded-full">Login</button>
                        </fieldset>
                        <h1 className='text-center text-xl'>-or-</h1>
                        {/* Google */}
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;