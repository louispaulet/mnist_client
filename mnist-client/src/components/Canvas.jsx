import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Canvas = ({ setPrediction }) => {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    // Load the model when the component mounts
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(recognizeDigit, 500)); // Delay inference
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const recognizeDigit = async () => {
    if (!model) return;

    const canvas = canvasRef.current;
    const imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const imgTensor = tf.browser.fromPixels(imgData, 1)
      .resizeNearestNeighbor([28, 28])
      .mean(2)
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims(0)
      .expandDims(-1);

    const prediction = model.predict(imgTensor);
    const predictedValue = prediction.argMax(1).dataSync()[0];

    console.log('Predicted Value:', predictedValue);
    setPrediction(predictedValue);  // Update the prediction state
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction('?');  // Reset the prediction when clearing the canvas
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        width={280}
        height={280}
        className="border border-gray-400 mb-4"
      />
      <button
        onClick={clearCanvas}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Clear
      </button>
    </div>
  );
};

export default Canvas;
