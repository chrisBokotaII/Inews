import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { Suspense, useEffect, useState } from "react";
import { News } from "../lib/interfaces";
import { ApiRequest } from "../scripts/axios";
import NewsCard from "../components/NewsCard";
import Footer from "../components/Footer";

const Chanels = () => {
  const { source } = useParams();
  const [data, setData] = useState<News[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const fromCache = localStorage.getItem(source as string);
        if (fromCache) {
          const cachedData = JSON.parse(fromCache) as { articles: News[] };
          const filteredData = cachedData.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(filteredData);
        } else {
          const res = await ApiRequest.sourceFeeds(source as string);
          const data = res.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(data);
          localStorage.setItem(source as string, JSON.stringify(res));
        }

        // Cache expiration
        setTimeout(() => {
          localStorage.removeItem(source as string);
        }, 1 * 60 * 60 * 1000); // 1 hours in milliseconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    get();
  }, [source]);
  return (
    <main className="w-full">
      <Nav />
      <Suspense
        fallback={<div className="text-center text-2xl">Loading...</div>}
      >
        <div className="flex flex-col lg:flex-row w-full md:px-6 mt-10 md:gap-8 md:flex-row">
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
      <Footer />
    </main>
  );
};

export default Chanels;
