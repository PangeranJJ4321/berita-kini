import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { fetchNewsByCategory } from "../../utils/api";
import RecommendedSection from "../../components/RecommendedSection";

export const revalidate = 3600;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  
  // Format display name
  const displayName = kategori.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const newsList = await fetchNewsByCategory(kategori);

  return (
    <div className="bg-[var(--color-surface)] min-h-screen pb-20">
      <div className="mx-auto max-w-[1296px] px-4 lg:px-8 pt-8">
        
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Image
            src="/bi_house.svg"
            alt="icon rumah"
            width={16}
            height={16}
          />
          <Link href="/" className="hover:text-[var(--color-primary-500)] text-[16px]">Beranda</Link>
          <ChevronRight className="h-4 w-4 text-[16px]" />
          <span className="text-gray-900 font-semibold capitalize text-[16px]">{displayName}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-10 bg-[var(--color-primary-500)] rounded-full"></div>
            <h1 className="text-[36px] font-bold text-[#1E293B] tracking-tight capitalize">
              Berita {displayName}
            </h1>
          </div>
          <p className="text-[#64748B] text-[18px] max-w-2xl">
            Menampilkan berita terupdate seputar {displayName} dari berbagai sumber terpercaya.
          </p>
        </div>

        {/* News List using the same component as Home for consistency */}
        <div className="bg-white rounded-3xl p-2 md:p-8 shadow-sm border border-gray-50">
           <RecommendedSection initialNews={newsList} />
        </div>

      </div>
    </div>
  );
}
