import HomeSwiper from "../components/HomeSwiper.jsx";

const Home = () => {
	return (
		<div>
			<h1 className="mt-0 text-center">Swap Matches</h1>
			<HomeSwiper slidesPerView={3}/>
			<h1 className="mt-0 text-center">Top Matches</h1>
			<HomeSwiper/>
			<h1 className="mt-0 text-center">New Ads</h1>
			<HomeSwiper/>

		</div>
	);
};

export default Home;
