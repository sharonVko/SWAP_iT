import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import "../components/css/ArticleCards.css";

const ArticleList = () => {
  const [ads, setAds] = useState([]);
  const [media, setMedia] = useState([]); // New state for media data
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6); // Default to 6 articles per page

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/ads/`);
        setAds(response.data);
        console.log("Fetched articles:", response.data); // Log the fetched articles
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };
    fetchArticleData();
  }, []);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/media/`);
        setMedia(response.data);
        console.log("Fetched media:", response.data); // Log the fetched media
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };
    fetchMediaData();
  }, []);

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = ads.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Change articles per page
  const handlePerPageChange = (e) => {
    setArticlesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing articles per page
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Article grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {currentArticles.map((ad, index) => (
          <ArticleCard key={index} article={ad} media={media} />
        ))}
      </div>
      <div className="pagination-container mb-2 mt-4">
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(ads.length / articlesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`pagination-button ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
        <div className="articles-per-page mt-2">
          <label>Articles per page:</label>
          <select onChange={handlePerPageChange} value={articlesPerPage}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
