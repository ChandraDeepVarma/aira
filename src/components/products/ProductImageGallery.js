"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

/**
 * Custom Image Zoom Component
 * Implements Amazon-style side-by-side zoom using Tailwind CSS.
 */
function ImageZoom({ src, alt }) {
  const [showZoom, setShowZoom] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const LENS_SIZE = 100; // Size of the square lens in px

  const imgWrapperRef = useRef(null);
  const imgRef = useRef(null);
  const resultRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    // Cursor position relative to image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Lens position calculations (centering lens on cursor)
    let lensX = x - LENS_SIZE / 2;
    let lensY = y - LENS_SIZE / 2;

    // Boundaries
    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > width - LENS_SIZE) lensX = width - LENS_SIZE;
    if (lensY > height - LENS_SIZE) lensY = height - LENS_SIZE;

    setCursorPos({ x: lensX, y: lensY });

    // Update Zoom Result Background
    if (resultRef.current && showZoom) {
      // Calculate ratios
      const resultRect = resultRef.current.getBoundingClientRect();
      const cx = resultRect.width / LENS_SIZE;
      const cy = resultRect.height / LENS_SIZE;

      resultRef.current.style.backgroundImage = `url('${src}')`;
      resultRef.current.style.backgroundSize = `${width * cx}px ${height * cy}px`;
      // Move background in opposite direction proportional to scale
      resultRef.current.style.backgroundPosition = `-${lensX * cx}px -${lensY * cy}px`;
    }
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-white border border-gray-100 rounded"
      onMouseLeave={() => setShowZoom(false)}
    >
      {/* Main Image Wrapper */}
      <div
        className="relative w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden"
        ref={imgWrapperRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain block"
        />

        {showZoom && (
          <div
            className="absolute border border-gray-400 bg-white/30 pointer-events-none z-20"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              width: `${LENS_SIZE}px`,
              height: `${LENS_SIZE}px`,
            }}
          ></div>
        )}
      </div>

      {/* Zoom Result Portal (Side-by-side) */}
      {showZoom && (
        <div
          ref={resultRef}
          className="absolute z-50 border border-gray-200 bg-white shadow-2xl"
          style={{
            // Position it to the right of the container
            left: "100%",
            top: 0,
            marginLeft: "20px",
            width: "500px",
            height: "500px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
    </div>
  );
}

export default function ProductImageGallery({ images = [] }) {
  const [activeImage, setActiveImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0].url);
    }
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="flex gap-4 md:gap-6 h-[460px] relative">
      {/* ================= Thumbnails (Swiper) ================= */}
      <div className="w-20 md:w-24 shrink-0 h-full">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          mousewheel={true}
          modules={[Navigation, Thumbs, Mousewheel]}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img.public_id || index} className="!h-20 !w-full">
              <div
                className={`w-full h-full border rounded p-1 cursor-pointer transition flex items-center justify-center bg-white ${
                  activeImage === img.url
                    ? "border-black ring-1 ring-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onMouseEnter={() => setActiveImage(img.url)}
                onClick={() => setActiveImage(img.url)}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= Main Image Container ================= */}
      <div className="flex-1 w-full h-full relative z-10">
        {activeImage && <ImageZoom src={activeImage} alt="Product" />}
      </div>
    </div>
  );
}
