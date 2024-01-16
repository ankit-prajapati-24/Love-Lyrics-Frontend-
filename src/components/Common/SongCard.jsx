import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSongUrl,setName,settrackId,setSinger,setImg,setPlay } from '../../slices/player';
import { setIsPlaying } from '../../slices/Control';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
const SongCard = ({song}) => {
  const trackId = useSelector((state) => state.Player.trackId);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  // console.log(trackId);
  const dispatch = useDispatch();
  // console.log(song)
  return (
    <div className='bg-black flex min-h-[100px] min-w-[100px]  group text-white flex-col items-center justify-cente relative' 
     onClick={()=> {
      dispatch(setImg(song.Image));
          dispatch(setSongUrl(song.Url));
          dispatch(setName(song.Name));
          dispatch(setSinger(song.Artists[0]));
          dispatch(settrackId(song._id));
          // setPlay(true);
          if(isPlaying && trackId == song._id){
          dispatch(setIsPlaying(false));
          }
          else{
            dispatch(setIsPlaying(true));
          }
     }}
    >
      <img src = {song.Image} className='  rounded-md ' alt='s'/>
      <div className=" lg:text-sm text-xs  font-medium overflow-hidden text-center mt-2"> {song.Name}</div>
          <div className='text-xs opacity-80 text-center'>{song.Artists[0]}</div>
      <button className='bg-sky-500 rounded-full  p-4 absolute opacity-0  group-hover:opacity-100 bottom-[40%] left-[40%]  group-hover:-translate-z-full transition-all duration-1000'>
       {
        trackId == song._id && isPlaying?  <FaPause /> : <FaPlay />
       }
      </button>
    </div>
  )
}

export default SongCard

