import { useEffect, useState } from "react";
import { setNextIndex,setPrevIndex } from '../../slices/album';
import { useDispatch, useSelector } from "react-redux";
const ProgressBar = ({
    progressBarRef,
    audioRef,
    
    duration,
  }) => {
    const dispatch  = useDispatch();
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };
  
    const timeProgress = useSelector((state) => state.Controls.timeProgress);


  
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

    useEffect(() => {
      // setTimeProgress(audioRef.current.currentTime);
    }, [audioRef])
    
  
    return (
      <div className=" hidden lg:flex   w-full max-w-[550px] items-center justify-center text-white gap-2">
        <span className="text-xs md:block lg:block hidden opacity-80">{formatTime(timeProgress)}</span>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="text-xs md:block lg:block hidden  opacity-80">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;