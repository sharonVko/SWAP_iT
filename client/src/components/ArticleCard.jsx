import React, { useState } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { users } from "../utils/users";
import { truncateDescription } from "../utils/helpers";
import "../components/css/ArticleCards.css";

const ArticleCard = ({ article }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleClick = () => {
    setClicked(!clicked);
  };

  const ownerName =
    users.find((user) => user.user_id === article.user_id)?.name || "Unknown";
  const truncatedDescription = truncateDescription(article.description);

  return (
    <div
      className={`custom-card ${clicked ? "active" : ""}`}
      onClick={toggleClick}
    >
      <div className="img-box">
        <img src={`/Images/${article.image}`} alt={article.title} />
      </div>
      <div
        className="custom-content"
        style={{
          top: clicked ? "130px" : hovered ? "130px" : "252px",
          height: clicked
            ? "auto"
            : hovered
            ? "auto"
            : "35px" /* Dynamische Höhe */,
        }}
      >
        <h2>{article.title}</h2>
        {!hovered && !clicked ? (
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
          } bg-white bg-opacity-25 rounded-lg`}
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
