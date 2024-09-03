import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">About This App</h1>
        <p className="text-lg mb-4">
          The MNIST Digit Recognition App is a web-based tool designed to recognize handwritten digits using a neural network model trained on the MNIST dataset. The app allows users to draw a digit on a virtual canvas, and the machine learning model predicts the digit in real-time.
        </p>
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <p className="text-lg mb-4">
          The application leverages TensorFlow.js to perform inference directly in the browser. When you draw a digit on the canvas, the app processes the image to fit the input requirements of the pre-trained model, which then outputs the predicted digit.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Technology Stack</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li><strong>React:</strong> For building the user interface.</li>
          <li><strong>Vite:</strong> For fast development and bundling.</li>
          <li><strong>TailwindCSS:</strong> For styling the app with utility-first CSS.</li>
          <li><strong>TensorFlow.js:</strong> For running the machine learning model in the browser.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Why This App?</h2>
        <p className="text-lg">
          This app serves as a simple and interactive way to demonstrate the power of neural networks in image recognition. It also provides a hands-on experience with how machine learning models can be integrated into web applications.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
