import React, { useState } from 'react';
import { apiConnecter } from '../../services/apiconnecter';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useInView } from 'react-spring';
import { useNavigate } from 'react-router-dom';

function NewPlaylist() {
  const userdata = useSelector((state) => state.User.userdata);
  const [Name, setName] = useState('');
  const nevigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault();

    const formdata = new FormData();
    if(Name == "") {
      toast.error("Please enter a name");
      return;
    }
    formdata.append('Name', Name);
    formdata.append('id', userdata._id);
    formdata.append('privacy', isPublic);
    formdata.append('Image', thumbnail);
     console.log(formdata);
     const toastid = toast.loading("Creating..");
    try {
      // Make API request using your apiConnecter service
      const response = await apiConnecter("post",'Playlist/CreatePlaylist', formdata);
      // Handle the response as needed
      console.log(response.data);
      toast.dismiss(toastid);
      toast.success("Playlist created successfully");
      nevigate("/MyPlaylist");
      
    } catch (error) {
      // Handle errors
      toast.dismiss(toastid);
      toast.error("Playlist Could Not Create");
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="border rounded-md max-w-[800px] flex flex-col items-center justify-center mx-auto mt-8 p-8 bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Playlist</h2>
      <form onSubmit={(e) => e.preventDefault()}  className="space-y-4">
        <label className="block">
          <span>Name:</span>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 bg-[#121212] rounded w-full text-white"
          />
        </label>

        <label className="block">
          <span>Thumbnail:(Optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </label>

        <div className="flex justify-around items-center p-5">
          <label className="block">
            <input
              type="radio"
              name="privacy"
              checked={isPublic}
              onChange={() => setIsPublic(true)}
              className="mr-2"
              required
            />
            <span>Set As Public</span>
          </label>

          <label className="block">
            <input
              type="radio"
              name="privacy"
              checked={!isPublic}
              onChange={() => setIsPublic(false)}
              className="mr-2"
              required
            />
            <span>Set As Private</span>
          </label>
        </div>

        <button
         onClick={handleSubmit}
          className="bg-blue-500 flex items-center justify-center text-white w-full mx-auto p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default NewPlaylist;
