import ArticleList from "../components/ArticleList.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
const Home = () => {
	return (
		<div>
			<h1 className="mt-0 text-center">Top Matches</h1>

			<ArticleList/>

			<div>
				<h2 className="mt-6 text-center">Favoriten</h2>
				<HomeSwiper swiperId={1} />
			</div>
			<div>
				<h2 className="h1 mt-6 text-center">Neues aus der Umgebung</h2>
				<HomeSwiper swiperId={2}/>
			</div>


		</div>
	);
};

export default Home;
