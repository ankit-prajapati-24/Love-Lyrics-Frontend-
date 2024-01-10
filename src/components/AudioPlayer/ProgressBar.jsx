import { useEffect } from "react";
import { setNextIndex,setPrevIndex } from '../../slices/album';
import { useDispatch } from "react-redux";
const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
  }) => {
    const dispatch  = useDispatch();
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };

    useEffect(() => {
      if(timeProgress == duration){
        dispatch(setNextIndex(1));
      }
    }, [timeProgress])
    
  
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
      <div className=" hidden lg:flex md:flex  w-full max-w-[550px] items-center justify-center text-white gap-2">
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