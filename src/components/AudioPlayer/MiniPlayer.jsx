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
import { setDuration, setIsPlaying } from '../../slices/Control';
import { setmobilePlayer } from '../../slices/Control';
import { useNavigate } from 'react-router-dom';
import MiniControl from './MiniControl';
import { apiConnecter } from '../../services/apiconnecter';

// // import components
const MiniPlayer = ({ 
        audioRef,
        timeProgress,
        setTimeProgress
      }) => {
  // states
  
  // const timeProgress = useSelector((state) => state.Controls.timeProgress);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  const duration = useSelector((state) => state.Controls.duration);
  
    
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
  // const [timeProgress, setTimeProgress] = useState(0);
 
  
  
  const playAnimationRef = useRef();
 
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
     setTimeProgress(currentTime)
    if(currentTime && progressBarRef.current){
      progressBarRef.current.value = currentTime;
    }
   if(progressBarRef.current && progressBarRef.current.style){
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );
   }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  

  async function checkFavorite() {
    const dataform = {
      SongId: trackId,
      UserId: userdata._id
    }
    try {
      const res = await apiConnecter("post", "Album/checkFavorite", dataform);
      //console.log(res.data.check);
      setFav(res.data.check);
    }
    catch (err) {
      //console.log(err);
    }
  }

  async function favHandler() {

    const dataform = {
      SongId: trackId,
      UserId: userdata._id
    }

    if (!fav) {
      const res = await apiConnecter("post", "Album/AddFavorite", dataform);
      //console.log(res);
      setFav(!fav);
      toast.success('Song Added to Favorite')
    }
    else {
      toast.success('Song remove From Favorite')
      const res = await apiConnecter("post", "Album/RemoveFavorite", dataform);
      //console.log(res);
      setFav(!fav);
    }
  }

  useEffect(()=>{
    checkFavorite();
    const seconds = audioRef.current.duration;
    // dispatch(setDuration(seconds))
    progressBarRef.current.max = seconds;
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
    className={`mobile  bg-cover bg-no-repeat   bg-gradient-to-b from-sky-400  to-pink-500   overflow-hidden  bg-black   flex flex-col w-full  h-screen transition-all  duration-100 `}>
  
      <div className="  w-full px-2  h-screen   flex flex-col gap-4  rounded-md  backdrop-blur-3xl">
  
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
// export default MiniPlayer;

// const MiniPlayer = ({audioRef}) => {
  
//   const timeProgress = useSelector((state) => state.Controls.timeProgress);
//   const isPlaying = useSelector((state) => state.Controls.isPlaying);
//   const duration = useSelector((state) => state.Controls.duration);
  
//   const [volume, setVolume] = useState(60);
//   const [muteVolume, setMuteVolume] = useState(false);
//   const nevigation= useNavigate();
//   const progressBarRef = useRef();
//   const dispatch = useDispatch();
//   const title = useSelector((state) => state.Player.name);
//   const author = useSelector((state) => state.Player.singer);
//   const src = useSelector((state) => state.Player.songurl);
//   const thumbnail = useSelector((state) => state.Player.img);
//   const [fav, setFav] = useState(null);
//   const mobilePlayer = useSelector((state) => state.Controls.mobilePlayer);
//   const [change,setchange] = useState(false);
//   const trackId = useSelector((state) => state.Player.trackId);
//   const userdata = useSelector((state) => state.User.userdata);

//   const formatTime = (time) => {
//         if (time && !isNaN(time)) {
//           const minutes = Math.floor(time / 60);
//           const formatMinutes =
//             minutes < 10 ? `0${minutes}` : `${minutes}`;
//           const seconds = Math.floor(time % 60);
//           const formatSeconds =
//             seconds < 10 ? `0${seconds}` : `${seconds}`;
//           return `${formatMinutes}:${formatSeconds}`;
//         }
//         return '00:00';
//       };
  
//   const handleProgressChange = () => {
//     audioRef.current.currentTime = progressBarRef.current.value;
//   };

//   // const playAnimationRef = useRef();
 
//   //   const repeat = useCallback(() => {
//   //     const currentTime = audioRef.current.currentTime;
//   //     dispatch(setTimeProgress(currentTime))
//   //     progressBarRef.current.value = currentTime;
      
//   //     playAnimationRef.current = requestAnimationFrame(repeat);
//   //   }, [audioRef, duration, progressBarRef, setTimeProgress]);
  
//   //   useEffect(() => {
      
//   //   }, [audioRef])
    
//   return (
//     <div
//            style={{ backgroundImage: `url(${thumbnail})` }}
//     className={`mobile  bg-cover bg-no-repeat  bg-gradient-to-b from-sky-400  to-pink-500   mt-2 overflow-hidden  bg-black   flex flex-col w-full  h-screen transition-all  duration-100 `}>
  
//       <MobilePlayer
//             {...{
//               audioRef,
//               setDuration,
//               progressBarRef,
//             }}
//           />
//       <div className="text-white ml-3 mt-5">
//        <p className="text-lg  font-medium"> {title}</p>
//       <p className='text-sm opacity-80'>{author}</p>
//       </div>
//         <div className='flex  flex-col w-full items-center justify-center gap-6 '>
//         <div className=' w-full '>
//             <input
//           type="range"
//           ref={progressBarRef}
//           defaultValue="0"
//           onChange={handleProgressChange}
//         />
//           <div className='flex  items-center  justify-between'>
            
//         {/* <span className="text-xs opacity-80">{formatTime(audioRef.current.currentTime)}</span> */}
        
//         {/* <span className="text-xs   opacity-80">{formatTime(duration)}</span> */}
//           </div>
//         </div>
//         </div>
//         {/* <MiniControl
//             {...{
//               audioRef,
//               progressBarRef,
//               duration,
//               setTimeProgress,

//               isPlaying,
//               setIsPlaying,
//               volume,
//               setVolume,
//               muteVolume,
//               setMuteVolume
//             }}
//           /> */}
//     </div>
//   )
// }

// export default MiniPlayer
