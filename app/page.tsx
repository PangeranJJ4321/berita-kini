import Image from "next/image";

import { fetchNewsByCategory, getPopularNews } from "../utils/api";
import PopularNewsItem from "../components/PopularNewsItem";
import HeroCarousel from "../components/HeroCarousel";
import RecommendedSection from "../components/RecommendedSection";
import PromoCarousel from "../components/PromoCarousel";


export const revalidate = 3600;

export default async function Home() {
  const latestNews = await fetchNewsByCategory("terbaru");
  const popularNews = await getPopularNews();
  const recomendedNews = await fetchNewsByCategory("hiburan");

  const carouselData = latestNews.slice(0, 5);
  const populerList = popularNews.slice(0, 3);

  const recomendedList = [
    ...latestNews.slice(5, 15), // Berita terbaru lainnya
    ...recomendedNews,           // Berita hiburan
  ];

  return (
    <div className="flex flex-col mb-20 bg-[var(--color-surface)] min-h-screen">

      <div className="mx-auto max-w-[1296px] px-4 lg:px-8 pb-8">

        <HeroCarousel newsList={carouselData} />

      </div>

      <section className="bg-white py-12 mt-8">
        <div className="mx-auto max-w-[1296px] px-4 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-1.5 h-8 bg-[var(--color-primary-500)] rounded-full"></div>
            <h2 className="text-2xl font-bold">Berita Terpopuler</h2>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 hide-scrollbar">
            {populerList.map((news, idx) => (
              <PopularNewsItem
                key={idx}
                rank={idx + 1}
                title={news.title}
                category={news.category}
                date={news.isoDate}
                thumbnail={news.image}
                slug={news.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <RecommendedSection initialNews={recomendedList} />

      <PromoCarousel />
      
    </div>
  );
}
