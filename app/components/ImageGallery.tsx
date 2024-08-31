// app/components/ImageGallery.tsx
"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

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
          <div className="absolute px-12 top-60 sm:top-40 md-top-30 lg:top-20 text-white text-lg font-bold text-center w-full">
            {/* Extract and display the text content from the image name */}
            {images[selectedImageIndex].split('/').pop()?.split('-').slice(2, 3).join('').replace(/\[|\]|\.webp/g, '') + '@' + images[selectedImageIndex].split('/').pop()?.split('-').slice(0, 1).join('').replace(/\[|\]|\.webp/g, '')}
          </div>
          <button
            className="hidden sm:flex absolute left-1 sm:left-4 md:left-8 lg:left-12 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <FaChevronLeft />
          </button>
          <button
            className="hidden sm:flex absolute right-1 sm:right-4 md:right-8 lg:right-12 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <FaChevronRight />
          </button>
          <div className="w-11/12 sm:w-4/5 max-w-full max-h-full overflow-hidden flex items-center justify-center">
            <img
              src={images[selectedImageIndex]}
              alt={images[selectedImageIndex]}
              className="object-contain px-4 py-40 max-w-full max-h-screen opacity-0 scale-95"
              style={{ animation: "fadeInAndScale 0.3s ease-out forwards" }}
            />
          </div>
          <button
            className="absolute items-center bottom-1/4 sm:bottom-1/4 md:bottom-20 lg:bottom-10 text-white text-lg bg-white/20 hover:bg-white/30 rounded-full p-5 transition-colors duration-300"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
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
