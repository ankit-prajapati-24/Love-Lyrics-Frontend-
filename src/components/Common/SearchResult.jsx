import React, { useEffect, useState } from 'react'
import { query } from '../../slices/UserDataSlice'
import { useSelector } from 'react-redux'
import { apiConnecter } from '../../services/apiconnecter';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SongList from './SongList';
import SkeletonLoading from './SkeletonLoading';

const SearchResult = () => {
    const query = useSelector((state)=> state.User.query);
    const [loader,setLoader] = useState(false);
    const search =  useSelector((state)=> state.User.search);
     const formdata = new FormData();
     formdata.append("Name", query);
     const [result,setResult] = useState([]);
      async function searchQuery(){
        try{
            setLoader(true);
            const res = await apiConnecter("POST","tracks/getTrack",formdata);
            console.log(res,"this is result");
            const songlist = res.data.tracks;
            const Songs = songlist.filter((song, index, self) =>
              index === self.findIndex((s) => s.Name === song.Name)
            );
            setResult(Songs);
            setLoader(false);
        }
        catch(e){
            console.log(e);
        }
      }
      useEffect(() => {
        searchQuery();
      }, [search])
      
  return (
    <div className='h-screen w-full bg-black'>
      {
        loader?  <div className='flex flex-wrap items-center justify-center'>
      {[...Array(7)].map((_, index) => (
       <SkeletonLoading/>
          ))}
      </div>:<div className='text-white w-full h-[60%]'>
   {
    result.length > 0 &&   
    <div className='flex flex-row items-center justify-between  p-2  text-gray-300 border-b border-b-white   w-full'>
            <div className="font-bold text-lg w-full lg:w-[22%] mb-2 lg:mb-0">
              Title
            </div>
            <div className="font-bold text-lg lg:w-[20%] hidden lg:block mb-2 lg:mb-0">
              Album
            </div>
            <div className="font-bold text-lg lg:w-[25%] mb-2 lg:mb-0 hidden lg:block md:block">
             Favorite
            </div>
            <div className="font-bold text-lg lg:w-[25%] md:block">
              Download
            </div>
          </div>
   }
        {
            result.length == 0 ?<div className=' shining-text text-lg font-bold text-white w-full h-full  flex items-center justify-center'>
                No result found 😓
            </div> :result.map((song)=>(
                <SongList song={song}/>
            ))
        }
      </div>
      }
    </div>
  )
}

export default SearchResult
