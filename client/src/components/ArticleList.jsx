import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import { categories } from "../utils/categories";
import "../components/css/ArticleList.css";

const ArticleList = () => {
  const [ads, setAds] = useState([]);
  const [media, setMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/ads/`);
        setAds(response.data);
        console.log("Fetched articles:", response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };
    fetchArticleData();
  }, []);

  const sortedArticles = ads.slice().sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const filterArticles = (articles, mainCategory, subCategory) => {
    const mainCategoryId = categories.find(
      (category) => category.name === mainCategory
    )?.cat_id;

    const subCategoryId = categories.find(
      (category) => category.name === subCategory
    )?.cat_id;

    return articles.filter((ad) => {
      if (mainCategory && subCategory) {
        return (
          ad.categories === mainCategoryId && ad.subCategory === subCategoryId
        );
      } else if (mainCategory) {
        return ad.categories === mainCategoryId;
      }
      return true;
    });
  };

  const searchFilter = (article) => {
    const lowerCasedSearchText = searchText.toLowerCase();
    return (
      categories
        .find((category) => category.cat_id === article.categories)
        ?.name.toLowerCase()
        .includes(lowerCasedSearchText) ||
      article.description.toLowerCase().includes(lowerCasedSearchText) ||
      categories
        .find((category) => category.cat_id === article.subCategory)
        ?.name.toLowerCase()
        .includes(lowerCasedSearchText) ||
      article.tags.toLowerCase().includes(lowerCasedSearchText) ||
      article.title.toLowerCase().includes(lowerCasedSearchText)
    );
  };

  const filteredArticles = filterArticles(
    sortedArticles.filter(searchFilter),
    selectedMainCategory,
    selectedSubCategory
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (e) => {
    setArticlesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleMainCategoryChange = (e) => {
    const mainCategory = e.target.value;
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory("");
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setCurrentPage(1);
  };

  const getSubCategories = () => {
    return categories.filter(
      (category) =>
        category.parent ===
        categories.find((c) => c.name === selectedMainCategory)?.cat_id
    );
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="flex flex-col items-center p-4 bg-transparent ">
      <div className="flex flex-row mb-4 ">
        <div className="sort-order relative text-xs">
          <label htmlFor="sortOrder"></label>
          <select
            className="sort-dropdown bg-transparent border-none"
            id="sortOrder"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <option value="newest">Newest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        <input
          type="text"
          className="bg-#FEECC6 border-gray-300 border-#1D5B79 px-2 h-8 ms-2 rounded-l-l focus:border-blue-500  "
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="filters ml-auto text-xs ">
          <div className="main-category ">
            <label htmlFor="mainCategory"></label>
            <select
              className="bg-transparent border-none"
              id="mainCategory"
              onChange={handleMainCategoryChange}
              value={selectedMainCategory}
            >
              <option value="">All Categories</option>
              {categories
                .filter((category) => category.parent === 0)
                .map((category) => (
                  <option key={category.cat_id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          {selectedMainCategory && (
            <div className="sub-category">
              <label htmlFor="subCategory"></label>
              <select
                className="bg-transparent border-none"
                id="subCategory"
                onChange={handleSubCategoryChange}
                value={selectedSubCategory}
              >
                <option value="">All Subcategories</option>
                {getSubCategories().map((category) => (
                  <option key={category.cat_id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {currentArticles.map((ad, index) => (
          <ArticleCard key={index} article={ad} />
        ))}
      </div>

      <div className="flex flex-col pagination-container mb-2 mt-4">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-#1D5B79 bg-transparent  x rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === i + 1
                      ? "text-blue-600 border-gray-300 bg-transparent hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-#1D5B79 bg-transparent  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 mb-2 h-8 leading-tight text-#1D5B79 bg-transparent rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <div className="articles-per-page mt-2 mb-6">
          <label htmlFor="articlesPerPage" className="me-2"></label>
          <select
            className="bg-transparent border-none text-xs"
            id="articlesPerPage"
            onChange={handlePerPageChange}
            value={articlesPerPage}
          >
            <option value={6}>6 articles per page</option>
            <option value={9}>9 articles per page</option>
            <option value={12}>12 articles per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
