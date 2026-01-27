"use client";

import { useState, useEffect } from "react";

export default function ProductImageGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0].url); // first image is default
    }
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="w-20 flex flex-col gap-2">
        {images.map((img) => (
          <div
            key={img.public_id}
            onMouseEnter={() => setActiveImage(img.url)}
            className="border rounded p-1 cursor-pointer hover:border-black"
          >
            <img
              src={img.url}
              alt="Thumbnail"
              className="object-contain w-full h-20"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border rounded-lg p-4 h-[420px] flex items-center justify-center overflow-hidden">
        {activeImage && (
          <img
            src={activeImage}
            alt="Product"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
