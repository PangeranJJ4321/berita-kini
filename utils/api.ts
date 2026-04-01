import generateSlug from "./generateSlug";
import { NewsItem, NewsResponse } from "../types";

const API_BASE_URL = "https://berita-indo-api-next.vercel.app/api";

const categoryEndpoints: Record<string, string> = {
  terbaru: `${API_BASE_URL}/antara-news/terkini`,
  nasional: `${API_BASE_URL}/cnn-news/nasional`,
  internasional: `${API_BASE_URL}/cnn-news/internasional`,
  ekonomi: `${API_BASE_URL}/cnbc-news/market`, // cnbc
  olahraga: `${API_BASE_URL}/cnn-news/olahraga`,
  teknologi: `${API_BASE_URL}/cnn-news/teknologi`,
  hiburan: `${API_BASE_URL}/cnn-news/hiburan`,
  "gaya-hidup": `${API_BASE_URL}/cnn-news/gaya-hidup`,
};



export async function fetchNewsByCategory(category: string): Promise<NewsItem[]> {
  const catKey = (category || "terbaru").toLowerCase();
  const endpoint = categoryEndpoints[catKey] || categoryEndpoints["terbaru"];
  
  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} news`);
    }

    const json = await res.json();
    
    return (json.data || []).map((item: any) => {
      let imageUrl = "";
      if (typeof item.image === "object" && item.image !== null) {
        imageUrl = item.image.large || item.image.small || "";
      } else if (typeof item.image === "string") {
        imageUrl = item.image;
      } else if (item.thumbnail) {
        imageUrl = item.thumbnail;
      }

      return {
        title: item.title || "",
        link: item.link || "",
        contentSnippet: item.contentSnippet || item.description || "",
        isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
        image: imageUrl,
        category: catKey,
        slug: generateSlug(item.title || "berita")
      };
    });

  } catch (error) {
    console.error(`Error fetching news for ${category}:`, error);
    return [];
  }
}

export async function getPopularNews(): Promise<NewsItem[]> {
  // Mengambil berita nasional sebagai list terpopuler agar berbeda dari Hero 'terbaru'
  return fetchNewsByCategory("nasional"); 
}
