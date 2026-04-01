"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { NewsItem } from "../types";
import NewsCard from "./NewsCard";

interface RecommendedSectionProps {
  initialNews: NewsItem[];
}

export default function RecommendedSection({ initialNews }: RecommendedSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 1. Logic Filter
  const filteredNews = useMemo(() => {
    return initialNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialNews, searchQuery]);

  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 2. Logic Pagination
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById("recommended-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 3. Render Pagination Buttons
  const renderPageButtons = () => {
    const buttons = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderButton(i));
      }
    } else {
      // Always show first page
      buttons.push(renderButton(1));

      if (currentPage > 3) {
        buttons.push(<span key="dots-1" className="px-2 text-gray-400">...</span>);
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(renderButton(i));
      }

      if (currentPage < totalPages - 2) {
        buttons.push(<span key="dots-2" className="px-2 text-gray-400">...</span>);
      }

      // Always show last page
      buttons.push(renderButton(totalPages));
    }
    return buttons;
  };

  const renderButton = (page: number) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`flex h-10 w-10 items-center justify-center rounded-[10px] font-medium transition-colors ${currentPage === page
          ? "bg-[#0090FF] text-white shadow-sm"
          : "hover:bg-gray-50 text-[#475569]"
        }`}
    >
      {page}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-[1296px] px-4 lg:px-8 py-12">
      {/* HEADER: Berita & Search (Tetap Kiri-Kanan) */}
      <div className="mb-10 flex flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-10 bg-[#0063FF] rounded-full"></div>
          <h2 className="text-[28px] font-bold text-[#1E293B] tracking-tight">
            Rekomendasi Untuk Anda
          </h2>
        </div>

        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Cari disini..."
            value={searchQuery}
            onChange={handleSearch}
            spellCheck="false"
            className="w-full rounded-[12px] border border-gray-200 bg-white py-3 pl-5 pr-12 text-sm text-[#1E293B] outline-none focus:border-[#0063FF] focus:ring-1 focus:ring-[#0063FF] transition-all placeholder:text-gray-400"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
        </div>
      </div>

      <section
        id="recommended-section"
        className="pb-24 min-h-[700px] flex flex-col"
      >
        <div className="flex-1 w-full">
          {paginatedNews.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedNews.map((news, idx) => (
                <NewsCard
                  key={`${news.slug}-${idx}`}
                  title={news.title}
                  category={news.category}
                  date={news.isoDate}
                  thumbnail={news.image}
                  slug={news.slug}
                />
              ))}
            </div>
          ) : (
            /* EMPTY STATE: Full width & Center alignment */
            <div className="flex flex-col items-center justify-center w-full min-h-[400px] rounded-2xl bg-[#F8FAFC] border border-dashed border-gray-200">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Search className="h-10 w-10 text-[#0063FF] opacity-20" />
              </div>
              <p className="text-[#1E293B] font-semibold text-lg">Tidak ada berita ditemukan</p>
              <p className="text-gray-400 text-center max-w-xs mt-1">
                Kata kunci <span className="text-[#0063FF]">"{searchQuery}"</span> tidak cocok dengan berita apapun.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 text-sm font-bold text-[#0063FF] hover:underline"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-10 md:flex-row w-full">
            <p className="text-[14px] text-[#475569]">
              Showing <span className="font-semibold text-[#1E293B]">
                {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)}
              </span> of <span className="font-semibold text-[#1E293B]">{totalItems}</span> results
            </p>

            <nav className="flex items-center gap-2 text-[14px] font-medium text-[#475569]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-3 py-2 transition-colors ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:text-[#0063FF]"
                  }`}
              >
                <span className="text-lg">←</span> Previous
              </button>

              <div className="flex items-center gap-1">
                {renderPageButtons()}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-3 py-2 transition-colors ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:text-[#0063FF]"
                  }`}
              >
                Next <span className="text-lg">→</span>
              </button>
            </nav>
          </div>
        )}
      </section>
    </div>
  );
}