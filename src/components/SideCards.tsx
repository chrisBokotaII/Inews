import { News } from "../lib/interfaces";

const SideCards = (props: News) => {
  return (
    <main className="border-b-1 border-gray-600">
      <div className="flex flex-col gap-5">
        <div>
          <img
            src={
              props.urlToImage == null
                ? "./static/images/defaultimg.jpg"
                : props.urlToImage
            }
            alt=""
            className=" min-w-[300px] object-cover h-[200px] w-full rounded-3xl shadow-md"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <a target="_blank" href={props.url}>
            <h1 className="font-Rubik text-sm  w-full">{props.title}</h1>
          </a>

          <p className="text-sm ">{props.description}</p>
          <p className="text-thiny ">{props.publishedAt}</p>
        </div>
      </div>
    </main>
  );
};

export default SideCards;
