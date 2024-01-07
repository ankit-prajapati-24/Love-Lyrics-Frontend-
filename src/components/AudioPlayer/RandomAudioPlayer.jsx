import React, { useEffect, useState } from 'react'
import { apiConnecter } from '../../services/apiconnecter'
import SongList from '../Common/SongList';

const RandomAudioPlayer = () => {
    const [loader,setLoader] = useState(false);
    const [tracks,seTracks] = useState([]);
    async function getAllTrack(){
    try{
        setLoader(true);
        const res = await apiConnecter("post","tracks/getAllTrack");
        console.log(res.data.tracks);
        seTracks(res.data.tracks);
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
    <div>
     {
        loader?<div>loading...</div>:<div>
        {tracks &&
            tracks.map((song, index) => (
              <SongList song={song} index={index} />
            ))}
      </div> 
     }
    </div>
  )
}

export default RandomAudioPlayer
