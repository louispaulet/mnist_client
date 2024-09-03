import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import Inference from '../components/Inference';

const Home = () => {
  const [prediction, setPrediction] = useState('?');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">MNIST Digit Recognition</h1>
      <Canvas setPrediction={setPrediction} />
      <Inference prediction={prediction} />
    </div>
  );
}

export default Home;
