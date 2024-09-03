import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Canvas = ({ setPrediction }) => {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [animationFrameId, setAnimationFrameId] = useState(null);

  useEffect(() => {
    // Load the model when the component mounts
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Add touch event listeners with { passive: false }
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', finishDrawing, { passive: false });

    return () => {
      // Clean up event listeners when the component is unmounted
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', finishDrawing);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDrawing, animationFrameId]);

  const getCanvasContext = () => {
    return canvasRef.current.getContext('2d', { willReadFrequently: true });
  };

  const getEventCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (event.touches) {
      const touch = event.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    } else {
      return {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };
    }
  };

  const startDrawing = (event) => {
    event.preventDefault();
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = getCanvasContext();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    event.preventDefault();
    const { offsetX, offsetY } = getEventCoordinates(event);
    const ctx = getCanvasContext();
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const finishDrawing = (event) => {
    event.preventDefault();
    const ctx = getCanvasContext();
    ctx.closePath();
    setIsDrawing(false);

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    setAnimationFrameId(requestAnimationFrame(recognizeDigit));
  };

  const recognizeDigit = async () => {
    if (!model) return;

    const canvas = canvasRef.current;
    const imgData = getCanvasContext().getImageData(0, 0, canvas.width, canvas.height);
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
    setPrediction(predictedValue);
  };

  const clearCanvas = () => {
    const ctx = getCanvasContext();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPrediction('?');
  };

  useEffect(() => {
    clearCanvas(); // Ensure the canvas is cleared and black before drawing starts
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
        onContextMenu={(e) => e.preventDefault()} // Prevent context menu on long press
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
