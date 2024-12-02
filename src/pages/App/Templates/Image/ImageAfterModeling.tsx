import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function GeneratedImagesComp({ responseData }) {
  const images = responseData.items;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user") || "{}");
    if (Object.entries(storedData).length !== 0 && storedData !== null)
      setUser(storedData);
  }, []);
  console.log(user);

  return (
    // blur-[10px
    <div className="relative -mx-5 flex flex-wrap gap-y-10 overflow-hidden">
      {!user && images.length > 2 && (
        <Link
          to={"/signup"}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md  bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-blue-800 "
        >
          Want more?
        </Link>
      )}
      {[...images.slice(0, 2)].map((image) => {
        return <SingleImage image={image} />;
      })}
      {images.length > 2 &&
        [...images.slice(2)].map((image) => {
          return (
            <SingleImage
              className={!user ? "pointer-events-none blur-sm" : ""}
              image={image}
            />
          );
        })}
    </div>
  );
}

function SingleImage({ image, className = "" }) {
  return (
    <>
      <div
        className={twMerge("flex w-1/2 flex-col items-center px-5", className)}
      >
        <div className="flex w-28 items-center justify-center">
          <img src={image.image_url} className="rounded-md object-cover" />
        </div>
        <ImageDetails image={image} />
      </div>
    </>
  );
}

function ImageDetails({ image }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="relative mr-auto flex flex-col items-end">
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showMore ? "h-auto" : "h-24"
        }`}
      >
        <div className="space-y-3 pt-4">
          {/* Render each property */}
          <div>
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Category
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {image.category || "Not available"}
            </p>
          </div>
          {/* <div>
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Category LLM
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {image.category_llm || "Not available"}
            </p>
          </div> */}
          <div>
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Predicted Brand
            </h5>
            <p className="line-clamp-3 text-xs text-gray-600 dark:text-gray-400">
              {image.predicted_brand || "Not available"}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Price
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {image.price || "Not available"}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Details
            </h5>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {image.details || "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Blurry Overlay */}
      {!showMore && (
        <div className="pointer-events-none absolute inset-0 h-24 w-full bg-gradient-to-b from-transparent to-white dark:to-[#030617] dark:blur-sm"></div>
      )}

      {/* Show More / Show Less Button */}
      <button
        className="mx-auto block text-xs font-medium text-blue-500 hover:underline dark:text-blue-300"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default GeneratedImagesComp;
