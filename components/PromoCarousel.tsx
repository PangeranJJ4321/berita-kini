"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 1; // For now only one image from the request

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mx-auto w-full max-w-[1296px] px-4 lg:px-8 py-8">
      <div className="relative w-full overflow-hidden rounded-[24px]">
        <div className="relative aspect-[1296/407] w-full">
          <Image
            src="/img.svg"
            alt="Promo Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Carousel Overlay Logic - Even with 1 item to match "carausel" request style */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
          <button 
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Pagination Style matching the provided SVG concept */}
      <div className="mt-8 flex w-full justify-center items-center gap-6">
         <button onClick={prevSlide} className="text-[#828282] hover:text-[#1E293B] transition-colors">
            <ChevronLeft className="h-5 w-5" />
         </button>
         
         <div className="flex items-center gap-2 text-[14px] font-medium text-[#526071]">
            <span className="font-bold">1</span>
            <span className="text-gray-400">dari</span>
            <span className="font-bold">{totalSlides}</span>
         </div>

         <button onClick={nextSlide} className="text-[#828282] hover:text-[#1E293B] transition-colors">
            <ChevronRight className="h-5 w-5" />
         </button>
      </div>
    </section>
  );
}
