"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import formatDate from "../utils/formatDate";
import Image from "next/image";

export default function HeroCarousel({ newsList }: { newsList: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!newsList || newsList.length === 0) return null;

  const heroNews = newsList[currentIndex];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mt-8 mb-4">
      <div className="grid grid-cols-1 items-start gap-[44px] lg:grid-cols-2">

        <div className="flex flex-col">
          <span className="mb-4 text-[16px] font-semibold text-[#334155] tracking-tight">
            Headline
          </span>

          <h1 className="mb-6 font-bold text-[36px] leading-[120%] text-[#1E293B]">
            {heroNews.title}
          </h1>

          <p className="mb-6 text-[18px] leading-[160%] text-[#64748B] line-clamp-3">
            {heroNews.contentSnippet}
          </p>

          <div className="mb-8 flex items-center gap-2 text-[14px] text-[#64748B]">
            <Image
              src="/bi_calendar-event.svg"
              alt="icon"
              width={16}
              height={16}
            />
            <span>{formatDate(heroNews.isoDate)}</span>
          </div>

          <Link
            href={`/${heroNews.category.toLowerCase()}/${heroNews.slug}`}
            className="flex items-center gap-2 font-bold text-[#0063FF] hover:underline"
          >
            Baca Selengkapnya
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
            <img
              src={heroNews.image || "https://via.placeholder.com/800x600"}
              alt={heroNews.title}
              className="h-full w-full object-cover"
            />
          </div>


        </div>

      </div>
      {newsList.length > 1 && (
        <div className="mt-10 flex w-full justify-center">
          <button onClick={prevSlide} className="text-gray-400 hover:text-black">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2 text-[14px] text-[#475569]">
            <span className="font-bold">{currentIndex + 1}</span>
            <span className="text-gray-400">dari</span>
            <span className="font-bold">{newsList.length}</span>
          </div>

          <button onClick={nextSlide} className="text-gray-400 hover:text-black">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}