import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";

function ArticleSwiper() {

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

	return (
		<div></div>
	)
}

export default ArticleSwiper;
