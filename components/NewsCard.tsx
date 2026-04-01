import Link from "next/link";
import formatDate from "../utils/formatDate";
import { NewsCardProps } from "../types";



export default function NewsCard({
  title,
  category,
  thumbnail,
  date,
  slug,
}: NewsCardProps) {
  return (
    <Link href={`/${category.toLowerCase()}/${slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2">
        
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[var(--color-dark-900)] transition-colors group-hover:text-[var(--color-primary-500)]">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary-500)]">
            {category}
          </span>
          <span className="text-sm font-medium text-gray-400">•</span>
          <span className="text-sm font-medium text-gray-500">
            {date ? formatDate(date) : "Hari Ini"}
          </span>
        </div>
      </div>
    </Link>
  );
}
