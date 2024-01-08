import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LeftSideBar from './components/LeftSideBar';
import { Route, Router, Routes } from 'react-router-dom';
// import slider from './components/slider';
import Home from './components/Common/Home';
import AlbumSlider from './components/AlbumSlider';
import PlayTrack from './components/PlayTrack';
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

function App() {
  return (
    <div className='flex flex-col w-screen  bg-transparent mx-auto items-center justify-center '>
    <Navbar></Navbar>
    <div className='flex w-full relative ml-1 mt-[108px] md:mt-20 lg:mt-20  '>
      <LeftSideBar/>
    
    <div className='rounded-md w-[100%]  overflow-x-hidden z-10 relative  mb-20  md:ml-[250px] lg:ml-[230px]  '>
   
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

       <Route path='/UserDetails/edit' element = {<EditUserDetailsForm></EditUserDetailsForm>}></Route>
       </Routes>
{/* <Footer/> */}
      </div>
    </div>
    {/* <PlayTrack></PlayTrack> */}
    <AudioPlayer></AudioPlayer>
    </div>
  );
}

export default App;
