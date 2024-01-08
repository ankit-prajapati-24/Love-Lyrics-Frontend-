import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";
import { setuserdata } from '../../slices/UserDataSlice';
import { update } from 'react-spring';
import toast from 'react-hot-toast';
import { apiConnecter } from '../../services/apiconnecter';

const EditUserDetailsForm = () => {
  const userdata = useSelector((state) => state.User.userdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Gender ,setGender] = useState(userdata.Gender);
  const [Image ,SetImage] = useState(null);

  const { handleSubmit, register, setValue, formState: { errors }, watch } = useForm({
    defaultValues: {
      Name: userdata.Name,
      Email: userdata.Email,
      Country: userdata.Country,
      Birthday: userdata.Birthday,
    },
  });

  async function update(data){

     const loadeid = toast.loading("laoding...");
        try{
           const res = await apiConnecter("post","Auth/updateInformation",data);
           console.log(res);
           toast.dismiss(loadeid);
           dispatch(setuserdata(res.data.user));
           toast.success("Profile Update successfully")
           navigate("/UserDetails");
          }
          catch(err){
          toast.dismiss(loadeid);
          
          toast.error("Try again later")
          console.log(err);
        }
  }

  const fileInputRef = useRef(null);

  const watchedGender = watch('Gender');

  const formdata =new  FormData();
  const onSubmit = (data) => {

    formdata.append("Gender", Gender)
    formdata.append("Name", data.Name);
    formdata.append("Country", data.Country);
    formdata.append("Birthday", data.Birthday);
    formdata.append("Image", Image);
    formdata.append("Email",data.Email);
    update(formdata);
    console.log(formdata,"this is data");
    // Dispatch an action to update the user details in the Redux store
    // dispatch(setuserdata({  ...data, }));

    // You can add logic here to send the updated data to your backend if needed

    // Redirect or navigate after submitting the form
    // navigate('/path-to-redirect');
  };

  const handleImageClick = () => {
    // Trigger the file input when the image is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle the selected file
    const selectedFile = event.target.files[0];
    formdata.append("Image",event.target.files[0]);
    SetImage(selectedFile);
    // Dispatch an action to update the user's image in the Redux store
    // dispatch(setUserImage(selectedFile));

    // You can add logic here to handle the file upload if needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-black text-white min-h-screen border flex flex-col items-center mx-auto p-2'>
      <div className='flex rounded-full items-center bg-no-repeat object-cover justify-center overflow-hidden mb-4 text-white relative' onClick={handleImageClick}>
        <img src={userdata.Image} alt='user' className='z-1 w-24 h-24 object-cover cursor-pointer ' />
        <div className=' absolute z-10 '>
          <FaCamera style={{ height: 40, width: 40, color: "black" }} />
        </div>
      </div>
      <input type='file' {...register("Image")} ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Name:</h1>
        <input type="text" {...register("Name")} placeholder={`${userdata.Name}`} className='border-none outline-none w-full bg-gray-700' />
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Email:</h1>
        <input type="email" {...register("Email")} placeholder={`${userdata.Email}`} className='border-none outline-none w-full bg-gray-700' />
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>BirthDay:</h1>
        <input type="date" {...register("Birthday")} placeholder={`${userdata.BirthDay}`} className='border-none outline-none w-full bg-gray-700' />
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Gender:</h1>
        <input  onChange={()=> setGender("Male")} type="radio" name='gender' value={'Male'} defaultChecked={watchedGender === 'Male'} />
        Male
        <input  onChange={()=> setGender("FeMale")} type="radio" name='gender' value={'FeMale'} defaultChecked={watchedGender === 'FeMale'} />
        Female
      </div>
      <div className='mb-4 flex items-center justify-start gap-2 border max-w-[500px] w-full rounded-md p-2 bg-gray-700'>
        <h1 className='text-xl font-bold '>Country:</h1>
        <input type="text" {...register("Country")} placeholder={`${userdata.Country}`} className='border-none outline-none w-full bg-gray-700' />
      </div>
      <div className='flex space-x-4'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-700'>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditUserDetailsForm;
