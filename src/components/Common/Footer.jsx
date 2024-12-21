import React from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2 } from 'react-icons/im';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

// import './Footer.css'; // Import your custom CSS file

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-8 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
        <div className="max-w-[200px] text-center md:mr-8 md:mb-0 mb-8">
          <h3 className="text-2xl font-semibold text-gray-200">About Us</h3>
          <p className="mt-4 text-gray-400">
            Serving anywhere around the globe, ensuring accessibility, reliability, and increased voter engagement.
          </p>
        </div>

        <div className="text-center md:mr-8 md:mb-0 mb-8">
          <h3 className="text-2xl font-semibold text-gray-200">Contact Us</h3>
          <ul className="mt-4">
            <li className="flex items-center text-gray-400 mb-2">
              <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
              1234 Main Street, Dewas, India
            </li>
            <li className="flex items-center text-gray-400 mb-2">
              <i className="fa fa-phone mr-2" aria-hidden="true"></i>
              +1 (123) 456-7890
            </li>
            <li className="flex items-center text-gray-400">
              <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
              info@eBallot.com
            </li>
          </ul>
        </div>

        <div className="text-center flex items-center justify-center flex-col ">
          <h3 className="text-2xl font-semibold text-gray-200">Follow Us</h3>
          <div className="mt-4">
            <Link to="#" className="text-blue-600 hover:text-blue-800 mr-4">
              <ImFacebook2 />
            </Link>
            <Link to="#" className="text-pink-400 hover:text-pink-500 mr-4">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-green-400 hover:text-green-500 mr-4">
              <FaWhatsapp />
            </Link>
            {/* Add more social media icons here */}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2023 eBallot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
