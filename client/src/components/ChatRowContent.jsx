import axios from "axios";
import {Oval} from "react-loader-spinner";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
function ChatRowContent({chat}) {
	const { isLoggedIn, userData } = useAuth();
	const [ad, setAd] = useState([]);
	const [loading, isLoading] = useState(true);

	useEffect(() => {
		const getAdData = async () => {
			try {
				// Fetch the article details
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/ads/${chat.ad_id}/`
				);
				setAd(response.data);
				isLoading(false);
			}
			catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		getAdData().then();
	}, []);

	return (
		<div className="flex gap-4">

			<div className="relative w-24 aspect-[3/2] rounded overflow-hidden flex items-center justify-center">
				{!loading ? (
					<img src={ad.media[0]} alt="#" className="absolute top-0 left-0 h-full w-full object-cover"/>
				) : (
					<Oval
						visible={true}
						height="25"
						width="25"
						color="#0694a2"
						secondaryColor="#18c0d1"
						ariaLabel="oval-loading"
					/>
				)}

			</div>
			<div className="flex-1">
				<span className="text-lg font-bold">{chat.participants
					.filter((participant) => participant._id !== userData._id)
					.map((participant) => participant.username)
					.join(', ')}</span><br/>
					{ad.title}
			</div>

		</div>
	)
}

export default ChatRowContent;
