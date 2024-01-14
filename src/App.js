import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LeftSideBar from './components/LeftSideBar';
import { Route, Router, Routes } from 'react-router-dom';
// import slider from './components/slider';
import Home from './components/Common/Home';
import AlbumSlider from './components/AlbumSlider';
// import PlayTrack from './components/PlayTrack';
import AlbumRoot from './components/Common/AlbumRoot';
import AlbumSongList from './components/Common/AlbumSongList';
import Album from './slices/album';
import Artists from './components/Artists';
import Footer from './components/Common/Footer';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import SearchResult from './components/Common/SearchResult';
import AddAlbum from './components/Auth/AddAlbum';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import VerifyOtp from './components/Auth/VerifyOtp';
import UserDetails from './components/user/UserDetails';
import EditUserDetailsForm from './components/user/EditUserDetailsForm';
import Favoritesongs from './components/user/Favoritesongs';
import RandomAudioPlayer from './components/AudioPlayer/RandomAudioPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setNextIndex } from './slices/album';
import { useRef } from 'react';
import MiniPlayer from './components/AudioPlayer/MiniPlayer';
import { setMenu } from './slices/Navbar';
function App() {
  
  

  const audioRef = useRef();
  const progressBarRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const title = useSelector((state) => state.Player.name);
  const menu = useSelector((state) => state.Navbar.menu);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const [duration,setDuration] =useState(0);
  const dispatch = useDispatch();
  
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update window width on resize
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [duration]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className='flex flex-col w-screen    bg-transparent mx-auto items-center justify-center   '
     onClick={() => {
      if(!menu){
        dispatch(setMenu(!menu));  
      }
    }}
    >
        <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={()=> dispatch(setNextIndex(1))}
      />
    <Navbar></Navbar>
    <div className='flex w-full relative ml-1 mt-[108px] md:mt-20 lg:mt-20  '>
      <LeftSideBar/>
    
    <div className={`rounded-md scroll-smooth overflow-y-hidden overflow-x-hidden z-10 w-full    ${windowWidth >= 800 ?" ml-[250px]":"" } `}
    onClick={() => {
      if(!menu){
        dispatch(setMenu(!menu));  
      }
    }}
    >
   
       <Routes>
       <Route path='*' element = {<Home></Home>}></Route>
       <Route path='/Artist' element = {<Artists></Artists>}></Route>
       <Route path='/AlbumSongs' element = {<AlbumSongList></AlbumSongList>}></Route>
       <Route path='/SearchResult' element = {<SearchResult></SearchResult>}></Route>
       <Route path='/AddAlbum' element = {<AddAlbum></AddAlbum>}></Route>
       <Route path='/Login' element = {<Login></Login>}></Route>
       <Route path='/Signup' element = {<Signup></Signup>}></Route>
       <Route path='/VerifyOTP' element = {<VerifyOtp></VerifyOtp>}></Route>
       <Route path='/UserDetails' element = {<UserDetails></UserDetails>}></Route>
       <Route path='/FavoriteSongs' element = {<Favoritesongs></Favoritesongs>}></Route>
       <Route path='/mixSongs' element = {<RandomAudioPlayer></RandomAudioPlayer>}></Route>
       {/* <Route path='/miniPlayer' element = {
       <MiniPlayer {...{audioRef,progressBarRef,duration,setDuration}}></MiniPlayer>
       }></Route> */}

       <Route path='/UserDetails/edit' element = {<EditUserDetailsForm></EditUserDetailsForm>}></Route>
       </Routes>
{/* <Footer/> */}
      </div>
    </div>
    {/* <PlayTrack></PlayTrack> */}
    {/* <div className='absolute z-50 top-0 border border-red-600  w-full '>
     
    </div>   */}
    
    <AudioPlayer {...{audioRef,progressBarRef,duration,setDuration,isPlaying,setIsPlaying}}></AudioPlayer>
  {
      <MiniPlayer {...{audioRef,duration,setDuration,setIsPlaying,isPlaying}}></MiniPlayer>
  }
    </div>
  );
}

export default App;
