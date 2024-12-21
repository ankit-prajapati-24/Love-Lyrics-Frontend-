import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongUrl, setName, settrackId, setSinger, setImg } from '../../slices/player';
import { setIsPlaying } from '../../slices/Control';
import { FaPlay, FaPause } from 'react-icons/fa';

const ReleaseCard = ({ song = [] }) => {
  // Ensure `song` is always an array, even if undefined
  const tracks = song.slice(0, 3); // Safely slice to avoid accessing undefined indices

  // Redux state
  const trackId = useSelector((state) => state.Player.trackId);
  const isPlaying = useSelector((state) => state.Controls.isPlaying);
  const dispatch = useDispatch();

  const handleSongClick = (track) => {
    dispatch(setImg(track.Image));
    dispatch(setSongUrl(track.Url));
    dispatch(setName(track.Name));
    dispatch(setSinger(track.Artists[0]));
    dispatch(settrackId(track.id || track._id));
    dispatch(setIsPlaying(trackId === track.id || track._id ? !isPlaying : true));
  };

  // Return a fallback UI if `tracks` is empty
  if (tracks.length === 0) {
    return (
      <div className="bg-black p-6 rounded-lg w-full max-w-[20rem] text-gray-400 text-center">
        No songs available
      </div>
    );
  }

  return (
    <div className="bg-black p-3 rounded-lg w-full max-w-[20rem] ">
      {tracks.map((track, index) => (
        <div
          key={track._id || index} // Use a unique identifier if available, fallback to index
          className="group flex items-center  mb-6 last:mb-0 text-white hover:bg-gray-700 hover:rounded-md p-2 relative transition-all duration-300 ease-in-out truncate  "
          onClick={() => handleSongClick(track)}
        >
          <img
            src={track.Image || '/default-image.png'} // Provide a default image if track.image is undefined
            alt={track.Name || 'Unknown Title'}
            className="w-10 h-10 lg:w-16 lg:h-16 md:w-16 md:h-16 rounded-md mr-4"
          />
          <div className="flex-1 flex-wrap">
            <h4 className="font-bold text-sm md:text-md lg:text-md ">{track.Name || 'Unknown Title'}</h4>
            <p className="  text-xs md:text-sm mt-1 lg:text-sm text-gray-400 truncate">{track.Artists[0] || 'Unknown Artist'}</p>
          </div>
          {/* Play/Pause Button, hidden by default, shows on hover */}
          {/* <button className="absolute  right-3 p-2 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {trackId == track._id && isPlaying ? <FaPause /> : <FaPlay />}
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default ReleaseCard;
