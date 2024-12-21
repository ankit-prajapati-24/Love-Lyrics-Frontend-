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
import ArtistCard from './components/Common/ArtistCard';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';
import { setDuration,setIsPlaying } from './slices/Control';
import { TiMinus } from "react-icons/ti";
import NewPlaylist from './components/user/NewPlaylist';
import MyPlaylist from './components/user/MyPlaylist';
import GoPro from './components/user/GoPro';
function App() {
  
  
  const [isOpen, setOpen] = useState(false);
  const [isOpenMore, setOpenmore] = useState(false);
  
  const audioRef = useRef();
  const progressBarRef = useRef();
  
  const [timeProgress, setTimeProgress] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [duration,setDuration] =useState(0);

  // const timeProgress = useSelector((state) => state.Controls.timeProgress);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  const duration = useSelector((state) => state.Controls.duration);

  const title = useSelector((state) => state.Player.name);
  const menu = useSelector((state) => state.Navbar.menu);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const dispatch = useDispatch();
  
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    dispatch(setDuration(seconds))
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
    //console.log(timeProgress,"this is time progess      ");
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [src]); // Empty dependency array ensures the effect runs only once on mount


  const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
    color: black; /* Add black color here */
  }
  .react-modal-sheet-container {
    /* custom styles */
    color: black; /* Add black color here */
  }
  .react-modal-sheet-header {
    /* custom styles */
    color: black; /* Add black color here */
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
    color: black; /* Add black color here */
  }
  .react-modal-sheet-content {
    /* custom styles */
    color: black; /* Add black color here */
  }
`;


  return (
    <div className='flex flex-col w-screen    bg-transparent  items-center justify-center max-w-[1600px] mx-auto  '
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
       <Route path='/Artist/:ArtistId' element = {<ArtistCard ></ArtistCard>}></Route>
       <Route path='/FavoriteSongs' element = {<Favoritesongs setOpenmore = {setOpenmore}></Favoritesongs>}></Route>
       <Route path='/mixSongs' element = {<RandomAudioPlayer></RandomAudioPlayer>}></Route>
       <Route path='/NewPlaylist' element = {<NewPlaylist></NewPlaylist>}></Route>
       <Route path='/MyPlaylist' element = {<MyPlaylist></MyPlaylist>}></Route>
       <Route path='/GoPro' element = {<GoPro></GoPro>}></Route>
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
    
    <AudioPlayer {...{timeProgress,setOpen, setTimeProgress,audioRef,progressBarRef,duration,setDuration,isPlaying,setIsPlaying}}></AudioPlayer>
  {/* <Footer></Footer> */}
  
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header>
            <div className='bg-[#121212] flex items-center justify-center text-white w-full h-10'>
              <div className='h-1 w-[30px] rounded-full bg-white'></div>
            </div>
          </Sheet.Header>
          <Sheet.Content>{
            <MiniPlayer {...{timeProgress, setTimeProgress,audioRef,duration,setDuration,setIsPlaying,isPlaying}}></MiniPlayer>
            }</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Sheet isOpen={isOpenMore} onClose={() => setOpenmore(false)}>
        <Sheet.Container>
          <Sheet.Header>
            <div className='bg-[#121212] flex items-center justify-center text-white w-full h-10'>
              <div className='h-1 w-[30px] rounded-full bg-white'></div>
            </div>
          </Sheet.Header>
          <Sheet.Content></Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      
    </div>
  );
}

export default App;
