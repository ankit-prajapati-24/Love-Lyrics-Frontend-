import React ,{useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { setuserdata,setToken } from '../../slices/UserDataSlice';
import { useGoogleOneTapLogin,useGoogleLogin } from '@react-oauth/google';
// import { setuserdata } from '../slices/SignUpData';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiConnecter } from '../../services/apiconnecter';
// import { apiConnecter } from '../services/apiconnecter';

// import logo from '../assets/IMG_20230909_193215-removebg-preview-removebg-preview.png'

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

      const res = await apiConnecter("POST", "Auth/Login", formData);
      console.log(res);
      if(!formData.Email){
        dispatch(setToken(res.data.token));
        dispatch(setuserdata(res.data.user));
        // toast.success("Login successful");
  
        if(res.data.user.Name){
          toast.success(`Login successful`);
          }
          else{
          toast.success(`WelCome ${res.data.user.Name}`);
          }
        navigate("/")
        return;      
      }
      if(res.status == 202){
        toast.error("user is not ragistered");
        return;
      }
      if(res.status == 201){
        toast.error("Password is incorrect");
        return;
      }
      console.log(res);

        dispatch(setToken(res.data.token));
        dispatch(setuserdata(res.data.user));
        if(res.data.user.Name){
        toast.success(`Login successful`);
        }
        else{
        toast.success(`WelCome ${res.data.user.Name}`);
        }
      navigate("/")
      // }
    } catch (err) {
      console.error(err, "Error sending OTP");
      toast.error("Error sending OTP. Please try again.");
    } finally {
      toast.dismiss(toastid);
      setLoading(false);
    }
  };
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse);
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
            <h1 className='text-3xl p-2 font-bold text-white mb-3 mx-auto flex items-center justify-center z-10 '>Login</h1>
      
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
           
            <div className="flex flex-col gap-x-4">
              <label className="relative flex-1">
                <p className="mb-1 text-sm leading-[1.375rem] text-gray-700  ">
                   Password <sup className="text-red-500">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="Password"
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
            </div>

            <button
              type="submit"
              className="flex mx-auto rounded-md max-w-[100%] w-[100%] lg:max-w-[290px] min-w-[180px] md:max-w-[320px] bg-black flex-col justify-between items-center px-2 py-2 border text-white hover:text-white group  mt-4"
              disabled={loading}
            >
              {loading ? 'login...' : 'login'}
            </button>
            <div className="flex justify-center items-center text-white flex-col  gap-2">
              <p>Create new account</p>
              <Link to="/Signup" className="font-bold">Signup</Link>
            </div>
           <div className='flex mx-auto rounded-md  max-w-[100%] w-[100%] lg:max-w-[290px] min-w-[180px] md:max-w-[320px] bg-black  justify-around items-center px-2 py-2 border text-white hover:text-white group  mt-4'  onClick={() => login()}>
        
        <FcGoogle style={{height:30, width:30} }/>
        Continue with Google
        
           </div>
        <div className='opacity-0'>
        <GoogleLogin 
      onSuccess={credentialResponse => {
        onSubmit(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />;
   
        </div>
          </form>
        
      </div>
 
  );
}

export default Signup;
