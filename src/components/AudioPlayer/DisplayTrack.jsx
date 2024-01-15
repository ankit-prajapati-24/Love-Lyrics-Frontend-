import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { setmobilePlayer } from '../../slices/Control';
import { setNextIndex,setPrevIndex } from '../../slices/album';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
  setOpen
}) => {
   const dispatch = useDispatch();
    const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  useEffect(()=>{},currentTrack,title);

  return (
    <div className=' w-full items-start flex justify-start   md:max-w-[200px] lg:max-w-[300px]  ' onClick={() => setOpen(true)}>
      {/* <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={()=> dispatch(setNextIndex(1))}
      /> */}
      <div className=" flex items-center justify-center gap-2   ">
        <div className="audio-image">
          {currentTrack.thumbnail ? (
            <img src={thumbnail} alt="audio avatar" className='w-[45px] h-[40px]  md:w-[60px] md:h-[50px] lg:w-[60px] lg:h-[50px] ml-2' />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text-white ml-3">
          <p className="text-sm  font-medium  lg:w-full overflow-hidden"> {title}</p>
          <p className='text-xs opacity-80'>{author}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
