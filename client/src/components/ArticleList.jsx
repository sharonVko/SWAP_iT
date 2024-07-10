import React, { useState, useEffect, useRef } from "react";
import ArticleCard_02 from "./ArticleCard_02";
import axios from "axios";
import { categories } from "../utils/categories";
import "../components/css/ArticleList.css";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider.jsx";

const ArticleList = () => {
  const [ads, setAds] = useState([]);
  const [media, setMedia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(16); // Initial state for articles per page
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { isLoggedIn, userData } = useAuth();

  //console.log(userData);

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

  const filterArticles = (articles, mainCategoryId, subCategoryId) => {
    return articles.filter((ad) => {
      if (mainCategoryId && subCategoryId) {
        return (
          ad.categories.includes(mainCategoryId) &&
          ad.subCategory === subCategoryId
        );
      } else if (mainCategoryId) {
        return ad.categories.includes(mainCategoryId);
      }
      return true;
    });
  };

  const searchFilter = (article) => {
    const lowerCasedSearchText = searchText.toLowerCase();
    const mainCategoryName = categories
      .find((category) => category.cat_id === article.categories)
      ?.name.toLowerCase();
    const subCategoryName = categories
      .find((category) => category.cat_id === article.subCategory)
      ?.name.toLowerCase();

    return (
      mainCategoryName?.includes(lowerCasedSearchText) ||
      article.description.toLowerCase().includes(lowerCasedSearchText) ||
      subCategoryName?.includes(lowerCasedSearchText) ||
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
    setArticlesPerPage(parseInt(e.target.value, 10)); // Update articles per page based on selected option
    setCurrentPage(1); // Reset to first page when changing articles per page
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleMainCategoryChange = (e) => {
    const mainCategoryId = e.target.value;
    setSelectedMainCategory(mainCategoryId);
    setSelectedSubCategory(""); // Reset subcategory when main category changes
    setCurrentPage(1); // Reset to first page when changing main category
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    setSelectedSubCategory(subCategoryId);
    setCurrentPage(1); // Reset to first page when changing sub category
  };

  const getSubCategories = () => {
    if (!selectedMainCategory) {
      return [];
    }
    return categories.filter(
      (category) => category.parent === parseInt(selectedMainCategory)
    );
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  useEffect(() => {
    if (filteredArticles.length === 0 && ads.length > 0) {
      setMessage("Oops, leider keine passenden Artikel gefunden.");
    } else {
      setMessage("");
    }
  }, [filteredArticles]);

  // Use useRef to detect clicks outside the search area
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false); // Clicked outside search area, close it
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Clear search text when activating search
      setSearchText("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-transparent">
      <div className="filters-wrapper flex flex-col sm:flex-row items-center mb-4 w-full">
        <div
          ref={searchRef} // Ref to detect clicks outside the search area
          className={`relative ${
            isActive ? "w-64" : "w-10"
          } transition-all duration-300`}
        >
          <input
            type="text"
            className={`bg-#FEECC6 border-gray-300 border-#1D5B79 rounded-md focus:border-teal-500 outline-none w-full ${
              isActive ? "block mt-3" : "hidden"
            }`}
            placeholder="Was suchst du?"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            className={`absolute top-0 right-1 cursor-pointer ${
              isActive ? "hidden" : "block"
            }`}
            onClick={toggleSearch}
          >
            <FaSearch size={20} />
          </div>
        </div>

        <div className="sort-order text-xs flex flex-col items-start mt-4 sm:mt-0 sm:ml-4">
          <label htmlFor="sortOrder" className="block text-gray-500 mb-1">
            Sortieren
          </label>
          <div className="relative">
            <select
              id="sortOrder"
              className={`sort-dropdown bg-transparent border-teal-500 px-3 py-1 rounded-md focus:border-teal-800 appearance-none ${
                isActive ? "w-32" : "w-full"
              }`}
              onChange={handleSortOrderChange}
              value={sortOrder}
            >
              <option value="newest">Neueste zuerst</option>
              <option value="alphabetical">Alphabetisch sortieren</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div className="filters text-xs flex flex-col items-start mt-4 sm:mt-0 sm:ml-4">
          <div className="main-category">
            <label htmlFor="mainCategory" className="block text-gray-500 mb-1">
              Filter
            </label>
            <select
              id="mainCategory"
              className={`filter-dropdown bg-transparent border-teal-500 px-3 py-1 rounded-md focus:border-teal-800 appearance-none ${
                isActive ? "w-32" : "w-full"
              }`}
              onChange={handleMainCategoryChange}
              value={selectedMainCategory}
            >
              <option value="">Alle Kategorien</option>
              {categories
                .filter((category) => category.parent === 0)
                .map((category) => (
                  <option key={category.cat_id} value={category.cat_id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          {selectedMainCategory && (
            <div className="sub-category mt-2">
              <label htmlFor="subCategory" className="block text-gray-500 mb-1">
                Filter
              </label>
              <select
                id="subCategory"
                className={`filter-dropdown bg-transparent border-teal-500 px-3 py-1 rounded-md focus:border-teal-800 appearance-none ${
                  isActive ? "w-32" : "w-full"
                }`}
                onChange={handleSubCategoryChange}
                value={selectedSubCategory}
              >
                <option value="">Alle Unterkategorien</option>
                {getSubCategories().map((category) => (
                  <option key={category.cat_id} value={category.cat_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {currentArticles.map((ad, i) => (
            <>
              <ArticleCard_02 key={i} article={ad} media={media} />
            </>
          ))}
        </div>
        {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
        {/*//flex col*/}
        <div className="flex flex-col pagination-container mb-2 mt-4">
          <nav aria-label="Seiten Navigation">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-#1D5B79 bg-transparent  x rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Zurück
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
                  className="flex items-center justify-center px-3 mb-2 h-8 leading-tight text-#1D5B79 bg-transparent  rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Weiter
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="articles-per-page mt-2 mb-6">
          <label htmlFor="articlesPerPage" className="me-2">
            Artikel pro Seite:
          </label>
          <select
            className="bg-transparent border-none text-xs"
            id="articlesPerPage"
            onChange={handlePerPageChange}
            value={articlesPerPage}
          >
            <option value={16}>16 Artikel pro Seite</option>
            <option value={24}>24 Artikel pro Seite</option>
            <option value={48}>48 Artikel pro Seite</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
