import { useState,useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'
import OtpInput from "react-otp-input";
import { useDispatch,useSelector } from 'react-redux';
import {apiConnecter} from '../../services/apiconnecter'
import { Link, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const ref = useRef();
  const [otp,setOtp] = useState("");
  const dispaach = useDispatch();
  const Navigate = useNavigate();

  const userform = useSelector((state) => state.User.SignData);
  const {Password,Email} = userform;
  
      async function handleVerifyAndSignup(event){
      event.preventDefault();
      try{
        if (ref.current) {
          ref.current.continuousStart(); // Start the loading animation
      }
        const res = await apiConnecter("post","Auth/Signup",{Password,Email,Otp:otp});
        // //console.log(res);
        if (ref.current) {
          ref.current.complete(); // Complete the loading animation
        }
        toast.success("Signup successfully");
  
        Navigate("/login")
      }
      catch(err){
        if (ref.current) {
          ref.current.complete(); // Complete the loading animation
        }
        toast.error("Please Try Again Leter");
        //console.log(err);
      }
      };
      //  //console.log(userform);
      //  const url = "";

    return (
      <div className="flex h-screen flex-col items-center  object-cover">
      <LoadingBar color="red" ref={ref} />
  
          {/* Right bar */}
          <div className=" p-6 rounded-lg  flex items-center justify-center flex-col mx-auto">
            <p className="text-3xl font-semibold mb-6 text-center text-gray-800 overflow-visible">Enter 6-Digit OTP</p>
            <form onSubmit={handleVerifyAndSignup} className="flex items-center justify-center flex-col">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-gray-300 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-500  py-[12px] px-[12px] hover:scale-95 rounded-md border border-black max-w-[200px] justify-center items-center mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          </div>
        </div>
    );
  };
  
  export default VerifyOtp
