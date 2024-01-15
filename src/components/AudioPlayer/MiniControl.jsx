import { useState, useEffect, useRef, useCallback } from 'react';
import { setNextIndex, setPrevIndex } from '../../slices/album';
import { apiConnecter } from '../../services/apiconnecter';
import toast from 'react-hot-toast';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { setDuration, setIsPlaying, setTimeProgress } from '../../slices/Control';
import {
  setName,
  setSinger,
  setSongUrl,
  settrackId,
  setImg,
} from '../../slices/player';
// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const MiniControl = ({
  audioRef,
  progressBarRef,
  tracks,
  setTrackIndex,
  setCurrentTrack
}) => {
  const timeProgress = useSelector((state) => state.Controls.timeProgress);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  const duration = useSelector((state) => state.Controls.duration);
  
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const trackIndex = useSelector((state) => state.Album.trackIndex);
  const song = useSelector((state) => state.Album.Songs);
  const [fav, setFav] = useState(null);
  const trackId = useSelector((state) => state.Player.trackId);
  const userdata = useSelector((state) => state.User.userdata);
  const [windowwidth, setwindowidth] = useState(0);
  const title = useSelector((state) => state.Player.name);


  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying))
  };

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };


  return (
    <div className="controls-wrapper text-white flex      items-center ">
        <div className="flex px-4 gap-3 ">
        <button  onClick={()=> dispatch(setPrevIndex(1))}>
          <IoPlaySkipBackSharp style={{ height: 30, width: 30 }} />
        </button>
        <button  onClick={skipBackward}>
          <IoPlayBackSharp style={{ height: 30, width: 30 }} />
        </button>

        <button className='bg-sky-500 rounded-full p-3 hover:scale-95' onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp style={{ height: 30, width: 30 }}/> : <IoPlaySharp style={{ height: 30, width: 30 }}/>}
        </button>
        <button onClick={skipForward}>
          <IoPlayForwardSharp style={{ height: 30, width: 30 }}/>
        </button>
        <button onClick={()=> dispatch(setNextIndex(1))}>
          <IoPlaySkipForwardSharp style={{ height: 30, width: 30 }}/>
        </button>
      </div>
      {/* <button
        className='rounded-full p-4 hover:scale-95'
        // onClick={() => favHandler()}
      >
        {fav ? (
          <FaHeart style={{ color: 'pink', height: 20, width: 20 }} />
        ) : (
          <FaRegHeart style={{ color: 'pink', height: 20, width: 20 }} />
        )}
      </button> */}

    </div>
  );
};

export default MiniControl;