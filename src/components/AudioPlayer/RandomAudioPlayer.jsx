import React, { useEffect, useState } from 'react'
import { apiConnecter } from '../../services/apiconnecter'
import SongList from '../Common/SongList';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs } from '../../slices/album';
import { FaChevronDown } from "react-icons/fa";
import SkeletonLoading from '../Common/SkeletonLoading';
import Sheet from 'react-modal-sheet';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import { Button } from 'react-native-web';
import FilterArtist from '../Common/FilterArtist';

const RandomAudioPlayer = () => {
  const [loader, setLoader] = useState(false);
  const [tracks, seTracks] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [AllTracks ,setAlltracks] = useState([]);
  const title = useSelector((state) => state.Player.name);
  const author = useSelector((state) => state.Player.singer);
  const src = useSelector((state) => state.Player.songurl);
  const thumbnail = useSelector((state) => state.Player.img);
  const [selectedArtist,setSelectedArtist] = useState([]);

  const dispatch = useDispatch();

  async function getAllTrack() {
    try {
      setLoader(true);
      const res = await apiConnecter("post", "tracks/getAllTrack");

      // //console.log(res.data.tracks);
      seTracks(res.data.tracks);
      setAlltracks(res.data.tracks);
      const SongList = res.data.tracks;
      const shuffledList = [...SongList].sort(() => Math.random() - 0.5);
      seTracks(shuffledList);
      dispatch(setSongs(shuffledList));
      setLoader(false);
    }
    catch (err) {
      //console.error(err);
    }
  }
  const [artists, setArtists] = useState([]);
  async function getArtists() {
    try {
      // setLoader(true);
      const res = await apiConnecter('post', 'tracks/getArtists');
      //console.log(res);
      setArtists(res.data.data);
      // setLoader(false);
    } catch (err) {
      //console.error(err);
    }
  }
 console.log("selected artist",selectedArtist);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update window width on resize
    window.addEventListener('resize', updateWindowWidth);

    getAllTrack();
    getArtists();
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount


  return (
    <div
      className={` w-full h-screen backdrop-blur-3xl   justify-center  items-center mb-4 bg-cover bg-no-repeat relative overflow-x-hidden bg-[#838996]  `}
      style={{ backgroundImage: `url(${thumbnail})` }}
    >
      <div className="    backdrop-blur-3xl "
      >
        <div className='w-full p-2 text-white bg-black flex gap-2 items-center justify-center ' onClick={() => setOpen(true)}>
          <button className='p-2 bg-sky-500 text-white rounded-md font-bold w-full'>Filter The Songs</button>

        </div>

        <div className='flex p-2  text-gray-300 border-b border-b-white  bg-gradient-to-b from-black  w-screen'>
          <div className="font-bold text-lg w-full lg:w-[25%] mb-2 lg:mb-0">
            Title
          </div>
          <div className="font-bold text-lg lg:w-[23%] hidden lg:block mb-2 lg:mb-0">
            Album
          </div>
          <div className="font-bold hidden text-lg lg:w-[25%] mb-2 lg:mb-0  lg:block md:block">
            Favorite
          </div>
          {
            windowWidth < 800 &&
            <div className="font-bold  text-lg lg:w-[25%] mb-2 lg:mb-0  lg:block md:block">
              More
            </div>
          }
          <div className="font-bold text-lg hidden lg:w-[25%] md:block">
            Download
          </div>
        </div>


        {
          loader ? [...Array(7)].map((_, index) => (
            <SkeletonLoading />
          )) : <div className='w-screen  backdrop-blur-xl '>
            {tracks &&
              tracks.map((song, index) => (
                <SongList song={song} index={index} />
              ))}
          </div>
        }
        <Sheet
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          snapPoints={[600, 0]}
          initialSnap={0}
          onSnap={snapIndex =>
            console.log('> Current snap point index:', snapIndex)
          }
        >
          <Sheet.Container>
            <Sheet.Content>
              <div className="bg-[#121212] flex flex-col  text-white py-4 rounded-lg shadow-md h-full">
                <div className='mx-auto '>
                  <FaChevronDown style={{ height: 20, width: 20 }} />
                </div>

                <div className='h-[1px] mt-8 bg-gray-300 w-full  '></div>
                <div className=" mx-2 mt-2 text-center  p-2 shadow-sm w-full h-full  cursor-pointer flex flex-col justify-between items-center gap-14 " >
                  <div className='flex gap-1 flex-wrap'>
                    {
                      artists && artists.map((artist) => (
                        <FilterArtist artist={artist} setSelectedArtist={setSelectedArtist} selectedArtist = {selectedArtist}/>
                      ))
                    }
                  </div>
                  <button
  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-3"
  onClick={() => {
    if(selectedArtist.length == 0) return;
    console.log('Selected Artists:', selectedArtist);
    console.log('Original Tracks:', tracks);

    const filteredSongs = AllTracks.filter((track) => {
        console.log('Checking Track:', track);
        const isArtistIncluded = selectedArtist.includes(track.Artists[0]);
        console.log('Is Artist Included?', isArtistIncluded);
        return isArtistIncluded;
    });
    
    const shuffledList = [...filteredSongs].sort(() => Math.random() - 0.5);

    console.log('Filtered Songs:', filteredSongs);

    seTracks(shuffledList);
    dispatch(setSongs(shuffledList));
    setOpen(false);
}}

>
  Save
</button>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </div>
    </div>
  )
}

export default RandomAudioPlayer
