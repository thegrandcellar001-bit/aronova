"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";

interface ProductImageLightboxProps {
  images: string[];
  open?: boolean;
  initialIndex?: number;
  onClose?: () => void;
}

export default function ProductImageLightbox({
  images,
  open = false,
  initialIndex = 0,
  onClose,
}: ProductImageLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(open);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  // Sync props
  useEffect(() => {
    setLightboxOpen(open);
  }, [open]);

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImageIndex(initialIndex);
    }
  }, [images, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const closeLightbox = () => {
    setLightboxOpen(false);
    onClose?.();
  };

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      images.length > 0 ? (prev + 1) % images.length : 0
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      images.length > 0 ? (prev === 0 ? images.length - 1 : prev - 1) : 0
    );

  const currentSrc = images[currentImageIndex];

  if (!currentSrc || !lightboxOpen) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <button
          className="absolute top-4 right-4 text-white text-3xl hover:bg-[rgba(255,255,255,0.2)] rounded-full w-9 h-9 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <i className="far fa-close text-lg" />
        </button>

        <button
          className="absolute left-4 text-white text-3xl hover:bg-[rgba(255,255,255,0.2)] rounded-full w-9 h-9 flex items-center justify-center"
          onClick={prevImage}
        >
          <i className="far fa-arrow-left text-lg" />
        </button>

        <Image
          src={currentSrc}
          alt={`Product Image ${currentImageIndex + 1}`}
          width={800}
          height={800}
          className="max-w-full max-h-full rounded-md"
          unoptimized
        />

        <button
          className="absolute right-4 text-white text-3xl hover:bg-[rgba(255,255,255,0.2)] rounded-full w-9 h-9 flex items-center justify-center"
          onClick={nextImage}
        >
          <i className="far fa-arrow-right text-lg" />
        </button>
      </div>
    </Fragment>
  );
}
