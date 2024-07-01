import React, { useState } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { truncateDescription } from "../utils/helpers";
import "../css/ArticleCards.css";

const ArticleCard = ({ article }) => {
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [hearts, setHearts] = useState([]);

  const toggleLike = (e) => {
    e.stopPropagation(); // Prevent click event propagation
    setLiked(!liked);

    // Add heart animation
    const heart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setHearts((prevHearts) => [...prevHearts, heart]);

    // Remove heart after animation (optional)
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((h) => h.id !== heart.id));
    }, 1000); // Adjust the time to match your animation duration
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

  return (
    <div
      className={`custom-card ${clicked ? "active" : ""}`}
      onClick={toggleClick}
    >
      <div className="img-box relative">
        <img src={`/Images/${article.image}`} alt={article.title} />
        <div className="username-label absolute bottom-0 left-0 bg-black text-white p-2 text-xs opacity-50 rounded-lg">
          {article.user_id.username}
        </div>
        <div className="trade-label absolute bottom-0 right-0 bg-gray-800 text-white p-2 text-xs opacity-50 rounded-lg">
          {tradeLabel}
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
