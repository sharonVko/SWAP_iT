import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
import trashbin from "../assets/trashbinlogo.png";
import pencil from "../assets/pencillogo.png";
import topswap2 from "../assets/topswapsnew1.png";
import defaultImg from "../assets/default.png";
import { truncateDescription } from "../utils/helpers";
import SwapSchema from "../components/SwapSchema.jsx";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { isLoggedIn, userData } = useAuth();
  const [userAds, setUserAds] = useState([]);
  const [interestAds, setInterestAds] = useState([]);
  const [swapAds, setSwapAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        if (isLoggedIn && userData) {
          const adDetailsPromises = userData.ads.map(async (adId) => {
            try {
              const response = await axios.get(
                `http://localhost:8000/ads/${adId}`
              );
              return response.data;
            } catch (error) {
              console.error(`Error fetching ad ${adId}:`, error);
              return null;
            }
          });

          const userAdsData = await Promise.all(adDetailsPromises);
          setUserAds(userAdsData.filter((ad) => ad !== null));
        }
      } catch (error) {
        console.error("Error fetching user ads:", error);
      }
    };

    fetchUserAds();
  }, [isLoggedIn, userData, interestAds, swapAds]);

  const deleteAd = async (adId) => {
    try {
      await axios.delete(`http://localhost:8000/ads/${adId}`, {
				withCredentials: true
			});

      setUserAds(userAds.filter((ad) => ad._id !== adId));
    }
		catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleDelete = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const confirmDelete = () => {
		deleteAd(selectedAd._id);
    setShowModal(false);
		console.log(`Anzeige mit ID ${selectedAd._id} gelöscht`);
  };

  const gotoSingle = (adId) => {
    navigate("/ads/" + adId);
  };

	const gotoEditAd = (adId) => {
		navigate("/profile/ads/edit/" + adId);
	};

	return (
    <>
      <SwapSchema setInterestAds={setInterestAds} setSwapAds={setSwapAds} />

      <div className="sm:px-10 lg:px-20 py-8 relative -top-12">
        <div>
          <img
            className="max-w-80 mx-auto mt-12 mb-2"
            src={topswap2}
            alt="Top Swap"
          />
        </div>
        <HomeSwiper swiperId={2} articles={swapAds} />{" "}
      </div>

      <h2 className="h1 mt-6 text-center drop-shadow-lg">Das gebe ich ab: </h2>
      {userAds.map((ad, i) => (
        <div
          className="max-w-[700px] mx-auto flex gap-4 mb-2 items-start bg-white/30 p-2 rounded-lg"
          key={i}
        >
          <div className="w-24 aspect-[3/2] relative hover:cursor-pointer p-2 border-2 border-teal-400 overflow-hidden rounded-md" onClick={() => gotoSingle(ad._id)}>
						<img
							src={ad.media ? ad.media[0] : defaultImg}
							className="absolute top-0 left-0 w-full h-full object-cover rounded"
							alt={ad.title}
						/>
          </div>
          <div className="flex-1 hover:cursor-pointer" onClick={() => gotoSingle(ad._id)}>
            <p className="mt-0 mb-0 font-bold font-display">{ad.title}</p>
            <p className="m-0 text-sm">
							{ad.description ? truncateDescription(ad.description) : ""}
            </p>
          </div>
          <div className="flex gap-x-7">
            <button onClick={() => gotoEditAd(ad._id)}>
              <img className="h-7 w-6" src={pencil} alt="Edit" />
            </button>
            <button onClick={() => handleDelete(ad)}>
              <img className="h-6 w-5" src={trashbin} alt="Delete" />
            </button>
          </div>
        </div>
      ))}

			{showModal && (
				<div
					id="popup-modal"
					tabIndex="-1"
					className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
				>
					<div className="relative p-4 w-full max-w-md max-h-full">
						<div className="relative bg-peach-500 rounded-lg shadow dark:bg-gray-700">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={() => setShowModal(false)}
							>
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="p-4 md:p-5 text-center">
								<svg
									className="mx-auto mb-4 text-black-400 w-12 h-12 dark:text-gray-200"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<h3 className="mb-5 text-lg font-normal text-black-500 dark:text-gray-400">
									Möchtest du deine Anzeige{" "}
									<strong> {selectedAd?.title}</strong> wirklich unwideruflich
									löschen?
								</h3>
								<button
									onClick={confirmDelete}
									className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
								>
									Ja, ich bin sicher
								</button>
								<button
									onClick={() => setShowModal(false)}
									className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-lemon rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									Nein, abbrechen
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

      {/* <h2 className="h1 mt-6 text-center">Das hätte ich gerne: </h2>
      {interestAds.map((ad, i) => (
        <div
          className="max-w-[700px] mx-auto flex gap-4 mb-2 items-start bg-white/30 p-2 rounded-lg"
          key={i}
        >
          <div className="w-24 aspect-[3/2] relative overflow-hidden rounded-md">
            <img
              src={
                ad.media && ad.media[0] && ad.media[0][0]
                  ? ad.media[0][0]
                  : "/Images/default.png"
              }
              className="absolute top-0 left-0 w-full h-full object-cover border-2 border-red-400/60 rounded"
              alt={ad.title}
            />
          </div>
          <div className="flex-1">
            <p className="mt-0 mb-0 font-bold font-display">{ad.title}</p>
            <p className="m-0 text-sm">
              {ad.description ? truncateDescription(ad.description) : ""}
            </p>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default UserProfile;
