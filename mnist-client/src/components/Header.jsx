import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">MNIST Digit Recognition App</a>
        <a href="/about" className="text-lg font-semibold hover:underline">About</a>
      </div>
    </header>
  );
};

export default Header;
