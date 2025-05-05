"use client";

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: StaticImageData[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-lg bg-muted/50">
        <div className="aspect-square relative">
          <Image 
            src={images[selectedImage]} 
            alt="Product image" 
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm dark:bg-black/90 dark:text-white">
          Used for 3 days only
        </div>
      </div>
      
      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md",
              selectedImage === index 
                ? "ring-2 ring-primary ring-offset-2" 
                : "ring-1 ring-border hover:ring-primary"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image 
              src={image} 
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;