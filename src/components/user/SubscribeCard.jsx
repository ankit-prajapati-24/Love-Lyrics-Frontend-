import React from 'react';
import logo from '../assets/Screenshot_2024-01-12_012146-removebg-preview.png';

const SubscribeCard = ({ price, time, etc, color ,subscribe,months}) => {
  return (
    <div className={`flex flex-col items-center w-full max-h-[300px] md:max-h-[500px]  lg:max-h-[500px] max-w-[300px] md:max-w-[500px]  lg:max-w-[500px] h-full p-4 md:p-6 lg:p-8 justify-between ${color} rounded-md shadow-md hover:shadow-lg transition duration-300`}>
      <div className='self-start mb-3'>
        <img src={logo} alt='logo' className='h-12 md:h-16 w-auto object-contain' />
      </div>
      <div className='flex items-center justify-center flex-col text-center'>
        <h1 className='text-3xl md:text-5xl font-bold mb-2'>{time}</h1>
        <h1 className='font-bold mb-4 text-xl'>{ `₹ ${price} /`}{time.split(' ')[2]}</h1>
        <i className='text-gray-600 text-lg md:text-xl font-bold'>{etc}</i>
      </div>
      <div className='bg-green-500   w-full text-center text-white p-2 mt-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300'   onClick= {() => subscribe(price)}>
        Buy Now
      </div>
    </div>
  );
};

export default SubscribeCard;
