import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import logo from '../components/assets/Screenshot_2024-01-12_012146-removebg-preview.png';
import { setMenu } from '../slices/Navbar'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setquery } from '../slices/UserDataSlice';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { setsearch } from '../slices/UserDataSlice';
import { setToken, setuserdata } from '../slices/UserDataSlice';

const Navbar = () => {
    const [animate ,setAnimate] = useState(false);
    const query = useSelector((state) => state.User.query);
    const search = useSelector((state) => state.User.search);
    const token = useSelector((state) => state.User.token);
    const userdata = useSelector((state) => state.User.userdata);
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.Navbar.menu);
    console.log(token, "this is token");
    console.log(userdata, "this is userdata");
    const [windowWidth, setwindowWidth] = useState(0);
    const nevigate = useNavigate();
    function SubmitHandeler(event) {
        event.preventDefault();
        console.log(query, "this is query");
        // nevigate("/SearchResult")
    }
    function logout() {
        dispatch(setToken(""));
        dispatch(setuserdata(""));
        toast.success("logout successfully")
        nevigate("/");
    }
    useEffect(() => {
        if (query) {
            nevigate("/SearchResult")
            dispatch(setsearch(!search));
        }
        console.log(query);
      
        setwindowWidth(window.innerWidth);
    }, [window.innerWidth, query, token,animate])


    return (
        <div className=' flex justify-between flex-col items-center  p-2 text-white bg-black fixed top-0 z-50  overflow-x-hidden w-full'>

           
                   
            <div className='flex  items-center justify-between w-full  self-baseline'>
                <div className='flex items-center justify-center text-white'>
                    {
                        windowWidth < 800 &&
                <div className='w-full max-w-[50px] flex  text-white  mr-2  lg:hidden'>
                       <button className={`hamburger   text-white hamburger--slider ${menu?"":"is-active"}`} type="button" onClick={() => dispatch(setMenu(!menu))}>
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </button>
                   
                </div>
                    }
                <div className='w-full max-w-[135px] overflow-hidden'>
                  <Link to="/">
                  <img src={logo} className={`rounded-md  w-full h-full   duration-[3s] transition-all  mix-blend-lighten  bg-black animate-pulse }`}></img>
                  </Link>
                   </div>
                </div>

                {
                    windowWidth > 800 && <form className=' w-full  max-w-[500px] ' onSubmit={(e) => SubmitHandeler(e)}>
                        <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-black">Search</label>
                        <div class="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input onChange={(e) => dispatch(setquery(e.target.value))} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Music,Artist.." required />
                            {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </form>

                }
                {
                    token ? <div className='flex items-center justify-center p-2  -mb-1  max-w-[400px] gap-3'>



                      <Link to={"/UserDetails"}>
                      {
                            userdata.Image 
                                ? <img src={userdata.Image} className=' h-[40px] w-[40px] rounded-full' />
                                :
                                <FaUserCircle className='h-5 w-5 text-[#61dafb]' style={{ height: '30px', width: '30px', }} />
                        }
                      </Link>
                    </div> : <div className='flex items-center justify-center p-2  max-w-[400px] gap-3'>

                        <Link to="/Login">
                            <button className=" max-w-[400px] p-2 border border-white rounded-md flex items-center justify-center hover:scale-95 transition-all duration-200 text-sm min-w-[60px]">Log in</button>
                        </Link>
                        <Link to="/Signup">
                            <button className=" max-w-[400px] p-2 border border-white rounded-md flex items-center justify-center hover:scale-95 transition-all duration-200 text-sm min-w-[60px]">SignUp</button>
                        </Link>

                        <FaUserCircle className='h-5 w-5 text-[#61dafb]' style={{ height: '30px', width: '30px', }} />
                    </div>
                }
            </div>

            {
                windowWidth < 800 && <form className=' w-full   ' onSubmit={(e) => SubmitHandeler(e)}>
                    <label for="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-black">Search</label>
                    <div class="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => dispatch(setquery(e.target.value))} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Music,Artist.." required />
                        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                    </div>
                </form>
            }

        </div>
    )
}

export default Navbar
