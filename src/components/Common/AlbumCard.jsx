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
      className='  pl-1 max-w-[200px]  rounded-md   transition-all duration-200  object-contain group flex-col relative items-center justify-center '
      onClick={() => {
        dispatch(setAlbumName(Title));
        dispatch(setAlbumimg(Image));
        dispatch(setSongs(Songs));
        navigation("/AlbumSongs");
      }}
    >
      <div className='bg-black flex min-h-[100px] min-w-[100px]  text-white flex-col items-center justify-center'>
      <img src = {Image} className='  rounded-md ' alt='s'/>
      <div className=" lg:text-sm text-xs  font-medium overflow-hidden text-center mt-2"> {Title}</div>
          {/* <div className='text-xs opacity-80 text-center'>{song.Artists[0]}</div> */}
      <button className='bg-sky-500 rounded-full p-4 opacity-0 group-hover:opacity-100 bottom-[40%] left-[40%] absolute group-hover:-translate-z-full transition-all duration-1000'>
        <FaPlay />
      </button>
    </div>
    </div>
  );
};

export default AlbumCard;
