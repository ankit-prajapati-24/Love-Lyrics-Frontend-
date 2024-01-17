
// import { tracks } from '../data/tracks';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setmobilePlayer ,setIsPlaying,setDuration,setTimeProgress} from '../../slices/Control';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import src from '../assets/Dil_Jhoom(128k) (1).m4a'
import { apiConnecter } from '../../services/apiconnecter';
// import components
const AudioPlayer = ({
  audioRef,
  setOpen,
  progressBarRef,
}) => {
  // states

  const timeProgress = useSelector((state) => state.Controls.timeProgress);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  const duration = useSelector((state) => state.Controls.duration);
  
  const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const trackId = useSelector((state) => state.Player.trackId);
  const userdata = useSelector((state) => state.User.userdata);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const mobilePlayer = useSelector((state) => state.Controls.mobilePlayer);
  const [fav, setFav] = useState(null);
  const dispatch = useDispatch();

  

  const tracks = [
    {
      title,
      src,
      author,
      thumbnail,
    },
    // ...
  ];
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(
    tracks[trackIndex]
  );
  // const [duration, setDuration] = useState(0);

  // reference
  // const audioRef = useRef();
  // const progressBarRef = useRef();
//console.log(trackId);
  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  async function checkFavorite() {
    const dataform = {
      SongId: trackId,
      UserId: userdata._id
    }
    try {
      const res = await apiConnecter("POST", "Album/checkFavorite", dataform);
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
      const res = await apiConnecter("POST", "Album/AddFavorite", dataform);
      //console.log(res);
      setFav(!fav);
      toast.success('Song Added to Favorite')
    }
    else {
      toast.success('Song remove From Favorite')
      const res = await apiConnecter("POST", "Album/RemoveFavorite", dataform);
      //console.log(res);
      setFav(!fav);
    }
  }
  const windowwidth = window.innerWidth;
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
    checkFavorite();
  }, [title, volume, muteVolume]);


  return (
    <>
      <div className=" bg-[#121212] mx-2 max-w-[1600px] max-auto  w-full md:w-full lg:w-full   lg:p-2 md:p-2 fixed z-50 bottom-0  rounded-md " >
        {
          windowwidth < 800 ?
            <div className="flex flex-col w-full items-center justify-between ">
              <div className='flex justify-between items-center w-full p-1 '>
                <DisplayTrack
                  {...{
                    currentTrack,
                    audioRef,
                    setDuration,
                    progressBarRef,
                    handleNext,
                    setOpen,
                  }}

                />
                <Controls
                  {...{
                    audioRef,
                    progressBarRef,
                    duration,
                    setDuration,
                    setTimeProgress,
                    tracks,
                    trackIndex,
                    setTrackIndex,
                    setCurrentTrack,
                    handleNext,
                    isPlaying,
                    setIsPlaying
                  }}
                />
              </div>

              <ProgressBar
                {...{ progressBarRef, audioRef, timeProgress, duration }}
              />
              <div className='bg-[#121212] p-4  gap-2 items-center justify-center hidden lg:flex '>

                <MdFormatListBulletedAdd style={{ color: 'white', height: 20, width: 20 }} />
                <div className="flex items-center justify-center text-white">
                  <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                      <IoMdVolumeOff style={{ height: 20, width: 20, color: "white" }} />
                    ) : volume < 40 ? (
                      <IoMdVolumeLow style={{ height: 20, width: 20 }} />
                    ) : (
                      <IoMdVolumeHigh style={{ height: 20, width: 20 }} />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{
                      background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                    }}
                  />
                </div>
              </div>
            </div> : <div className="flex  w-full items-center justify-between ">

              <DisplayTrack
                {...{
                  currentTrack,
                  audioRef,
                  setDuration,
                  progressBarRef,
                  handleNext,
                  setOpen,
                }}
              />
              <div className='flex flex-col w-full md:w-[60%] lg:w-[60%]  items-center justify-center '>

                <Controls
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
                    setIsPlaying
                  }}
                />
                <ProgressBar
                  {...{ progressBarRef, audioRef, timeProgress, duration }}
                />
              </div>
            {
              windowwidth > 800 && 
              <div className={`bg-[#121212] flex p-4  gap-2 items-center justify-center  '`}>

<MdFormatListBulletedAdd style={{ color: 'white', height: 20, width: 20 }} />
<div className="flex items-center justify-center text-white">
  <button onClick={() => setMuteVolume((prev) => !prev)}>
    {muteVolume || volume < 5 ? (
      <IoMdVolumeOff style={{ height: 20, width: 20, color: "white" }} />
    ) : volume < 40 ? (
      <IoMdVolumeLow style={{ height: 20, width: 20 }} />
    ) : (
      <IoMdVolumeHigh style={{ height: 20, width: 20 }} />
    )}
  </button>
  <input
    type="range"
    min={0}
    max={100}
    value={volume}
    onChange={(e) => setVolume(e.target.value)}
    style={{
      background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
    }}
  />
</div>
</div>
            }
            </div>
        }

      </div>
    </>
  );
};
export default AudioPlayer;