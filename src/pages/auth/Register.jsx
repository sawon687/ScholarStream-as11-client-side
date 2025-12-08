import React from 'react';
import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {createUser}=UseAuth()
 const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm()
    const handleCreateUser=(data)=>{
        console.log('click',data)

        createUser(data.Email,data.password).then(res=>{
            console.log('responsedata',res)
        })
    }
    return (
        <div className=" h-full  " >

            <form onSubmit={handleSubmit(handleCreateUser)} className='card-body flex items-center justify-center'>
                <div className="card mx-auto w-full max-w-sm shrink-0l">
                    <h1 className="text-4xl text-center  font-bold">Pleace Register now !</h1>
                    <div className="card-body">
                        <fieldset className="fieldset">
                            {/* Name */}
                            <label className="label">Name</label>
                            <input type="text" {...register('UserName')} className="input rounded-full" placeholder="Enter your Name" />
                            <label className="label">Photo</label>
                            <input type="file" {...register('userPhoto')} className="file-input rounded-full" />
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" {...register('Email')} className="input rounded-full" placeholder="Email" />
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" {...register('password')} className="input rounded-full" placeholder="Password" />
                            <div className="text-sm">
                                Already have an account?{" "}
                                <Link to="/Login" className="link link-hover text-primary">
                                    Login
                                </Link>
                            </div>

                            <button  className="btn btn-primary mt-4 rounded-full">Login</button>
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