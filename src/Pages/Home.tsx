import { useEffect, useState, lazy, Suspense } from "react";
import Nav from "../components/Nav";
import { ApiRequest } from "../scripts/axios";
import { News } from "../lib/interfaces";
import Footer from "../components/Footer";

const NewsCard = lazy(() => import("../components/NewsCard"));
const SideCards = lazy(() => import("../components/SideCards"));

const Home = () => {
  const [data, setData] = useState<News[]>([]);
  const [sideData, setSideData] = useState<News[]>([]);

  useEffect(() => {
    const get = async () => {
      try {
        const fromCache = localStorage.getItem("homeFeeds");
        if (fromCache) {
          const cachedData = JSON.parse(fromCache) as { articles: News[] };
          const filteredData = cachedData.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(filteredData);
        } else {
          const res = await ApiRequest.homeFeeds();
          const data = res.articles.filter(
            (article: News) => article.urlToImage !== null
          );
          setData(data);
          localStorage.setItem("homeFeeds", JSON.stringify(res));
        }

        const sideFromCache = localStorage.getItem("sideFeeds");
        if (sideFromCache) {
          const cachedSideData = JSON.parse(sideFromCache) as {
            articles: News[];
          };
          setSideData(cachedSideData.articles.slice(0, 5));
        } else {
          const resp = await ApiRequest.sideBarFeeds();
          const sideData = resp.articles.slice(0, 5);
          setSideData(sideData);
          localStorage.setItem("sideFeeds", JSON.stringify(resp));
        }

        // Cache expiration
        setTimeout(() => {
          localStorage.removeItem("homeFeeds");
          localStorage.removeItem("sideFeeds");
        }, 30 * 60 * 60 * 1000); // 30 hours in milliseconds
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    get();
  }, []);

  return (
    <main className="w-full">
      <Nav />
      <Suspense
        fallback={<div className="text-center text-2xl">Loading...</div>}
      >
        <div className="flex flex-col lg:flex-row w-full md:px-6 mt-10 md:gap-8 md:flex-row">
          <div className="w-full lg:w-2/3 border-b-4  last:border-b-0 lg:border-r-2 border-black md:px-5 md:space-y-6">
            {data.length > 0 ? (
              data
                .slice(0, 30)
                .map((article: News) => (
                  <NewsCard key={article.title} {...article} />
                ))
            ) : (
              <div>No articles available</div>
            )}
          </div>

          <div className="w-full lg:w-1/3 px-4 space-y-6">
            <h1 className="font-bold underline text-center text-2xl mb-4">
              Popular
            </h1>
            {sideData.length > 0 ? (
              sideData.map((article: News) => (
                <SideCards key={article.title} {...article} />
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

export default Home;
