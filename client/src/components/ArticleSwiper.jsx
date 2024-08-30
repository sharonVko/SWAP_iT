import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { register } from 'swiper/element/bundle';
import axios from "axios";

// register Swiper custom elements
register();

function ArticleSwiper({ slidesPerView }) {

	const [ads, setAds] = useState([]);
	const [media, setMedia] = useState([]); // New state for media data

	useEffect(() => {
		const fetchArticleData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/ads/`);
				setAds(response.data);
				//console.log("Fetched articles:", response.data); // Log the fetched articles
			} catch (error) {
				console.error("Error fetching article data:", error);
			}
		};
		fetchArticleData();
	}, []);

	console.log(ads);

	return (
		<>
			<swiper-container
				slides-per-view={slidesPerView}
				space-between="30"
			>
				{ads.map((ad, i) => (
					<swiper-slide key={i}>
						<ArticleCard key={i} article={ad} media={media} />
					</swiper-slide>
				))}
			</swiper-container>
		</>
	)
}

export default ArticleSwiper;
