import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
const FilterArtist = ({artist,setSelectedArtist,selectedArtist}) => {
    const [select,setSelect] = useState(false);
    const clickHandler = () =>{
        setSelect(!select);
        if(!select){
            setSelectedArtist((prev) => [...prev,artist.Name]);
        }
        else{
            setSelectedArtist((prev) => prev.filter((Name) => Name !== artist.Name ) );
        }
    }
    useEffect(()=> {
     setSelect(() => selectedArtist.includes(artist.Name));
    },[])
  return (
    
      <div key={artist._id} className={` flex flex-col gap-2 group relative p-2    items-center justify-center   rounded-md  hover:scale-105 transition-all duration-200 shadow-md   `} onClick={clickHandler}>
            <div className={`mx-auto   flex items-center justify-center gap-1 text-center  text-white text-xs p-3 lg:text-lg lg:p-3 border w-full   rounded-full ${select && "bg-green-500 font-bold"}`}>{artist.Name}
            <span >
            {
                select && <ImCancelCircle style={{color:"red"}}/>
            }
            </span>
            </div>
        </div>

  )
}

export default FilterArtist
