// SubscriptionComponent.js
import React from 'react';
import { apiConnecter } from '../../services/apiconnecter';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setuserdata } from '../../slices/UserDataSlice';
import logo from '../assets/Screenshot 2024-01-12 012146.jpg'
import SubscribeCard from './SubscribeCard';
// import Razorpay from 'razorpay';
// import Razorpay from 'razorpay'
// import './output.css'; // Import the generated Tailwind CSS

const GoPro = () => {
 const userdata = useSelector((state) => state.User.userdata);
 console.log(userdata);
 const nevigate = useNavigate();
 const dispatch = useDispatch();
 function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

async function verifyPayment(bodyData, navigate) {
  const toastId = toast.loading("Verifying Payment....");
  // dispatch(setPaymentLoading(true));
  try{
      const data = {
        ...bodyData,
        userId:userdata._id
      }
      console.log(data);
      const response  = await apiConnecter("post", "Auth/verifyPayment", data)
      

      if(!response.data.success) {
          throw new Error(response.data.message);
      }
      console.log(response);
      dispatch(setuserdata(response.data.user));
      toast.success("Payment Successful");
      nevigate("/Home");
      // dispatch(resetCart());
  }   
  catch(error) {
      console.log("PAYMENT VERIFY ERROR....", error);
      toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  // dispatch(setPaymentLoading(false));
}
  const subscribe = async(price) => {
   const loadid = toast.loading("Waiting....");
    try{
       const orderResponse = await apiConnecter("post","Auth/capturePayment",{userId:userdata._id,price:price});

       if(!orderResponse.data.success){
        toast.dismiss(loadid);
        throw new Error(orderResponse.data.message);
       }
       toast.dismiss(loadid);

       console.log(orderResponse);
       const options = {
        key:"rzp_test_yLu4C5HscHEUTX",
        currency:orderResponse.data.message.currency,
        amount:orderResponse.data.message.amount,
        order_id:orderResponse.data.message.id,
        name:"lovel lyrics",
        description:"Thanks You for Subscribing",
        image:logo,
        prefill:{
            name:`${userdata.Name}`,
            email:userdata.Email
        },
        handler: function (response){
            // send succesful email
            // alert("subscribed")
            // toast.success("You Are Become My Subscriber")
            verifyPayment(response);
        }
       }
       await loadScript("https://checkout.razorpay.com/v1/checkout.js");
   
    var rzp1 = new window.Razorpay(options);
    rzp1.open();

       

    }
    catch(err){
      toast.dismiss(loadid);
        console.error(err);
    }
  };

  return (
    <div className=" w-full    p-3  flex flex-col   mb-[300px]  ">
    <h1 className='text-white text-center text-[30px]  font-semibold my-5 mt-[100px]'>
    All your music here, <span className='text-sky-500'> plus...</span>
    </h1>
     <p className='text-white  text-[40px] font-bold my-4 text-center'>
     Ad-free Music, Unlimited Downloads,
     <br></br>
      Exclusive Original Content and More
      </p>
      <div className='flex  flex-wrap md:flex-none lg:flex-none justify-center h h-[700px] items-center gap-4    '>
        
   <SubscribeCard  color ={ "bg-gradient-to-b from-pink-500 to-sky-500"} price = {99 } time = {" 1 Month"}  subscribe ={subscribe}  />
   <SubscribeCard  color ={ "bg-gradient-to-b from-red-500 to-sky-500"} price = {999} time = {" 1 Year"} subscribe= {subscribe}  etc= {"*Limited Period Offer"}   />
      </div>
    </div>
     
  );
};

export default GoPro;
