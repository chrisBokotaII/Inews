export interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  toggle?: () => void;
}
export interface Source {
  id: string;
  name: string;
}
