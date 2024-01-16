import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa6';
import { PiWaveformFill } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from 'react';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaChevronDown } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { BiSolidSkipNextCircle } from 'react-icons/bi';
import { IoPlaySkipBackCircleSharp } from 'react-icons/io5';
import {
  setName,
  setSinger,
  setSongUrl,
  setImg,
  settrackId
} from '../../slices/player';
import toast from 'react-hot-toast';
import { apiConnecter } from '../../services/apiconnecter';
import Sheet from 'react-modal-sheet';
import { useInView } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import { setIsPlaying } from '../../slices/Control';
import PlaylistSmallCard from '../user/PlaylistSmallCard';
const SongList = ({song,index}) => {
    
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [Playlist,setPlaylist] = useState([]);
    const [loader,setLoader] = useState(false);
   
    const audioRef = useRef();
    const albumName = useSelector((state) => state.Album.Albumname);
    const albumimg = useSelector((state) => state.Album.Albumimg);
    const Songs = useSelector((state) => state.Album.Songs);
    const name = useSelector((state) => state.Player.name);
    const trackId = useSelector((state) => state.Player.trackId);
    const [duration ,setDuration] = useState(null);
     const [play , setPlay] = useState(false);
     const [fav, setFav] = useState(null);
     const  [selectedPlaylist,setSelectedPlaylist] = useState([]);
     
  const [isOpen, setOpen] = useState(false);
  const [isOpen2, setOpen2] = useState(false);

  
     const userdata = useSelector((state) => state.User.userdata);
    
    //  console.log(name, song.Name);
    

     const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };

    async function favHandler(){

      const dataform = {
        SongId :song._id,
        UserId:userdata._id
      }
       
      if(!fav){
        const res = await apiConnecter("POST","Album/AddFavorite",dataform);
        console.log(res);
        setFav(!fav);
        toast.success('Song Added to Favorite')
      }
      else{
        toast.success('Song remove From Favorite')
        const res = await apiConnecter("POST","Album/RemoveFavorite",dataform);
        console.log(res);
        setFav(!fav);
      }
    }

    console.log(selectedPlaylist,"slected playlist");
    async function checkFavorite(){
      const dataform = {
        SongId :song._id,
        UserId:userdata._id
      }
       try{
        const res = await apiConnecter("POST","Album/checkFavorite",dataform);
        console.log(res.data.check);
        setFav(res.data.check);
       }
       catch(err){
          console.log(err);
       }
    }
    console.log(song);
    const onLoadedMetadata = () => {
      const seconds = audioRef.current.duration;
      setDuration(formatTime(seconds));
      // setDuration(seconds);
      // progressBarRef.current.max = seconds;
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const fetchPlaylist = async()  => {

    try{
        setLoader(true);
        const res = await apiConnecter("post","Playlist/getPlaylists",{id:userdata._id});
        console.log(res);
        setPlaylist(res.data.playlists);
        setLoader(false);
        setOpen2(false);
    }
    catch(err){
        console.error(err);
    }
} 

const addTrackToPlaylist = async() => {
   
    const data = {
      playlistId : selectedPlaylist,
      trackId : song._id,
      id: userdata._id
    }
    const toastid = toast.loading("Adding......");
    try{
      const res = await apiConnecter("post","Playlist/addTracksToPlaylist",data);
      console.log(res);
      toast.dismiss(toastid);
      toast.success("Track Added Succesfully");

    }
    catch(err){
      toast.error("Try Again Leter");
      toast.dismiss(toastid);
          console.error(err);
    }
  
}



  useEffect(() => {
    fetchPlaylist();
    // Add event listener to update window width on resize
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [name,setName]); // Empty dependency array ensures the effect runs only once on mount


 
     
  return (
    <div
    
    key={index}
    className={`hover:bg-[#121212] transition-all duration-600 hover:animate-pulse flex flex-row items-center justify-between mb-1  rounded-md mx-auto p-3  ${song._id == trackId ?"text-sky-400 shining-text animate-pulse opacity-100":"text-white opacity-80"}`}
  >
    <div className=" font-semibold  text-md lg:w-[25%] flex items-center gap-2 mb-2 lg:mb-0">
    <div >
    {song._id == trackId ?<PiWaveformFill/>:index+1?index+1:""}
    </div>
    <div className='max-w-[250px] flex items-center justify-center'
     onClick={() => {
      dispatch(setImg(song.Image));
      dispatch(setSongUrl(song.Url));
      dispatch(setName(song.Name));
      dispatch(setSinger(song.Artists[0]));
      dispatch(settrackId(song._id));
      setPlay(true);
      dispatch(setIsPlaying(true));
    }}>
      <img src={song.Image} className='w-[30px] h-[30px] mr-1' />
      {song.Name}
    </div>

    </div>
    <Link to={`/Artist/${song.Artists[0]}`} className=" font-semibold  hidden lg:block lg:w-[28%] mb-2 lg:mb-0">
   
      {song.Artists[0]}
    </Link>
    <div className=" font-semibold  mr-3 hidden  lg:block lg:w-[28%] mb-2 lg:mb-0 " onClick={() => favHandler()}>
    {fav ? (
              <FaHeart style={{ color: 'pink', height: 20, width: 20 }} />
            ) : (
              <FaRegHeart style={{ color: 'pink', height: 20, width: 20 }} />
            )}
    </div>
   {
    windowWidth < 800 && 
    <div onClick={()=> setOpen(true)}>
      <BsThreeDotsVertical style={{height:25,width:30}}/>
    </div>
   }
    <a
      href={song.Url}
      className=" font-semibold  lg:w-[25%] mb-2   hidden lg:block md:block"
      download="w3logo"
    >
      <FaDownload />
    </a>
    <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[500,  0]}
        initialSnap={0}
        onSnap={snapIndex =>
          console.log('> Current snap point index:', snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Content>
          <div className="bg-[#121212] flex flex-col  text-white py-4 rounded-lg shadow-md">
          <div className='mx-auto '>
          <FaChevronDown style={{height:20,width:20}}/>
          </div>
      <div className="flex items-center mx-2 p-2  ">
        <img src={song && song.Image} alt="song img" className=" w-full h-full max-h-[60px] max-w-[60px]  rounded-lg " />
        <div className="text-white ml-3">
          <p className="text-sm font-bold  lg:w-full overflow-hidden">{song.Name}</p>
          <p className="text-xs opacity-80">{song.Artists[0]}</p>
        </div>
      </div>
      <div className='h-[1px] bg-gray-300 w-full '></div>
      
      <div className="text-white mx-4 flex flex-col gap-7  font-semibold mt-4 cursor-pointer">
        <div className="flex items-center"
         onClick={()=>{
          dispatch(setImg(song.Image));
          dispatch(setSongUrl(song.Url));
          dispatch(setName(song.Name));
          dispatch(setSinger(song.Artists[0]));
          dispatch(settrackId(song._id));
          setPlay(true);
          dispatch(setIsPlaying(true));
        }}
        >
        <FaPlay style={{height:20,width:20,color:"white"}} className="mr-2" /> Play Now</div>
        <div className="flex items-center" 
         onClick={()=> favHandler()}
        > <FaRegHeart style={{height:20,width:20,color:"skyblue"}} className="mr-2" /> Save To Library</div>
        <div className="flex items-center"><LuShare style={{height:20,width:20}} className="mr-2" /> Share</div>
        <div className="flex items-center"
         onClick={() => {
            setOpen(false);
            setOpen2(true);
          }}
        > <MdFormatListBulletedAdd style={{height:20,width:20}} className="mr-2" /> Add To Playlist</div>
        <div className="flex items-center"><BsMusicNoteList style={{height:20,width:20}} className="mr-2" /> Song Details</div>
        <div className="flex items-center"
        onClick={()=>{
          nevigate(`/Artist/${song.Artists[0]}`)
        }}
        ><BsThreeDotsVertical style={{height:20,width:20}} className="mr-2" /> More From {song.Artists[0]}</div>
      </div>
      <div className='h-[1px] mt-8 bg-gray-300 w-full '></div>
      <div className=" mx-2 mt-2 text-center  p-2 shadow-sm w-full cursor-pointer " onClick={()=> setOpen(false)}>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
      </div>
    </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    <Sheet
        isOpen={isOpen2}
        onClose={() => setOpen2(false)}
        snapPoints={[500,  0]}
        initialSnap={0}
        onSnap={snapIndex =>
          console.log('> Current snap point index:', snapIndex)
        }
      >
        <Sheet.Container>
          <Sheet.Content>
          <div className="bg-[#121212] flex flex-col h-full text-white py-4 rounded-lg shadow-md">
          <div className='mx-auto '>
          <FaChevronDown style={{height:20,width:20}}/>
          </div>
      <div className="flex items-center mx-2 p-2  ">
        <img src={song && song.Image} alt="song img" className=" w-full h-full max-h-[60px] max-w-[60px]  rounded-lg " />
        <div className="text-white ml-3">
          <p className="text-sm font-bold  lg:w-full overflow-hidden">{song.Name}</p>
          <p className="text-xs opacity-80" 

          >{song.Artists[0]}</p>
        </div>
      </div>
      <div className='h-[1px] bg-gray-300 w-full '></div>
      {
        Playlist && Playlist.slice(0,5).map((playlist,index) =>(
          <PlaylistSmallCard playlist={playlist} setSelectedPlaylist = {setSelectedPlaylist}/>
        ) )
      }
      <div className='h-[1px] mt-3 bg-gray-300 w-full '></div>
      <div className=" mx-2 mt-2 text-center  p-2 shadow-sm w-full cursor-pointer " onClick={()=> {addTrackToPlaylist()}}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
      </div>
    </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
  </div>
  )
}

export default SongList
