import ArticleList from "../components/ArticleList.jsx";
import HomeSwiper from "../components/HomeSwiper.jsx";
import SwapSchema from "../components/SwapSchema.jsx";

const Home = () => {
  return (
    <>
      <div></div>
      <h1 className="mt-0 text-center">Top Matches</h1>
      <SwapSchema />
      <ArticleList />
      {/* <HomeSwiper />
      </div>
      <div>
        <h1 className="mt-6 text-center">Favoriten</h1>

        <HomeSwiper />
      </div>
      <div>
        <h1 className="mt-6 text-center">Neues aus der Umgebung</h1>

        <HomeSwiper />
      </div> */}
    </>
  );
};

export default Home;
