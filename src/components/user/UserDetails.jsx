import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";
import { Token,setToken,setuserdata } from '../../slices/UserDataSlice';
const UserDetails = () => {
  const userdata = useSelector((state) => state.User.userdata);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = () => {
    // Add logic to handle user details editing
    //console.log('Edit button clicked');
  };

  const handleSignOut = () => {
    // Add logic to handle user sign-out
    //console.log('Sign Out button clicked');
  };

  return (
    <div className='bg-black text-white min-h-screen border flex flex-col items-center mx-auto p-2'>
      <div className='flex rounded-full overflow-hidden mb-4 border'>
        {
          userdata.Image?
          <img src={userdata.Image} alt='user' className='w-24 h-24 object-cover' />
          :
          <FaUserCircle className='h-5 w-5 text-[#61dafb]' style={{ height: '90px', width: '90px', }} />       
        }
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Name:</h1>
        <span  className=''>{userdata.Name}</span>
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Email:</h1>
        <span  className=''>{userdata.Email}</span>
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Birthday:</h1>
        <span  className=''>{userdata.Birthday}</span>
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Gender:</h1>
        <span  className=''>{userdata.Gender}</span>
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Country:</h1>
        <span  className=''>{userdata.Country}</span>
      </div>
      
      <div className='flex space-x-4'>
       <Link to="/UserDetails/edit">
       <button
          className='bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700'
        //   onClick={handleEdit}
        >
          Edit
        </button>
       </Link>
    <button
          className='bg-red-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-red-700'
          onClick={ () => {
             dispatch(setToken(""));
             dispatch(setuserdata(""));
             nevigate("/")
          }}
        >
          Sign Out
        </button>
    
      </div>
    </div>
  );
};

export default UserDetails;
