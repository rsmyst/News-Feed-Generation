import { FC } from "react";

interface Article {
  urlToImage: string;
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
}

interface NewsCardProps {
  article: Article;
}

const NewsCard: FC<NewsCardProps> = ({ article }) => {
  const { urlToImage, title, description, source, publishedAt, url } = article;

  const date = new Date(publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  return (
    <article
      onClick={() => window.open(url, "_blank")}
      className="group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer animate-fade-in"
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <span>{source.name}</span>
          <span>•</span>
          <time>{date}</time>
        </div>
        <p className="text-slate-600 dark:text-slate-300 line-clamp-3">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  );
};

export default NewsCard;
