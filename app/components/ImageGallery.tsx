// app/components/ImageGallery.tsx
"use client";

import React, { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const closeLightbox = () => setSelectedImageIndex(null);
  const nextImage = () =>
    setSelectedImageIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  const prevImage = () =>
    setSelectedImageIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 sm:px-6 pb-6 pt-3">
      {images.map((image, index) => (
        <div
          key={image}
          className="w-full h-auto rounded-lg transition-transform duration-300 hover-scale-101 cursor-pointer bg-neutral-800 animate-pulse"
          onClick={() => setSelectedImageIndex(index)}
        >
          <img
            src={image}
            alt={image}
            className="w-full h-auto rounded-lg opacity-0"
            onLoad={(e) => {
              e.currentTarget.classList.remove('opacity-0');
              e.currentTarget.parentElement?.classList.remove('bg-neutral-800', 'animate-pulse');
            }}
          />
        </div>
      ))}

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
          onClick={closeLightbox}
        >
          {/* <button
            className="hidden sm:flex absolute top-8 right-16 sm:top-16 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button> */}
          <button
            className="hidden sm:flex absolute left-16 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="hidden sm:flex absolute right-16 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaChevronRight />
          </button>
          <button
            className="absolute items-center bottom-52 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
          <div className="max-w-7xl max-h-screen overflow-hidden flex items-center justify-center">
            <img
              src={images[selectedImageIndex]}
              alt={images[selectedImageIndex]}
              className="object-contain p-4 max-w-full max-h-screen opacity-0 scale-95"
              style={{ animation: "fadeInAndScale 0.3s ease-out forwards" }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInAndScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
