import React, { useState } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { users } from "../utils/users";
import { truncateDescription } from "../utils/helpers";
import "../components/css/ArticleCards.css";

const ArticleCard = ({ article }) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const ownerName =
    users.find((user) => user.user_id === article.user_id)?.name || "Unknown";
  const truncatedDescription = truncateDescription(article.description);

  return (
    <div
      className="custom-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="img-box relative">
        <img src={`/Images/${article.image}`} alt={article.title} />
        <div className="user-info absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
          <p className="user-name text-xs">{ownerName}</p>
        </div>
      </div>
      <div
        className="custom-content"
        style={{
          top: hovered ? "130px" : "252px",
          height: hovered ? "250px" : "35px",
        }}
      >
        <h2 className="card-title">{article.title}</h2>

        {!hovered ? (
          <p>{truncatedDescription}</p>
        ) : (
          <>
            <p>{truncatedDescription}</p>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-700 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={mdiMapMarker} />
              </svg>
              <p className="text-gray-700 text-xs">12345 Musterstadt</p>
            </div>
            <div className="tags">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {article.category}
              </span>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-6 py-2 text-sm font-semibold text-gray-700 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
        <a href="#">Read More</a>
      </div>
      <div className="absolute top-0 right-0 p-2 cursor-pointer">
        <svg
          className={`h-8 w-8 ${
            liked ? "text-red-500 fill-red-500" : "text-black"
          } bg-transparent bg-opacity-25 rounded-lg`}
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          onClick={toggleLike}
        >
          <path d={liked ? mdiHeart : mdiHeartOutline} />
        </svg>
      </div>
    </div>
  );
};

export default ArticleCard;
