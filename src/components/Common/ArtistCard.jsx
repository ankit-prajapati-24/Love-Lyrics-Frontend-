import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa6';
import { apiConnecter } from '../../services/apiconnecter';
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { setAlbumName, setAlbumimg, setSongs } from '../../slices/album';
import { MdVerified } from "react-icons/md";
import {  setIsPlaying } from '../../slices/Control';
import { useEffect } from 'react';
import {
    setName,
    setSinger,
    setSongUrl,
    setImg,
    name,
    settrackId
} from '../../slices/player';
import SongList from './SongList';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { isPlain } from '@reduxjs/toolkit';


const ArtistCard = () => {
    const dispatch = useDispatch();
    const albumName = useSelector((state) => state.Album.Albumname);
    const albumimg = useSelector((state) => state.Album.Albumimg);
    const songlist = useSelector((state) => state.Album.Songs);
    const Songs = songlist.filter((song, index, self) =>
        index === self.findIndex((s) => s.Name === song.Name)
    );
    const trackIndex = useSelector((state) => state.Album.trackIndex);
    // const [Name, setName] = useState("");
    const [play, setPlay] = useState(false);
    const [fav, setFav] = useState(false);
    const location = useLocation();
    // toast.loading("loading...")

    const getArtistsData = async () => {
        try {

            // Convert parameters to a URL query string
            const artistName = location.pathname.split("/")[2];
            const encodedArtistName = artistName.replace(/%20+/g, ' ');
            const params = {
                ArtistId: encodedArtistName,
            };
            const queryString = new URLSearchParams(params).toString();
            //console.log(encodedArtistName);

            const res = await apiConnecter("get", `tracks/getArtistsData?${queryString}`);
            const data = res.data.data;
            dispatch(setAlbumName(data.Name));
            dispatch(setAlbumimg(data.Image));
            dispatch(setSongs(data.Songs));


            //console.log(res);
        } catch (e) {
            //console.error(e);
        }
    };


    const compareSongs = (song1, song2) => {
        const name1 = song1.Name.toLowerCase();
        const name2 = song2.Name.toLowerCase();

        if (name1 > name2) {
            return -1;
        }
        if (name1 < name2) {
            return 1;
        }
        return 0;
    };
    function PlayallTrack() {
      
            //console.log(Songs.length, Songs[0]);
            dispatch(setSongUrl(Songs[0].Url));
            dispatch(setName(Songs[0].Name));
            dispatch(setSinger(Songs[0].Artists[0]));
            dispatch(setImg(Songs[0].Image));
            dispatch(settrackId(Songs[0]._id));
            dispatch(setIsPlaying(true));
      
        // }
    }
    function FavHandler() {
        if (fav) {
            setFav(false);
            toast('Album Liked..', {
                icon: '😍',
            });
        }
        else {
            setFav(true)
            toast('Album UnLiked..', {
                icon: '😓',
            });
        }
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
  
        // Cleanup the event listener when the component unmounts
        getArtistsData();
        setName(window.location.pathname.slice(1))
        return () => {
          window.removeEventListener('resize', updateWindowWidth);
        };
    }, [name, setName, setSongUrl])

    return (
        <div
            className={`flex flex-col z-10  items-center mb-4 bg-cover bg-no-repeat relative overflow-x-hidden bg-[#838996]  `}
            style={{ backgroundImage: `url(${albumimg})` }}
        >
            {/* White background overlay */}
            {/* <div className="absolute inset-0  opacity-75"></div> */}

            {/* Backdrop blur effect */}
            {/* <div className="absolute inset-0 backdrop-blur-3xl"></div> */}


         <div className="flex items-center justify-center lg:justify-between backdrop-blur-3xl p-4 relative w-full">
     {
        windowWidth < 800 ?
        <div className="flex flex-col items-center lg:flex-row justify-cente w-full r lg:justify-between p-2 relative">
      <div className='flex items-center justify-center lg:flex-row flex-col gap-2'>
      <img
          src={albumimg}
          alt="album"
          className="w-full h-full max-w-[150px] max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] shadow-2xl drop-shadow-3xl shadow-black hover:scale-105 transition-all duration-200 lg:lg:mb-0 rounded-full"
        />
        <span className="bg-clip-text items-center justify-center gap-1 flex text-[18px] mt-4 mb-2 lg:my-6 text-white font-extrabold">
          {albumName}<MdVerified style={{ color: 'skyblue', height: 20, width: 20 }} />
        </span>
      </div>
        <div className='flex items-center justify-center gap-2'>
        <button
              className='bg-sky-500 rounded-full text-white p-4 hover:scale-95'
              onClick={() => PlayallTrack()}
            >
              <FaPlay />
            </button>
            <span className='text-sm ml-2 font-bold'>
              Play All 
              </span>
        <button
            className="rounded-full p-2 hover:scale-95  "
            onClick={() => FavHandler()}
          >
            {fav ? (
              <FaHeart style={{ color: 'skyblue', height: 25, width: 25 }} />
            ) : (
              <FaRegHeart style={{ color: 'skyblue', height: 25, width: 25 }} />
            )}
          </button>
        </div>
      </div>
      :
      
      <div className="flex  items-center  gap-2 w-full r lg:justify-between p-2 relative">
      <div className='flex items-center justify-center  gap-5 '>
      <img
          src={albumimg}
          alt="album"
          className="w-full h-full max-w-[150px] max-h-[150px] lg:max-w-[200px] lg:max-h-[200px] shadow-2xl drop-shadow-3xl shadow-black hover:scale-105 transition-all duration-200 lg:lg:mb-0 rounded-full"
        />
      <div>
      <span className="bg-clip-text items-center justify-center gap-1 flex  text-[40px] md:text-[2rm] mt-4  lg:my-6 text-white font-extrabold">
          {albumName}<MdVerified style={{ color: 'skyblue', height: 30, width: 30 }} />
        </span>
        <div className='flex items-center justify-start gap-2 mb-2 '>
        <button
              className='bg-sky-500 rounded-full text-white p-4 hover:scale-95'
              onClick={() => PlayallTrack()}
            >
              {play ? <FaPause /> : <FaPlay />}
            </button>
            <span className='text-sm ml-2 font-bold text-white'>
              Play All 
              </span>
        <button
            className="rounded-full p-2 hover:scale-95   "
            onClick={() => FavHandler()}
          >
            {fav ? (
              <FaHeart style={{ color: 'skyblue', height: 25, width: 25 }} />
            ) : (
              <FaRegHeart style={{ color: 'skyblue', height: 25, width: 25 }} />
            )}
          </button>

        </div>
          <span className='text-white mt-7  pt-2 '>
           <b> Total Tracks</b> : {Songs.length}
          </span>
      </div>
      </div>
       
      </div>
     }
      

      {/* <div className="flex flex-col text-3xl lg:text-3xl font-bold flex-wrap lg:mx-4 mb-4 -mt-3 lg:mb-0">
        <div className="self-start justify-center flex items-center">
          <button
            className="rounded-full p-4 hover:scale-95"
            onClick={() => FavHandler()}
          >
            {fav ? (
              <FaRegHeart style={{ color: 'pink', height: 30, width: 30 }} />
            ) : (
              <FaHeart style={{ color: 'pink', height: 30, width: 30 }} />
            )}
          </button>
          <span className="bg-clip-text mt-4 lg:text-sm text-xs text-white font-extrabold">
            Total Track : {Songs && Songs.length}
          </span>
        </div>
      </div> */}
    </div>

            <div className="flex flex-col items-center bg-transparent-gradient justify-between w-full backdrop-blur-3xl   relative z-10  object-cover  ">
                <div className="flex flex-col  items-center justify-between p-2 h-[100px]  text-blue-400     w-full">

                    <div className='flex flex-row items-center justify-between pt-5 p-2 h-[150px]  text-gray-300 border-b border-b-white   w-full'>
                        <div className="font-bold text-lg w-full lg:w-[22%] mb-2 lg:mb-0">
                            Title
                        </div>
                        <div className="font-bold text-lg lg:w-[20%] hidden lg:block mb-2 lg:mb-0">
                            Album
                        </div>
                        <div className="font-bold text-lg hidden lg:w-[25%] mb-2 lg:mb-0  lg:block md:block">
                            Favorite
                        </div>
                        {
                          windowWidth < 800  && 
                          <div className="font-bold text-lg lg:w-[25%] mb-2 lg:mb-0  lg:block md:block">
                            More
                            </div>
                        }
                        <div className="font-bold text-lg hidden lg:w-[25%] md:block">
                            Download
                        </div>
                    </div>

                </div>
                {/* <hr></hr> */}
                <div className="w-full  py-2 group mb-4 lg:mb-[300px]  ">
                    {Songs &&
                        Songs.map((song, index) => (
                            <SongList song={song} index={index} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistCard;
