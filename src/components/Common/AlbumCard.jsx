import React from 'react';
import AnimatedButton from './AnimatedButton';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { setAlbumName, setAlbumimg, setSongs } from '../../slices/album';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ Image, Title, Songs }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const compareSongs = (song1, song2) => {
    const name1 = song1.Name.toLowerCase();
    const name2 = song2.Name.toLowerCase();

    if (name1 > name2) {
      return 1;
    }
    if (name1 < name2) {
      return -1;
    }
    return 0;
  };

  return (
    <div
      className=' w-[150px] h-[180px] md:w-[200px] md:h-[200px] lg:w-[200px] lg:h-[200px] lg:bg-gray-900  p-2  rounded-md hover:bg-gray-800  transition-all duration-200  object-contain group flex-col relative items-center justify-center '
      onClick={() => {
        dispatch(setAlbumName(Title));
        dispatch(setAlbumimg(Image));
        dispatch(setSongs(Songs.slice().sort(compareSongs)));
        navigation("/AlbumSongs");
      }}
    >
      <div className=' w-full md:w-[200px] md:h-[140px] lg:w-[150px] lg:h-[150px]   border shadow-lg mx-auto rounded-md'>
        <img
          src={Image}
          alt='albumimg'
          className=' rounded-lg w-full h-full  md:w-[200px] md:h-[140px] lg:w-[150px] lg:h-[150px]  transition-all duration-200'
        />
      </div>
      <h1 className='font-bold text-xs md:text-md lg:text-[15px] text-center text-gray-300 mt-2'>{Title}</h1>
      {/* Additional styling for the play button */}
      <button className='bg-sky-500 rounded-full p-4 opacity-0 group-hover:opacity-100 bottom-[40%] left-[40%] absolute group-hover:-translate-z-full transition-all duration-1000'>
        <FaPlay />
      </button>
    </div>
  );
};

export default AlbumCard;
