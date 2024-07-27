import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiRequest } from "../scripts/axios";
import { News } from "../lib/interfaces";
import Nav from "../components/Nav";
const NewsCard = lazy(() => import("../components/NewsCard"));

const Categories = () => {
  const { category } = useParams();
  const [data, setData] = useState<News[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const fromCache = localStorage.getItem(category as string);
        if (fromCache) {
          const cachedData = JSON.parse(fromCache) as { articles: News[] };
          const filteredData = cachedData.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(filteredData);
        } else {
          const res = await ApiRequest.categoryFeeds(category as string);
          const data = res.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(data);
          localStorage.setItem(category as string, JSON.stringify(res));
        }

        // Cache expiration
        setTimeout(() => {
          localStorage.removeItem(category as string);
        }, 1 * 60 * 60 * 1000); // 1 hour in milliseconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    get();
  }, [category]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Suspense
        fallback={<div className="text-center text-2xl">Loading...</div>}
      >
        <div className="flex flex-col lg:flex-row w-full md:px-6 mt-10 md:gap-8 flex-grow">
          <div className="w-full lg:w-full border-b-4 lg:border-r-2 border-black md:px-5 md:space-y-6">
            {data.length > 0 ? (
              data.map((article: News) => (
                <NewsCard key={article.title} {...article} />
              ))
            ) : (
              <div>No articles available</div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Categories;
