
import GoogleLogin from '../../components/SocialLogin/GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, ProfileUpadate } = UseAuth()
       const location=useLocation()
 const navigate=useNavigate()
   console.log('location',location)
   const from=location.state?.from?.pathname || '/'
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()
    const handleCreateUser = (data) => {
        console.log('click', data);
        const profileImge = data.photo[0]

        createUser(data.email, data.password).then(res => {
               navigate(from,{replace:true})
            const formdata = new FormData()
            formdata.append('image', profileImge)
            console.log('formdata:', formdata)

            const imgae_Api_url = `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGE_API_KEY}`
            axios.post(imgae_Api_url, formdata).then(res => {
                console.log(res.data.data.url)
                const photourl = res.data.data.url
                const updateProfile = {
                    photoURL: photourl,
                    displayName: data.name,
                }
                ProfileUpadate(updateProfile).then((res) => {
                    console.log(res)
                })
                
                delete data.password
                const userInfo = {
                    ...data,
                    photo: photourl
                }
                axiosSecure.post('/user',userInfo).then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
               
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your ar created your account successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                })

            })
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
                            <input type="text" {...register('name', { required: true })} className="input rounded-full" placeholder="Enter your Name" />
                            {
                                errors.name?.type === 'required' && (<p className='text-red-500 text-sm'>name is required</p>)
                            }
                            <label className="label">Photo</label>
                            <input type="file" {...register('photo', { required: true })} className="file-input rounded-full" />
                            {
                                errors.photo?.type === 'required' && (<p className='text-red-500 text-sm'>photo is required</p>)
                            }
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input rounded-full" placeholder="Email" />
                            {
                                errors.Email?.type === 'required' && (<p className='text-red-500 text-sm'>Email is required</p>)
                            }
                            {/* password */}
                            <label className="label">Password</label>
                            <input 
                             type="password" {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                                validate: {
                                    hasCapital: (value) =>
                                        /[A-Z]/.test(value) || "Must contain at least 1 capital letter",
                                    hasSpecial: (value) =>
                                        /[\W_]/.test(value) || "Must contain at least 1 special character",
                                    hasNumber: (value) =>
                                        /\d/.test(value) || "Must contain at least 1 number",
                                }
                            })} className="input rounded-full" placeholder="Password" />
                            {
                                errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)
                            }
                            <div className="text-sm">
                                Already have an account?{" "}
                                <Link to="/Login" className="link link-hover text-primary">
                                    Register
                                </Link>
                            </div>

                            <button className="btn btn-primary mt-4 rounded-full">Login</button>
                        </fieldset>
                        <h1 className='text-center text-xl'>-or-</h1>
                        {/* Google */}
                        <GoogleLogin ></GoogleLogin>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;