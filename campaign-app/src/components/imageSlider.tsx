import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { useAuth } from "../context/AuthProvider";

interface ImageSliderProps {}

const ImageSlider: React.FC<ImageSliderProps> = () => {
  const { openModal, handleCloseModal, images } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image every 3 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       goToNext();
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }, [currentIndex]);

  const goToPrevious = () => {
    images &&
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
  };

  const goToNext = () => {
    images &&
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
  };

  return (
    <Modal isOpen={openModal} handleClose={handleCloseModal}>
      <div className="relative w-full max-w-3xl mx-auto">
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ❮
        </button>
        {images && images?.length > 0 ? (
          <img
            src={images?.[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="min-h-96 flex justify-center items-center text-center">
            <span>No Image found</span>
          </div>
        )}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ❯
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images?.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ImageSlider;
