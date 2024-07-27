import { News } from "../lib/interfaces";
import { readAloud } from "../scripts/Read";
import { HiSpeakerWave } from "react-icons/hi2";

const View = (props: News) => {
  const { content } = props;
  const contentArray = content.split("[");
  const newContent = contentArray[0];
  return (
    <div
      className="fixed inset-0 bg-black z-10 text-white bg-opacity-95 flex flex-col items-center"
      onClick={props.toggle}
      aria-modal="true"
      role="dialog"
    >
      <div
        className=" w-full  md:w-2/3 flex flex-col items-center gap-6 overflow-x-hidden overflow-scroll p-4 scroll-m-30"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={props.toggle} // Prevent closing modal when clicking inside the content area
      >
        <h1
          onDoubleClick={() => readAloud(props.title)}
          className="text-3xl md:text-3xl font-Rubik w-full md:w-[80%]"
        >
          {props.title}
        </h1>
        <div className="  w-full md:w-[80%] flex justify-between">
          <p className="md:text-thiny text-left w-[80%]">{props.publishedAt}</p>

          <HiSpeakerWave
            onClick={() =>
              readAloud(
                ` ${props.title}${props.description} ${newContent} click  read more to the the full article`
              )
            }
            className=" cursor-pointer"
            title="Read Aloud"
          />
        </div>

        <img
          src={props.urlToImage}
          alt={props.title}
          loading="lazy"
          className=" w-full md:w-[80%] rounded-3xl"
        />
        <p
          onDoubleClick={() =>
            readAloud(
              `${props.description}${newContent} click  read more to the the full article`,
              1
            )
          }
          className=" text-3xl md:text-sm first-letter:text-7xl first-letter:font-Rubik md:first-letter:text-5xl w-[80%]"
        >
          {props.description} {newContent}
        </p>

        <a
          href={props.url}
          className="bg-gray-800 text-white py-2 px-4 rounded"
        >
          <i className="fa-solid fa-arrow-right-long">Read More</i>
        </a>
      </div>
    </div>
  );
};

export default View;
