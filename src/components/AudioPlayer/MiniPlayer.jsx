// import { tracks } from '../data/tracks';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import MobilePlayer from './MobilePlayer';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useDispatch } from 'react-redux';
import { setNextIndex } from '../../slices/album';
import { FaChevronDown } from "react-icons/fa";
import { useCallback } from 'react';
import src  from '../assets/Dil_Jhoom(128k) (1).m4a'
// import Minicontrol from './MiniControl';

import { setmobilePlayer } from '../../slices/Control';
// import Control, { setminiPlayer } from '../../slices/Control';
import { useNavigate } from 'react-router-dom';
import MiniControl from './MiniControl';
import { apiConnecter } from '../../services/apiconnecter';
// import components
const MiniPlayer = ({ 
        audioRef,
        duration,
        setDuration,
        isPlaying,setIsPlaying
      
      }) => {
  // states
  
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const nevigation= useNavigate();
  const progressBarRef = useRef();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const [fav, setFav] = useState(null);
  const mobilePlayer = useSelector((state) => state.Controls.mobilePlayer);
  const [change,setchange] = useState(false);
  const trackId = useSelector((state) => state.Player.trackId);
  const userdata = useSelector((state) => state.User.userdata);
  
  const tracks = [
      {
          title,
          src ,
          author,
          thumbnail,
        },
        // ...
    ];
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  const [timeProgress, setTimeProgress] = useState(0);
 
  var startX, startY, endX, endY;

  document.addEventListener("touchstart", function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });
  
  document.addEventListener("touchend", function(event) {
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
  
    var deltaX = endX - startX;
    var deltaY = endY - startY;
  
    // Check if it's a vertical swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Swipe down
      if (deltaY > 0) {
        dispatch(setmobilePlayer(false))
        console.log("Swiped down!");
        // Your code for handling swipe down
      }
    }
  });
  
  const playAnimationRef = useRef();
 
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // useEffect(() => {
    
  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [isPlaying, audioRef, repeat,trackIndex,title]);

  async function checkFavorite() {
    const dataform = {
      SongId: trackId,
      UserId: userdata._id
    }
    try {
      const res = await apiConnecter("POST", "Album/checkFavorite", dataform);
      console.log(res.data.check);
      setFav(res.data.check);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function favHandler() {

    const dataform = {
      SongId: trackId,
      UserId: userdata._id
    }

    if (!fav) {
      const res = await apiConnecter("POST", "Album/AddFavorite", dataform);
      console.log(res);
      setFav(!fav);
      toast.success('Song Added to Favorite')
    }
    else {
      toast.success('Song remove From Favorite')
      const res = await apiConnecter("POST", "Album/RemoveFavorite", dataform);
      console.log(res);
      setFav(!fav);
    }
  }

  useEffect(()=>{
    const mobileElement = document.querySelector(".mobile");
    if(!mobilePlayer){
      
      document.body.style.overflow = "auto";
    }
    else{
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    
    }
    checkFavorite();
    
    playAnimationRef.current = requestAnimationFrame(repeat);
  },[title,mobilePlayer,isPlaying,repeat, audioRef, ,trackIndex]);


  
  // const dispatch  = useDispatch();
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  

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

  return (
    
    <div 
      style={{ backgroundImage: `url(${thumbnail})` }}
    className={`mobile  bg-cover bg-no-repeat  absolute ${mobilePlayer?"top-0 z-50":" translate-y-28 absolute z-0 opacity-0  "} bg-gradient-to-b from-sky-400  to-pink-500   mt-2 overflow-hidden  bg-black   flex flex-col w-full  h-screen transition-all  duration-100 `}>
  
      <div className="  w-full px-2  h-screen   flex flex-col gap-4  rounded-md  backdrop-blur-3xl">
    <div className='mb-2 py-2 mx-auto ' onClick={(prev) => {
        setchange(!change);
        dispatch(setmobilePlayer(false));
        // nevigation(-1);
    }}>
    <FaChevronDown style={{color:"white",height:25,width:25}}/>
    </div>

      <MobilePlayer
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              
            }}
          />
          <div className="text-white ml-3 mt-5">
          <p className="text-lg  font-medium"> {title}</p>
          <p className='text-sm opacity-80'>{author}</p>
        </div>
        <div className='flex  flex-col w-full items-center justify-center gap-6 '>
        <div className=' w-full '>
             <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
          <div className='flex  items-center  justify-between'>
            
        <span className="text-xs opacity-80">{formatTime(timeProgress)}</span>
        
        <span className="text-xs   opacity-80">{formatTime(duration)}</span>
          </div>
        </div>

          <MiniControl
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              isPlaying,
              setIsPlaying,
              volume,
              setVolume,
              muteVolume,
              setMuteVolume
            }}
          />
        <div className='  p-3  flex  items-center justify-between w-full  lg:flex md:flex'>
          <MdFormatListBulletedAdd style={{ color: 'white', height: 30, width: 30 }} />
          <button
            className='rounded-full  hover:scale-95'
            onClick={() => favHandler()}
          >
            {fav ? (
              <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
            ) : (
              <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />
            )}
          </button>
        </div>
        </div>
         
        </div>
      </div>
      
  );
};
export default MiniPlayer;