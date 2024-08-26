// app/components/ImageGallery.tsx
"use client";

import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <img
          key={image}
          src={image}
          alt={image}
          className="w-full h-auto rounded shadow"
        />
      ))}
    </div>
  );
};

export default ImageGallery;