import React ,{useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
// import { setuserdata } from '../slices/SignUpData';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiConnecter } from '../../services/apiconnecter';
import { setSignData } from '../../slices/UserDataSlice';
import { setuserdata,setToken } from '../../slices/UserDataSlice';


// import { apiConnecter } from '../services/apiconnecter';

// import logo from '../assets/IMG_20230909_193215-removebg-preview-removebg-preview.png'
// import 
function Signup() {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  const onSubmit = async (formData) => {
    const toastid = toast.loading("Loading...");
    try {
      setLoading(true);
     if(formData.Email){
      if(formData.Password != formData.confirmPassword){
        toast.error("Password does not match")
        return ;
      }
      const res = await apiConnecter("post", "Auth/Sendotp", formData);
      //console.log(res);
      if(res.status == 201){
        toast.error("user already exist");
        return;
      }
      dispatch(setSignData(formData));
      toast.success("OTP Send successfully");
      navigate('/VerifyOTP');
     }
     else{
      const res = await apiConnecter("post", "Auth/Signup", formData);
      //console.log(res);
      if(res.data.user.Name){
        toast.success(`Login successful`);
        }
        else{
        toast.success(`WelCome ${res.data.user.Name}`);
        }
      dispatch(setToken(res.data.token));
      dispatch(setuserdata(res.data.user));

      navigate('/');
     }
      // if (res.data.success) {
      
    } catch (err) {
      //console.error(err, "Error sending OTP");
      toast.error("Error sending OTP. Please try again.");
    } finally {
      toast.dismiss(toastid);
      setLoading(false);
    }
  };
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      //console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);
        onSubmit({userinfo:userInfo});
    },
    // flow: 'implicit', // implicit is the default
  });

  return (
      <div className="flex bg-black h-screen max-w-[1600px]  mx-auto w-full object-cover relative border ">
      <LoadingBar color="red" ref={ref} />
   
    

         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[500px] mx-auto  flex flex-col gap-y-4 p-6 rounded-md   shadow-lg ">
            <h1 className='text-3xl p-2 font-bold text-white mb-3 mx-auto flex items-center justify-center z-10 '>SignUp</h1>
            {/* <div className="flex gap-x-4">
              <label className="flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                  First Name <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  {...register('firstName', { required: true })}
                  placeholder="Enter first name"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
              </label>
              <label className="flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700 ">
                  Last Name <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  {...register('lastName', { required: true })}
                  placeholder="Enter last name"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
              </label>
            </div> */}
            <label className="w-full">
              <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                Email Address <sup className="text-red-500 ">*</sup>
              </p>
              <input
                required
                type="text"
                name="email"
                {...register('Email', { required: true })}
                placeholder="Enter email address"
                className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
              />
            </label>
            {/* <label className="w-full">
              <p className="mb-1 text-sm leading-[1.375rem] text-gray-700">
                UID <sup className="text-red-500">*</sup>
              </p>
              <input
                type="text"
                name="uid"
                {...register('uid', { required: true })}
                placeholder="Enter 12 Digit Aadhar Number"
                className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
              />
            </label> */}
            <div className="flex flex-col gap-x-4">
              <label className="relative flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700  ">
                  Create Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register('Password', { required: true })}
                  placeholder="Enter Password"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>

              <label className="relative flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700 ">
                  Confirm Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  {...register('confirmPassword', { required: true })}
                  placeholder="Confirm Password"
                  className="w-full rounded-md bg-gray-100 p-2 text-gray-700 border border-black"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
            </div>

            
            <button
              type="submit"
              className="flex mx-auto rounded-md  max-w-[100%] w-[100%] lg:max-w-[290px] min-w-[180px] md:max-w-[320px] bg-black flex-col justify-between items-center px-2 py-2 border text-white hover:text-white group  mt-4"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <div className="flex justify-center items-center text-white flex-col  gap-2">
              <p>Already Have an account?</p>
              <Link to="/Login" className="font-bold">Login</Link>
            </div>
            <div className='flex mx-auto rounded-md  max-w-[100%] w-[100%] lg:max-w-[290px] min-w-[180px] md:max-w-[320px] bg-black  justify-around items-center px-2 py-2 border text-white hover:text-white group  '  onClick={() => login()}>
        
        <FcGoogle style={{height:30, width:30} }/>
        Sign in with Google
        
           </div>
          </form>
        
      </div>
 
  );
}

export default Signup;
