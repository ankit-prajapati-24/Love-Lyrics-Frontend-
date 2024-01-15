import React, { useEffect, useState } from 'react'
import { apiConnecter } from '../../services/apiconnecter'
import SongList from '../Common/SongList';
import { useDispatch,useSelector } from 'react-redux';
import { setSongs } from '../../slices/album';
import SkeletonLoading from '../Common/SkeletonLoading';

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

const RandomAudioPlayer = () => {
    const [loader,setLoader] = useState(false);
    const [tracks,seTracks] = useState([]);
    const title = useSelector((state) => state.Player.name);
    const author = useSelector((state) => state.Player.singer);
    const src = useSelector((state) => state.Player.songurl);
    const thumbnail = useSelector((state) => state.Player.img);
    
    const dispatch = useDispatch();
  
    async function getAllTrack(){
    try{
        setLoader(true);
        const res = await apiConnecter("post","tracks/getAllTrack");

        console.log(res.data.tracks);
        seTracks(res.data.tracks);
        const SongList = res.data.tracks;
        const shuffledList = [...SongList].sort(() => Math.random() - 0.5);
        seTracks(shuffledList.slice(0,50));
        dispatch(setSongs(shuffledList));
        setLoader(false);
    }
    catch(err){
        console.error(err);
    }
   }
   useEffect(() => {
    getAllTrack();
   }, [])
   
  return (
    <div
      className={` w-full h-screen backdrop-blur-3xl  justify-center  items-center mb-4 bg-cover bg-no-repeat relative overflow-x-hidden bg-[#838996]  `}
      style={{ backgroundImage: `url(${thumbnail})` }}
    >
    <div className="   backdrop-blur-3xl "
      >
     {/* <div className='w-full p-2 text-white bg-black flex gap-2'>
  <h1>Filter The Songs</h1>
  <select className='w-[500px] text-black' >
    <option value="Darshan Raval">Darshan Raval</option>
    <option value="Ariji Singh">Arijit Singh</option>
    <option value="Atif Aslam">Atif Aslam</option>
    <option value="Armaan Malik">Armaan Malik</option>
  </select>
</div> */}

       <div className='flex p-2  text-gray-300 border-b border-b-white  bg-gradient-to-b from-black  w-screen'>
            <div className="font-bold text-lg w-full lg:w-[25%] mb-2 lg:mb-0">
              Title
            </div>
            <div className="font-bold text-lg lg:w-[23%] hidden lg:block mb-2 lg:mb-0">
              Album
            </div>
            <div className="font-bold text-lg lg:w-[25%] mb-2 lg:mb-0  lg:block md:block">
             Favorite
            </div>
            <div className="font-bold text-lg hidden lg:w-[25%] md:block">
              Download
            </div>
          </div>
       

     {
      loader?[...Array(7)].map((_, index) => (
       <SkeletonLoading/>
          )):<div className='w-screen  backdrop-blur-xl '>
        {tracks &&
            tracks.map((song, index) => (
              <SongList song={song} index={index} />
            ))}
      </div> 
     }

     </div>
      </div>
  )
}

export default RandomAudioPlayer
