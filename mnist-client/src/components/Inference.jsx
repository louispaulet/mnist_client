import React from 'react';

const Inference = ({ prediction }) => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl">Recognized Number:</h2>
      <p className="text-3xl font-bold">{prediction}</p>
    </div>
  );
};

export default Inference;
