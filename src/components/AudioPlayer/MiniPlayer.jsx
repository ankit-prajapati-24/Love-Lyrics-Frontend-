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
import src  from '../assets/Dil_Jhoom(128k) (1).m4a'
import Minicontrol from './MiniControl';
import { setminiPlayer } from '../../slices/Control';
import { useNavigate } from 'react-router-dom';
// import components
const MiniPlayer = ({ 
  audioRef,
        progressBarRef,
        duration,
        setTimeProgress,
        tracks,
        trackIndex,
        setTrackIndex,
        setCurrentTrack,
        handleNext,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        muteVolume,
        setMuteVolume,
        title,   // pass title to AudioPlayer
        author,  // pass author to AudioPlayer
        src,     // pass src to AudioPlayer
        thumbnail, // pass thumbnail to AudioPlayer
        // fav,     // pass fav to AudioPlayer
        // change,
        setDuration,
        timeProgress, 
        currentTrack,
        handleProgressChange
        // title
      }) => {
  // states
  
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [volume, setVolume] = useState(60);
  // const [muteVolume, setMuteVolume] = useState(false);
  const nevigation= useNavigate();
  
  const dispatch = useDispatch();
  // const title = useSelector((state) => state.Player.name);
  // const author = useSelector((state) => state.Player.singer);
  // const src = useSelector((state) => state.Player.songurl);
  // const thumbnail = useSelector((state) => state.Player.img);
  const [fav, setFav] = useState(false);
  const [change,setchange] = useState(false);
  
  // const tracks = [
  //     {
  //         title,
  //         src ,
  //         author,
  //         thumbnail,
  //       },
  //       // ...
  //   ];
  // const [trackIndex, setTrackIndex] = useState(0);
  // const [currentTrack, setCurrentTrack] = useState(
  //   tracks[trackIndex]
  // );
  // const [timeProgress, setTimeProgress] = useState(0);
  // const [duration, setDuration] = useState(0);

  // reference
  // const onLoadedMetadata = () => {
  //   const seconds = audioRef.current.duration;
  //   setDuration(seconds);
  //   progressBarRef.current.max = seconds;
  // };
  // const audioRef = useRef();
  // const progressBarRef = useRef();

  // const handleNext = () => {
  //   if (trackIndex >= tracks.length - 1) {
  //     setTrackIndex(0);
  //     setCurrentTrack(tracks[0]);
  //   } else {
  //     setTrackIndex((prev) => prev + 1);
  //     setCurrentTrack(tracks[trackIndex + 1]);
  //   }
  // };

  useEffect(()=>{},[title]);
  return (
    
    <div className={`realative ${change?"translate-y-[700px]":"top-0"} mt-2 overflow-hidden h-screen border border-blue-700  bg-yellow-700  z-50  flex flex-col w-full  transition-all duration-800 `}>
  
      <div className="  w-full px-2    flex flex-col gap-4  rounded-md ">
    <div className=' ' onClick={(prev) => {
        setchange(!change);
        dispatch(setminiPlayer(true));
        nevigation(-1);

    }}>
    <FaChevronDown style={{color:"white",height:25,width:25}}/>
    </div>
      <MobilePlayer
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
        <div className='flex bg-yellow-700 flex-col w-full items-center justify-center gap-6 '>
        <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        
       
          <Minicontrol
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
              isPlaying,
              setIsPlaying,
              volume,
              setVolume,
              muteVolume,
              setMuteVolume
            }}
          />
        <div className='bg-[#000] p-4  gap-2 items-center justify-center hidden lg:flex md:flex'>
          <button
            className='rounded-full p-4 hover:scale-95'
            onClick={() => setFav(!fav)}
          >
            {fav ? (
              <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />
            ) : (
              <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
            )}
          </button>
          <MdFormatListBulletedAdd style={{ color: 'skyblue', height: 30, width: 30 }} />
        </div>
        </div>
         
        </div>
      </div>
      
  );
};
export default MiniPlayer;