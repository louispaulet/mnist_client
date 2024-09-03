import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MNIST Digit Recognition App</Link>
        <Link to="/about" className="text-lg font-semibold hover:underline">About</Link>
      </div>
    </header>
  );
};

export default Header;
