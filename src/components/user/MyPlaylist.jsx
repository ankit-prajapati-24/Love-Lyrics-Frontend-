import React, { useEffect, useState } from 'react'
import { apiConnecter } from '../../services/apiconnecter';
import { useSelector } from 'react-redux';
import player from '../../slices/player';
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from '../Common/AlbumCard';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import "swiper/css";
import AlbumRootSkeleton from '../Common/AlbumRootSkeleton';
import 'swiper/css/bundle';
import { Link } from 'react-router-dom';

const MyPlaylist = () => {
    const [Playlist,setPlaylist] = useState([]);
    const [loader,setLoader] = useState(false);
    const userdata = useSelector((state) => state.User.userdata);
    const fetchPlaylist = async()  => {

        try{
            setLoader(true);
            const res = await apiConnecter("post","Playlist/getPlaylists",{id:userdata._id});
            //console.log(res);
            setPlaylist(res.data.playlists);
            setLoader(false);
        }
        catch(err){
            //console.error(err);
        }
    } 
    
  const [card, setCard] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);

  };
    useEffect(()=> {

      if (windowWidth < 300) {
        setCard(2);
      }
      else if (windowWidth < 500) {
        setCard(3);
      }
      else if (windowWidth < 800) {
        setCard(4);
      }
      else if (windowWidth < 1000) {
        setCard(3);
      }
      else if (windowWidth < 1200) {
        setCard(4);
      }
      else setCard(6)
        fetchPlaylist();
        window.addEventListener('resize', updateWindowWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
    },[])
  return (
    <div
    className={` bg-cover bg-no-repeat  bg-[#838996]  `}
    style={{ backgroundImage: `url(https://c.saavncdn.com/820/Tera-Zikr-Hindi-2017-20171108125619-500x500.jpg)` }}
  >
   {loader ?
        <div className='flex flex-col h-full backdrop-blur-3xl'>
        
          <AlbumRootSkeleton></AlbumRootSkeleton>
          <AlbumRootSkeleton></AlbumRootSkeleton>
          <AlbumRootSkeleton></AlbumRootSkeleton>
        </div>
        :
        Playlist.length == 0 ?
        <div className='w-screen h-[600px]  flex flex-col items-center justify-center text-white gap-2 backdrop-blur-3xl'>
        <h1>  You Do Not Have Any Playlist </h1>
        <Link to="/NewPlaylist" className='bg-blue-500 rounded-md text-white p-2'>
        Create Playlist
        </Link>

        </div> :
     <div className=' flex flex-col gap-2 h-screen w-full backdrop-blur-3xl'>
            <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
              My Playlist
            </h1>
            {
              windowWidth < 500 ?
                <Swiper
                  slidesPerView={card}
                  spaceBetween={15}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {Playlist.map((playlist, index) => (
                    <SwiperSlide key={index}>
                    <AlbumCard Title = {playlist.Name}  Image={playlist.Image} Songs = {playlist.Songs} border= {true}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <Swiper
                  slidesPerView={card}
                  spaceBetween={20}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {Playlist.map((playlist, index) => (
                    <SwiperSlide key={index}>
                    <AlbumCard Title = {playlist.Name}  Image={playlist.Image} Songs = {playlist.Songs} border= {true}/>
                    </SwiperSlide>
                  ))}
                </Swiper>
            }
          </div>
   }
   </div>
  )
}

export default MyPlaylist
