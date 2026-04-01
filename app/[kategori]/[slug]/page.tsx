import Link from "next/link";
import { ChevronRight, Share2, BookmarkPlus } from "lucide-react";
import { fetchNewsByCategory, getPopularNews } from "../../../utils/api";
import NewsCard from "../../../components/NewsCard";
import formatDate from "../../../utils/formatDate";

export default async function DetailBeritaPage({
  params,
}: {
  params: { kategori: string; slug: string };
}) {
  const { kategori, slug } = params;

  const newsList = await fetchNewsByCategory(kategori);
  const currentNews = newsList.find((n) => n.slug === slug) || newsList[0];
  
  const popularNews = await getPopularNews();
  const relatedNews = newsList.slice(0, 3); // top 3 for related news

  if (!currentNews) {
    return <div className="p-20 text-center font-bold">Berita tidak ditemukan.</div>;
  }

  return (
    <div className="bg-[var(--color-surface)] min-h-screen pb-20">
      
      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8">
        
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[var(--color-primary-500)]">Beranda</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/${kategori}`} className="capitalize hover:text-[var(--color-primary-500)]">
            {kategori}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-400">Detail</span>
        </nav>

        {/* Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary-500)]">
                {kategori}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight text-[var(--color-dark-900)]">
                {currentNews.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  {formatDate(currentNews.isoDate)}
                </div>
                <div className="flex gap-4">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 drop-shadow hover:bg-gray-50">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 drop-shadow hover:bg-gray-50">
                    <BookmarkPlus className="h-4 w-4" />
                  </button>
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

            {/* Comments Section */}
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                 <div className="w-1.5 h-6 bg-[var(--color-primary-500)] rounded-full"></div>
                 <h3 className="text-xl font-bold">Komentar</h3>
                 <span className="rounded bg-[var(--color-primary-500)] bg-opacity-10 px-2 py-0.5 text-sm font-bold text-[var(--color-primary-500)]">2</span>
              </div>
              
              <div className="flex gap-4 mb-10">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300"></div>
                <div className="flex flex-1 flex-col mt-1">
                  <textarea 
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                    placeholder="Apa yang ingin anda diskusikan?" 
                    rows={3} 
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="rounded-full bg-[var(--color-primary-500)] px-6 py-2.5 font-bold text-white transition-colors hover:bg-[var(--color-primary-600)]">
                      Kirim
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment List */}
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

            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-white p-6 drop-shadow-sm border border-gray-50">
              <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                 <div className="w-1.5 h-6 bg-[var(--color-dark-900)] rounded-full"></div>
                 <h3 className="text-xl font-bold">Berita Terpopuler</h3>
              </div>

              <div className="flex flex-col gap-6">
                {popularNews.slice(0, 5).map((news, idx) => (
                  <Link 
                    key={idx} 
                    href={`/${news.category.toLowerCase()}/${news.slug}`}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-xl font-black text-gray-200 pr-2 italic">#{idx + 1}</span>
                       <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary-500)]">
                         {news.category}
                       </span>
                    </div>
                    <h4 className="line-clamp-2 text-sm font-bold leading-snug text-[#1a1a1a] group-hover:text-[var(--color-primary-500)] transition-colors pl-8 border-l-2 border-transparent group-hover:border-[var(--color-primary-500)] object-left">
                      {news.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        {/* Berita Terkait */}
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
  );
}
