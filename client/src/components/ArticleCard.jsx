import React, { useState, useEffect } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { truncateDescription } from "../utils/helpers";
import axios from "../utils/axios-config";
import "../components/css/ArticleCards.css";

const ArticleCard = ({ article }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ownerName, setOwnerName] = useState("Unknown");
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${article.user_id}`);
        setOwnerName(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch article data
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/ads/667c2648c43fe23dcf6c6cb4`
        );
        setArticleData(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    console.log("Article data:", articleData);

    fetchUserData();
    fetchArticleData();
  }, [article._id, article.user_id]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleClick = () => {
    setClicked(!clicked);
  };

  const truncatedDescription = articleData
    ? truncateDescription(articleData.description)
    : "";

  return (
    <div
      className={`custom-card ${clicked ? "active" : ""}`}
      onClick={toggleClick}
    >
      <div className="img-box">
        <img
          src={`/Images/${articleData ? articleData.image : ""}`}
          alt={articleData ? articleData.title : ""}
        />
      </div>
      <div
        className="custom-content"
        style={{
          top: clicked ? "130px" : hovered ? "130px" : "252px",
          height: clicked || hovered ? "auto" : "35px",
        }}
      >
        <h2>{articleData ? articleData.title : ""}</h2>
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
              <p className="text-gray-700 text-xs">
                {articleData ? articleData.pickupaddress.zip : ""}{" "}
                {articleData ? articleData.pickupaddress.city : ""}
              </p>
            </div>
            <div className="tags">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {articleData ? articleData.category : ""}
              </span>
              {articleData &&
                articleData.tags.map((tag, index) => (
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
