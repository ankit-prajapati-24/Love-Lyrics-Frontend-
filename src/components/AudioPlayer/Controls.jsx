import { useState, useEffect, useRef, useCallback } from 'react';
import { setNextIndex, setPrevIndex } from '../../slices/album';
import { apiConnecter } from '../../services/apiconnecter';
import toast from 'react-hot-toast';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
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

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  setTrackIndex,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  setDuration
}) => {
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
    dispatch( setIsPlaying(!isPlaying))
  };

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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    
    checkFavorite();
    const seconds = audioRef.current.duration;
    // dispatch(setDuration(seconds));
    progressBarRef.current.max = seconds;
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat, trackIndex, title]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

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

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
    if (song && song.length > 0) {

      dispatch(setImg(song[trackIndex].Image));
      dispatch(setSongUrl(song[trackIndex].Url));
      dispatch(setName(song[trackIndex].Name));
      dispatch(setSinger(song[trackIndex].Artists[0]));
      dispatch(settrackId(song[trackIndex]._id));
    }
    setwindowidth(window.innerWidth);
    //console.log("this is index", trackIndex);
  }, [volume, audioRef, muteVolume, trackIndex]);

  return (
    <div className="controls-wrapper text-white flex      items-center ">
      <div className="flex px-4 gap-3 items-center">

        {
          windowwidth > 800 &&
          <button className='hidden lg:flex md:flex' onClick={() => dispatch(setPrevIndex(1))}>
            <IoPlaySkipBackSharp style={{ height: 20, width: 20 }} />
          </button>

        }
        {
          windowwidth > 800 &&
          <button className='hidden lg:flex md:flex' onClick={skipBackward}>
            <IoPlayBackSharp style={{ height: 20, width: 20 }} />
          </button>
        }
        {
          windowwidth < 800 ?
            <button className='rounded-full p-3 hover:scale-95' onClick={togglePlayPause}>
              {isPlaying ? <IoPauseSharp style={{ height: 30, width: 30 }} /> : <IoPlaySharp style={{ height: 30, width: 30 }} />}
            </button>

            : <button className='bg-sky-500 rounded-full p-3 hover:scale-95' onClick={togglePlayPause}>
              {isPlaying ? <IoPauseSharp style={{ height: 15, width: 15 }} /> : <IoPlaySharp style={{ height: 15, width: 15 }} />}
            </button>
        }
        {
          windowwidth > 800 &&
          <button className='hidden lg:flex md:flex' onClick={skipForward}>
            <IoPlayForwardSharp style={{ height: 20, width: 20 }} />
          </button>
        }
        {
          windowwidth > 800 &&
          <button className='hidden lg:flex md:flex' onClick={() => dispatch(setNextIndex(1))}>
            <IoPlaySkipForwardSharp style={{ height: 20, width: 20 }} />
          </button>
        }
      </div>
      <button
        className='rounded-full p-4 hover:scale-95'
        onClick={() => favHandler()}
      >
        {fav ? (
          <FaHeart style={{ color: 'pink', height: 20, width: 20 }} />
        ) : (
          <FaRegHeart style={{ color: 'pink', height: 20, width: 20 }} />
        )}
      </button>

      {/* <div className="flex items-center justify-center">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff style={{ height: 20, width: 20 }}/>
          ) : volume < 40 ? (
            <IoMdVolumeLow style={{ height: 20, width: 20 }}/>
          ) : (
            <IoMdVolumeHigh style={{ height: 20, width: 20 }}/>
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
      </div> */}
    </div>
  );
};

export default Controls;