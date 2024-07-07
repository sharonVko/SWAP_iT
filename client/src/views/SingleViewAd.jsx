import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "flowbite-react";
import { Avatar } from "flowbite-react";

import messagelogo from "../assets/messagelogo.png";
import taglogo from "../assets/taglogo.png";
import folderlogo from "../assets/folderlogo.png";
import locationlogo from "../assets/locationlogo.png";
import { useAuth } from "../context/AuthProvider.jsx";
import { Button } from "flowbite-react";

const SingleViewAd = () => {
	const { isLoggedIn, userData } = useAuth();
	const [article, setArticle] = useState(null);
	const { articleId } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/ads/${articleId}`)
			.then((res) => setArticle(res.data))
			.catch((err) => console.error(err));
	}, [articleId]);

	let tags;

	if (article) {
		tags = article.tags.split(",");
	}

	return (
		<>
			{article && (
				<div className="mx-auto sm:flex-col max-w-2xl">
					<div className="mb-8  text-teal-700 text-center">
						<h1>{article.title}</h1>
					</div>
					{/* <div className="mx-auto w-64 h-64 xl:h-80 xl:w-80  2xl:h-96 2xl:w-96"> */}
					<div className="mx-auto max-w-2xl h-96">
						<Carousel slide={false}>
							{article.media[0].map((image, index) => (
								<img
									className="h-full w-full object-cover"
									src={image}
									alt="..."
									key={index}
								/>
							))}
						</Carousel>
					</div>

					<div className="w-96 mt-8">
						<p className="text-teal-700">{article.description}</p>
					</div>

					<div className="flex flex-wrap gap-2 my-6">
						<img src={folderlogo} className="size-9" title="Kategorie" />
						<p className="text-teal-700">
							{article.categories} / {article.subCategory}
						</p>
					</div>

					<div className="flex flex-wrap gap-2 my-6">
						<img src={taglogo} className="size-9" />
						<p className="text-teal-700">{article.tags}</p>
					</div>

					{/* // nur für eingeloggte User sichtbar */}
					{isLoggedIn && (
						<div className="flex flex-wrap gap-2 my-6">
							<img src={locationlogo} className="size-9" />
							<p className="text-teal-700">2.5 km entfernt</p>
						</div>
					)}

					{isLoggedIn && (
						<div className="flex flex-wrap gap-2 my-6 items-center">
							<img src={messagelogo} className="size-9 ml-2 " title="Chat" />

							<p className="text-teal-700">Sende eine </p>

							<Button
								gradientDuoTone="greenToBlue"
								className="border-2 border-teal-500 text-teal-700"
							>
								Nachricht
							</Button>

							<p className="text-teal-700"> an Username</p>

							<div className="p-1 rounded-md bg-gradient-to-r from-teal-200 to-teal-500">
								<Avatar
									img="https://randomuser.me/api/portraits/men/42.jpg"
									size="sm"
									title="Profil von Username"
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};
export default SingleViewAd;
