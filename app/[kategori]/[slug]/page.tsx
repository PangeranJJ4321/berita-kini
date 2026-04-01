import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fetchNewsByCategory, getPopularNews } from "../../../utils/api";
import NewsCard from "../../../components/NewsCard";
import formatDate from "../../../utils/formatDate";
import Image from "next/image";

export const revalidate = 3600;

export default async function DetailBeritaPage({
  params,
}: {
  params: Promise<{ kategori: string; slug: string }>;
}) {
  const { kategori, slug } = await params;

  const newsList = await fetchNewsByCategory(kategori);
  const currentNews = newsList.find((n) => n.slug === slug) || newsList[0];

  const popularNews = await getPopularNews();
  const relatedNews = newsList.slice(0, 3); 

  if (!currentNews) {
    return <div className="p-20 text-center font-bold">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-20">

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8">

        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Image
            src="/bi_house.svg"
            alt="icon rumah"
            width={16}
            height={16}
          />
          <Link href="/" className="hover:text-[var(--color-primary-500)] text-[16px]">Beranda</Link>
          <ChevronRight className="h-4 w-4 text-[16px]" />
          <Link href={`/${kategori}`} className="capitalize hover:text-[var(--color-primary-500)] text-[16px]">
            {kategori}
          </Link>
          <ChevronRight className="h-4 w-4 text-[16px]" />
          <span className="text-gray-400 text-[16px]">Detail</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-22">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight text-[var(--color-dark-900)]">
                {currentNews.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[#0063FF] uppercase">
                    {kategori}
                  </span>
                  <span className="text-gray-300 text-[10px]">•</span>
                  <span className="text-[12px] text-gray-400">
                    {formatDate(currentNews.isoDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={currentNews.image || "https://via.placeholder.com/1000x600"}
                alt={currentNews.title}
                className="h-full w-full object-cover"
              />
            </div>

            <article className="prose prose-lg max-w-none text-[#333333] leading-relaxed mt-4">
              <p className="font-semibold text-lg">{currentNews.contentSnippet}</p>

              <p className="mt-4">
                Sebagai simulasi untuk Technical Test UI, ini adalah *dummy paragraph* karena API hanya mengembalikan cuplikan singkat (snippet) dari berita asli.
                Dalam implementasi portal berita yang sesungguhnya (menggunakan CMS khusus), struktur di bawah ini akan digantikan oleh konten utuh HTML dari backend.
              </p>
              <p className="mt-4">
                Pemerintah terus memperbarui sistem yang ada, sementara masyarakat diimbau untuk tetap waspada terhadap informasi yang belum jelas sumber kebenarannya.
                Pakar ekonomi menyampaikan bahwa hal ini merupakan langkah krusial untuk stabilisasi jangka menengah.
              </p>
              <p className="mt-4">
                Untuk membaca artikel asli secara lengkap, Anda dapat mengunjungi sumber resminya pada tautan berikut:
                <a href={currentNews.link} target="_blank" rel="noreferrer" className="text-[var(--color-primary-500)] underline ml-1">
                  Baca di sumber asli
                </a>.
              </p>
            </article>

            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                <div className="w-1.5 h-6 bg-[var(--color-primary-500)] rounded-full"></div>
                <h3 className="text-xl font-bold">Komentar</h3>
              </div>

              <div className="flex gap-4 mb-10">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300"></div>
                <div className="flex flex-1 flex-col mt-1">
                  <textarea
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                    placeholder="Apa yang ingin anda diskusikan?"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-start">
                    <button className="rounded-[8px] bg-[var(--color-primary-500)] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[var(--color-primary-600)]">
                      Kirim
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {/* User 1 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User 1" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold">Budi Santoso</h4>
                      <span className="text-xs text-gray-400">2 jam yang lalu</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Informasi yang sangat bermanfaat. Semoga implementasi kebijakan ini cepat terealisasi di lapangan.
                    </p>
                    <button className="mt-2 text-xs font-semibold text-[var(--color-primary-500)]">Balas</button>
                  </div>
                </div>
                {/* User 2 */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img src="https://i.pravatar.cc/150?img=5" alt="User 2" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold">Rina Wahyuni</h4>
                      <span className="text-xs text-gray-400">5 jam yang lalu</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Apakah sudah ada detail lebih lanjut mengenai area mana saja yang akan difokuskan pertama kali?
                    </p>
                    <button className="mt-2 text-xs font-semibold text-[var(--color-primary-500)]">Balas</button>
                  </div>
                </div>
              </div>

              <div className="mt-16 border-t border-gray-200 pt-16">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[var(--color-primary-500)] rounded-full"></div>
                    <h3 className="text-2xl font-bold">Berita Terkait</h3>
                  </div>
                  <Link href={`/${kategori}`} className="font-bold text-[var(--color-primary-500)] border border-[var(--color-primary-500)] px-4 py-2 rounded-full hover:bg-[var(--color-primary-500)] hover:text-white transition-colors text-sm">
                    Lihat Semua
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedNews.map((news, idx) => (
                    <NewsCard
                      key={idx}
                      title={news.title}
                      category={news.category}
                      date={news.isoDate}
                      thumbnail={news.image}
                      slug={news.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="top-28 rounded-2xl bg-white p-6 drop-shadow-sm border border-gray-50">
              <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                <div className="w-1.5 h-6 bg-[var(--color-dark-900)] rounded-full"></div>
                <h3 className="text-xl font-bold">Berita Terpopuler</h3>
              </div>

              <div className="flex flex-col gap-6">
                {popularNews.slice(0, 5).map((news, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-100">
                        <img
                          src={news.image || "https://via.placeholder.com/80x80?text=No+Img"}
                          alt={news.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -top-2 -left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F2B39] text-[10px] font-bold text-white border-2 border-white shadow-sm">
                        {idx + 1}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <Link
                        href={`/${news.category.toLowerCase()}/${news.slug}`}
                        className="group/title"
                      >
                        <h4 className="line-clamp-2 text-[14px] font-bold leading-snug text-[#1E293B] group-hover/title:text-[#0090FF] transition-colors">
                          {news.title}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#0063FF] uppercase whitespace-nowrap">
                          {news.category}
                        </span>
                        <span className="text-gray-300 text-[8px]">•</span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                          {formatDate(news.isoDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}
