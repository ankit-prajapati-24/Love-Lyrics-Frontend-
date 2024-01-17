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
      //console.log(res.data.Data);
      setAlbums(res.data.Data);
      setLoader(false);
    } catch (err) {
      //console.log('err', err);
    }
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
   
  };
 useEffect(() => {
  getAlbums();
 }, [])
 
  useEffect(() => {
    if(windowWidth < 300){
      setCard(2);
    }
    else if(windowWidth < 500){
      setCard(3);
    }
    else if(windowWidth < 800){
      setCard(4);
    }
    else if(windowWidth < 1000) {
      setCard(3);
    }
    else if(windowWidth < 1200) {
      setCard(4);
    }
    else setCard(6)
    // Add event listener to update window width on resize
   
    // window.addEventListener('resize', updateWindowWidth);

    // // Cleanup the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener('resize', updateWindowWidth);
    // };
  }, [card]); 

  return (
    <>
    {loader?
    <div className='flex flex-col'>
      
    <AlbumRootSkeleton></AlbumRootSkeleton>
    <AlbumRootSkeleton></AlbumRootSkeleton>
    <AlbumRootSkeleton></AlbumRootSkeleton>
    </div>
    :<div>
 
  <div className='mt-5 flex flex-col gap-2'>
  <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
      {names[0]}
    </h1>
  {
      windowWidth<500 ?
      <Swiper
        slidesPerView={card}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Pagination]}
        className='w-full'
      >
        {albums.map((album, index) => (
          <SwiperSlide key={index}>
      <AlbumCard Image = {album.Image}  Title = {album.Name}  Songs = {album.Songs} />
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
        {albums.slice(0,15).map((album, index) => (
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
        slidesPerView={card}
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
        slidesPerView={card}
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
        {albums.slice(0).map((album, index) => (
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
