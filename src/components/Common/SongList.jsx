import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa6';
import { PiWaveformFill } from "react-icons/pi";
import { useEffect } from 'react';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import {
  setName,
  setSinger,
  setSongUrl,
  setImg,
  settrackId
} from '../../slices/player';
import toast from 'react-hot-toast';
import { apiConnecter } from '../../services/apiconnecter';

const SongList = ({song,index}) => {
    
    const dispatch = useDispatch();
    const audioRef = useRef();
    const albumName = useSelector((state) => state.Album.Albumname);
    const albumimg = useSelector((state) => state.Album.Albumimg);
    const Songs = useSelector((state) => state.Album.Songs);
    const name = useSelector((state) => state.Player.name);
    const trackId = useSelector((state) => state.Player.trackId);
    const [duration ,setDuration] = useState(null);
     const [play , setPlay] = useState(false);
     const [fav, setFav] = useState(null);
  
     const userdata = useSelector((state) => state.User.userdata);
    
    //  console.log(name, song.Name);
    

     const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };

    async function favHandler(){

      const dataform = {
        SongId :song._id,
        UserId:userdata._id
      }
       
      if(!fav){
        const res = await apiConnecter("POST","Album/AddFavorite",dataform);
        console.log(res);
        setFav(!fav);
        toast.success('Song Added to Favorite')
      }
      else{
        toast.success('Song remove From Favorite')
        const res = await apiConnecter("POST","Album/RemoveFavorite",dataform);
        console.log(res);
        setFav(!fav);
      }
    }

    async function checkFavorite(){
      const dataform = {
        SongId :song._id,
        UserId:userdata._id
      }
       try{
        const res = await apiConnecter("POST","Album/checkFavorite",dataform);
        console.log(res.data.check);
        setFav(res.data.check);
       }
       catch(err){
          console.log(err);
       }
    }
    const onLoadedMetadata = () => {
      const seconds = audioRef.current.duration;
      setDuration(formatTime(seconds));
      // setDuration(seconds);
      // progressBarRef.current.max = seconds;
    };
    
    useEffect(() => {
      // checkFavorite();
     }, [name,setName])

     
  return (
    <div
    onClick={() => {
      dispatch(setImg(song.Image));
      dispatch(setSongUrl(song.Url));
      dispatch(setName(song.Name));
      dispatch(setSinger(song.Artists[0]));
      dispatch(settrackId(song._id));
      setPlay(true);
    }}
    key={index}
    className={`flex flex-row items-center justify-between mb-1 duration-200 transition-all rounded-md mx-auto p-3  ${song._id == trackId ?"text-sky-400 shining-text opacity-100":"text-white opacity-80"}`}
  >
    <div className=" font-semibold  text-md lg:w-[25%] flex items-center gap-2 mb-2 lg:mb-0">
    <div>
    {song._id == trackId ?<PiWaveformFill/>:index+1?index+1:""}
    </div>
    <div className='max-w-[250px]'>
      {song.Name}
    </div>

    </div>
    <div className=" font-semibold  hidden lg:block lg:w-[28%] mb-2 lg:mb-0 ">
      {song.Artists[0]}
    </div>
    <div className=" font-semibold  mr-3  lg:block lg:w-[28%] mb-2 lg:mb-0 " onClick={() => favHandler()}>
    {fav ? (
              <FaHeart style={{ color: 'pink', height: 20, width: 20 }} />
            ) : (
              <FaRegHeart style={{ color: 'pink', height: 20, width: 20 }} />
            )}
    </div>
    <a
      href={song.Url}
      className=" font-semibold  lg:w-[25%] mb-2   hidden lg:block md:block"
      download="w3logo"
    >
      <FaDownload />
    </a>
  </div>
  )
}

export default SongList
