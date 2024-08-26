// app/components/ImageGallery.tsx
"use client";

import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6 pt-1">
      {images.map((image) => (
        <img
          key={image}
          src={image}
          alt={image}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  );
};

export default ImageGallery;