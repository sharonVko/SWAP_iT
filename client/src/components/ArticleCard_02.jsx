import React, { useState } from "react";
import { mdiHeartOutline, mdiHeart, mdiMapMarker } from "@mdi/js";
import { truncateDescription } from "../utils/helpers";
import { categories } from "../utils/categories";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from 'react-collapse';
import "../components/css/ArticleCards.css";

const ArticleCard_02 = ({ article }) => {

	console.log(article);

	const [active, setActive] = useState(false);
	const [liked, setLiked] = useState(false);
	const navigate = useNavigate();

	const toggleCard = () => setActive(!active);
	const toggleLike = (e) => {
		e.stopPropagation(); // Prevent click event propagation
		setLiked(!liked);
	};

	const gotoSingle = () => {
		navigate("/ads/" + article._id);
	}

	const truncatedDescription = article.description
		? truncateDescription(article.description)
		: "";

	// Function to get category name by ID (including subcategories)
	const getCategoryNameById = (id) => {
		const category = categories.find((cat) => cat.cat_id === parseInt(id, 10));
		return category ? category.name : "Unknown Category";
	};

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


	// Get the first media file URL
	let imageUrl = "/Images/default.png"; // Default image path
	if (
		article.media &&
		article.media.length > 0 &&
		article.media[0].length > 0
	) {
		imageUrl = article.media[0][0];
	}

	return (
		<div className="article-card" onClick={toggleCard}>
			<div className={`article-card-inner ${active ? "open" : "close"}`}>
				<div className={`image-box relative ${active ? "show" : "hide"}`}>
					<img src={imageUrl} alt={article.title} className="absolute top-0 left-0 w-full h-full object-cover"/>
					<div className="absolute bottom-2 left-1 flex gap-1">
						<div className="bg-white/80 uppercase text-xs px-2 rounded-full flex items-center justify-center"><span>{article.user_id.username}</span></div>

						{article.tradeOption ? (
							<div className="bg-white/80 px-1 py-1 text-sm rounded-full flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
									<g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
										<path strokeMiterlimit="10" d="M18.024 7.043A8.374 8.374 0 0 0 3.74 12.955"/>
										<path strokeLinejoin="round" d="m17.35 2.75l.832 3.372a1.123 1.123 0 0 1-.854 1.382l-3.372.843"/>
										<path strokeMiterlimit="10" d="M5.976 16.957a8.374 8.374 0 0 0 14.285-5.912"/>
										<path strokeLinejoin="round" d="m6.65 21.25l-.832-3.372a1.124 1.124 0 0 1 .855-1.382l3.371-.843"/>
									</g>
								</svg>
							</div>
						) : (
							<div className="bg-white/80 px-1 py-1 text-sm rounded-full flex items-center justify-center">
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
							</div>
						)}

					</div>
				</div>
				<div className={`card-content ${active ? "open" : "close"}`}>
					<h2 className="font-medium mt-4">Pinsel & Farben</h2>
					<Collapse isOpened={active}>
						<div className="mb-4 px-4">{truncatedDescription}</div>
						<div className="tags">
							{Array.isArray(article.categories) ? (
								article.categories.map((categoryId, index) => (
									<span
										key={index}
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1"
									>
                    {getCategoryNameById(categoryId)}
                  </span>
								))
							) : (
								<span className="inline-block bg-teal-300/60 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mb-1">
                  {getCategoryNameById(article.categories)}
                </span>
							)}
							{article.subCategory && (
								<span
									className="inline-block bg-orange
              -300/10 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mb-1"
								>
                  {getCategoryNameById(article.subCategory)}
                </span>
							)}
							{article.tags.split(", ").map((tag, index) => (
								<span
									key={index}
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs  text-gray-700 mr-2 mb-1"
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
						<button className="btn-md btn-teal" onClick={gotoSingle}>Infos</button>
					</Collapse>
				</div>
			</div>
			<div className="absolute top-4 right-0 p-3 cursor-pointer">
				<svg
					className={`h-8 w-8 ${
						liked ? "text-red-500 fill-red-500" : "text-teal-500 fill-teal-500"
					}`}
					onClick={toggleLike}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d={liked ? mdiHeart : mdiHeartOutline} />
				</svg>
			</div>
		</div>
  );
};

export default ArticleCard_02;
