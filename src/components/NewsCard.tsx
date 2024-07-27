import { useState } from "react";
import { News } from "../lib/interfaces";
import View from "./View";

const NewsCard = (props: News) => {
  const [toggle, setToggle] = useState(false);
  const [news, setNews] = useState<News | undefined>();

  const triToggle = (newsItem?: News) => {
    setToggle((prevToggle) => !prevToggle);
    setNews(newsItem);
  };

  return (
    <main
      className={`border-b-2 border-black  ${toggle ? "overflow-hidden " : ""}`}
    >
      <div
        className="  flex flex-col md:flex-row gap-5 cursor-pointer hover:bg-gray-100 transition-all duration-300"
        onClick={() => triToggle(props)}
      >
        <div className="flex flex-col w-full md:w-1/2 gap-4 py-4 px-4">
          <h1 className="font-Rubik text-xl font-semibold">{props.title}</h1>
          <p className=" text-2xl md:text-sm text-gray-700">
            {props.description}
          </p>
        </div>
        <div className=" w-full md:w-1/2 flex items-center p-3">
          <img
            src={props.urlToImage}
            alt={props.title}
            className="min-w-full object-cover h-auto rounded-3xl shadow-md"
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full">
        {toggle && news && (
          <View
            title={news.title}
            description={news.description}
            urlToImage={news.urlToImage}
            url={news.url}
            content={news.content}
            publishedAt={news.publishedAt}
            toggle={triToggle}
          />
        )}
      </div>
    </main>
  );
};

export default NewsCard;
