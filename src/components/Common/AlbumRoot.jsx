import React, { useEffect, useState } from 'react';
import { apiConnecter } from '../../services/apiconnecter';
import AlbumCard from './AlbumCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/bundle';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
// import { Navigation, Pagination } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useHistory } from 'react-router-dom';
import AlbumRootSkeleton from './AlbumRootSkeleton';

const AlbumRoot = () => {
  const [loader, setLoader] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [card ,setCard] = useState(0);
  const names = ["Top Best Albums","India's Best","Top Playlist"];
  // const history = useHistory(); // Import useHistory for navigation

  async function getAlbums() {
    try {
      setLoader(true);
      const res = await apiConnecter('post', 'Album/GetAllAlbum');
      console.log(res.data.Data);
      setAlbums(res.data.Data);
      setLoader(false);
    } catch (err) {
      console.log('err', err);
    }
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
    if(windowWidth < 500){
      setCard(5);
    }
    else {
      setCard(3);
    }
  };
 
  useEffect(() => {
    // Add event listener to update window width on resize
    getAlbums();
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []); 

  return (
    <>
    {loader?
    <div className='flex flex-col'>
      
    <AlbumRootSkeleton></AlbumRootSkeleton>
    <AlbumRootSkeleton></AlbumRootSkeleton>
    <AlbumRootSkeleton></AlbumRootSkeleton>
    </div>
    :<div>
    <div className=' flex flex-col gap-2'>
  <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
      {names[0]}
    </h1>
  {
      windowWidth<500 ?
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(0,5).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
      :
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(0,7).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
     }
  </div>
  <div className='mt-5 flex flex-col gap-2'>
  <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
      {names[1]}
    </h1>
  {
      windowWidth<500 ?
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(5,10).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
      :
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(6,15).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
     }
  </div>
  <div className='mt-5 flex flex-col gap-2'>
  <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
      {names[2]}
    </h1>
  {
      windowWidth<500 ?
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(10,15).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
      :
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.slice(0,15).map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
          </SwiperSlide>
        ))}
      </Swiper>
     }
  </div>
    </div>
    }

    </>
  );
};

export default AlbumRoot;
