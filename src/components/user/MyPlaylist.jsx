import React, { useEffect, useState } from 'react'
import { apiConnecter } from '../../services/apiconnecter';
import { useSelector } from 'react-redux';
import player from '../../slices/player';
import AlbumCard from '../Common/AlbumCard';

const MyPlaylist = () => {
    const [Playlist,setPlaylist] = useState([]);
    const [loader,setLoader] = useState(false);
    const userdata = useSelector((state) => state.User.userdata);
    const fetchPlaylist = async()  => {

        try{
            setLoader(true);
            const res = await apiConnecter("post","Playlist/getPlaylists",{id:userdata._id});
            console.log(res);
            setPlaylist(res.data.playlists);
            setLoader(false);
        }
        catch(err){
            console.error(err);
        }
    } 
    useEffect(()=> {
        fetchPlaylist();
    },[])
  return (
    <div className='flex flex-col items-center  text-white '>
     <h1>MyPlaylist</h1>
     <div className='flex flex-wrap p-2 items-center mx-auto justify-center'>
     {
        loader ?<div className='text-white'>loading...</div>: Playlist&&Playlist.map((playlist) => (
            <div className=' m-2 '> 
                
          <AlbumCard Title = {playlist.Name}  Image={playlist.Image} Songs = {playlist.Songs} border= {true}/>
            </div>
        ))
     }
     </div>
      
    </div>
  )
}

export default MyPlaylist
