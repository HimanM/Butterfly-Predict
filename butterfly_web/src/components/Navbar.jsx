import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-800 hover:text-indigo-600 font-semibold text-lg px-3 py-2 rounded-md transition-colors duration-300"
          >
            Predict
          </Link>
          <Link
            to="/documentation"
            className="text-gray-800 hover:text-indigo-600 font-semibold text-lg px-3 py-2 rounded-md transition-colors duration-300"
          >
            Docs
          </Link>
        </div>
        <a
          href="https://github.com/HimanM/Butterfly-Predict.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-indigo-600 transition-colors duration-300"
          aria-label="GitHub Repository"
        >
          <FaGithub size={32} className="hover:opacity-80 transition-opacity duration-300" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
