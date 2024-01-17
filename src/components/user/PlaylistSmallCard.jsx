import React, { useState } from 'react'

const PlaylistSmallCard = ({playlist,setSelectedPlaylist}) => {
    const [check ,setcheck] = useState(false);
    const changeHandler = () =>{
        setcheck(!check);
        // (e) => {//console.log(e.target.value);
        if(!check){
            //push id 
        setSelectedPlaylist((prev) => [...prev,playlist._id])
        }
        else {
              setSelectedPlaylist((prev) => prev.filter((id) => id !== playlist._id));
        }
    }
  return (
    <div>
          <div className='flex items-center  justify-between w-full p-4'>
           <div className='flex gap-2'>
           <img src={playlist.Image} alt='img' className='h-[30px] w-[40px]'/>
            <div> {playlist.Name}</div>
           </div>
            <input type='checkbox' onChange={changeHandler} />
          </div>
    </div>
  )
}

export default PlaylistSmallCard
