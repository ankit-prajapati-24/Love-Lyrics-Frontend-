import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMusicNoteBeamed } from 'react-icons/bs';

import { setNextIndex,setPrevIndex } from '../../slices/album';

const MobilePlayer = ({
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
   const dispatch = useDispatch();
    const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    dispatch( setDuration(seconds));
    progressBarRef.current.max = seconds;
  };
  useEffect(()=>{},[title]);

  return (
    <div className='  bg-cover bg-no-repeat   rounded-xl  mx-2  shadow-2xl  ' 
    //  style={{ backgroundImage: `url(${thumbnail})` }}
    >

      <div className=" flex items-center flex-col justify-center gap-2 w-full h-[400px]   " 
      
      >
        <div className="audio-image">
          {thumbnail ? (
            <img src={thumbnail} alt="audio avatar" className='max-w-[300px] w-full h-full max-h-[300px] rounded-md shadow-2xl ' />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobilePlayer;
