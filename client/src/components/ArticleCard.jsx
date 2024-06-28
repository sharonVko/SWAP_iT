import React, { useState } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { truncateDescription } from "../utils/helpers";
import "../components/css/ArticleCards.css";

const ArticleCard = ({ article, media }) => {
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);

  const toggleLike = (e) => {
    e.stopPropagation(); // Prevent click event propagation
    setLiked(!liked);
  };

  const toggleClick = () => {
    setClicked(!clicked);
  };

  const truncatedDescription = article.description
    ? truncateDescription(article.description)
    : "";

  // Determine trade option label
  const tradeLabel = article.tradeOption ? "Tauschen" : "Verschenken";

  // Determine which address to display
  let fullAddress = "";
  if (
    article.pickupaddress &&
    (article.pickupaddress.zip || article.pickupaddress.city)
  ) {
    // Use pickupaddress if available and has zip or city
    const { street, housenumber, zip, city, country } = article.pickupaddress;
    fullAddress = formatAddress(street, housenumber, zip, city, country);
  } else if (
    article.user_id &&
    article.user_id.address &&
    (article.user_id.address.zip || article.user_id.address.city)
  ) {
    // Fallback to user_id address if pickupaddress is not available or missing zip and city
    const { street, housenumber, zip, city, country } = article.user_id.address;
    fullAddress = formatAddress(street, housenumber, zip, city, country);
  }

  function formatAddress(street, housenumber, zip, city, country) {
    // Construct the full address string with proper formatting
    let addressArray = [];
    if (street) addressArray.push(street);
    if (housenumber) addressArray.push(housenumber);
    if (zip) addressArray.push(zip);
    if (city) addressArray.push(city);
    if (country) addressArray.push(country);

    return addressArray.join(", ");
  }

  // Find the corresponding media file URL
  let imageUrl = `/Images/${article.image}`; // Default image path

  if (article.media && article.media.length > 0) {
    const matchingMedia = media.find((item) =>
      article.media.includes(item._id)
    );
    if (
      matchingMedia &&
      matchingMedia.media_files &&
      matchingMedia.media_files.length > 0
    ) {
      imageUrl = matchingMedia.media_files[0];
    }
  }

  return (
    <div
      className={`custom-card ${clicked ? "active" : ""}`}
      onClick={toggleClick}
    >
      <div className="img-box relative">
        <img src={imageUrl} alt={article.title} />

        <div className="username-label absolute bottom-0 left-0 bg-black text-white p-2 text-xs opacity-50 rounded-lg">
          {article.user_id.username}
        </div>
        <div className="trade-label absolute bottom-0 right-0 bg-gray-800 text-white p-2 text-xs opacity-50 rounded-lg">
          {article.tradeOption ? (
            <div
              className="tooltip"
              onClick={(e) => {
                e.stopPropagation();
                setTooltipActive(true);
                setTimeout(() => {
                  setTooltipActive(false);
                }, 1000); // 1000ms = 1 second
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 21 21"
                onClick={(e) => {
                  e.stopPropagation();
                  e.target.parentNode.classList.toggle("active");
                }}
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 8h5V3"></path>
                  <path d="M18 8c-2.837-3.333-5.67-5-8.5-5S4.17 4 2 6m4.5 5.5h-5v5"></path>
                  <path d="M1.5 11.5c2.837 3.333 5.67 5 8.5 5s5.33-1 7.5-3"></path>
                </g>
              </svg>
              <span className="tooltip-text">
                {article.user_id.username} möchte diesen Artikel tauschen
              </span>
            </div>
          ) : (
            <div
              className="tooltip"
              onClick={(e) => {
                e.stopPropagation();
                e.target.classList.toggle("active");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.06 1.93C7.17 1.92 5.33 3.74 6.17 6H3a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h9V8h2v3h9a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2h-3.17C19 2.73 14.6.42 12.57 3.24L12 4l-.57-.78c-.63-.89-1.5-1.28-2.37-1.29M9 4c.89 0 1.34 1.08.71 1.71S8 5.89 8 5a1 1 0 0 1 1-1m6 0c.89 0 1.34 1.08.71 1.71S14 5.89 14 5a1 1 0 0 1 1-1M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8h-9v8h-2v-8z"
                ></path>
              </svg>
              <span className="tooltip-text">
                {article.user_id.username} verschenkt diesen Artikel
              </span>
            </div>
          )}
        </div>

        {/* Heart animations */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart-animation"
            style={{ left: heart.x, top: heart.y }}
          >
            <svg
              className="w-4 h-4 text-red-500 fill-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
            >
              <path d={mdiHeart} />
            </svg>
          </div>
        ))}
      </div>
      <div
        className="custom-content"
        style={{
          top: clicked ? "130px" : "252px",
          height: clicked ? "auto" : "35px",
        }}
      >
        <h2>{article.title}</h2>
        {clicked && (
          <>
            <p>{truncatedDescription}</p>
            <div className="tags">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">
                {article.categories}
              </span>
              {article.tags.split(", ").map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-2">
              <svg
                className="w-6 h-6 text-gray-700 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={mdiMapMarker} />
              </svg>
              <p className="text-gray-700 text-xs">
                {fullAddress ? fullAddress : "Address not available"}
              </p>
            </div>
          </>
        )}
        <a href="#">Read More</a>
      </div>
      <div className="absolute top-0 right-0 p-2 cursor-pointer">
        <svg
          className={`h-8 w-8 ${
            liked ? "text-red-500 fill-red-500" : "text-black"
          }  rounded-lg`}
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
