import "./css/ProfileView.css";
import ArticleCard from "./ArticleCard";

const ProfileView = () => {
  return (
    <div>
      <div className="content">
        <div>
          <p>DAS GEBE ICH AB</p>
          <img src="/image3.jpg" alt="Image 3" />
          <img src="/image4.jpg" alt="Image 4" />
        </div>
        <div>
          <p>DAS HATTE ICH GERNE</p>
          <img src="/image5.jpg" alt="Image 5" />
        </div>
      </div>
      <div className="top-matches">
        <p>TOP 5 SWAP MATCHES:</p>

        <div>
          <ArticleCard
            article={{
              image: "image1.jpg",
              user_id: { username: "User 1" },
              tradeOption: true,
            }}
          />
          <img src="/image7.jpg" alt="Image 7" />
          <img src="/image8.jpg" alt="Image 8" />
          <img src="/image9.jpg" alt="Image 9" />
        </div>
      </div>
      <button className="create-ad">
        <img src="/camera.svg" alt="Camera" />
        <p>+ Anzeige erstellen</p>
      </button>
    </div>
  );
};

export default ProfileView;
