import Link from "next/link";
import formatDate from "../utils/formatDate";
import { PopularNewsItemProps } from "../types";

export default function PopularNewsItem({
  rank,
  title,
  category,
  thumbnail,
  date,
  slug,
}: PopularNewsItemProps) {
  return (
    <div className="flex w-full items-start gap-4 bg-transparent py-2 pl-3 pr-6 border-r border-gray-200 last:border-r-0">
      
      <div className="relative shrink-0">
        <div className="w-[120px] h-[120px] overflow-hidden rounded-[12px] bg-gray-100">
          <img
            src={thumbnail || "https://via.placeholder.com/120x120?text=No+Img"}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute -top-2 -left-2 z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#1F2B39] text-[14px] font-bold text-white border-2 border-white shadow-sm">
          {rank}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Link href={`/${category.toLowerCase()}/${slug}`} className="group">
          <h4 className="line-clamp-3 text-[15px] font-bold leading-[1.3] text-[#1E293B] transition-colors group-hover:text-[#0090FF]">
            {title}
          </h4>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-[#0063FF] uppercase">
            {category}
          </span>
          <span className="text-gray-300 text-[10px]">•</span>
          <span className="text-[12px] text-gray-400">
            {date ? formatDate(date) : "22 Jan 2024"}
          </span>
        </div>
      </div>
    </div>
  );
}