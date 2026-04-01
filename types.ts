export interface NewsItem {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;
  image: string;
  category: string;
  slug: string;
}

export interface NewsResponse {
  message: string;
  total: number;
  data: NewsItem[];
}

export interface NewsCardProps {
  title: string;
  category: string;
  thumbnail: string;
  date: string;
  slug: string; 
}

export interface PopularNewsItemProps {
  rank: number;
  title: string;
  category: string;
  thumbnail: string;
  date: string;
  slug: string;
}
