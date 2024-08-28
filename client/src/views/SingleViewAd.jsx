import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "flowbite-react";
import { Avatar } from "flowbite-react";
import messagelogo from "../assets/messagelogo.png";
import taglogo from "../assets/taglogo.png";
import folderlogo from "../assets/folderlogo.png";
import locationlogo from "../assets/locationlogo.png";
import { Button } from "flowbite-react";
import { categories } from "../utils/categories"; // Make sure to use the correct path to your categories.js file
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SingleViewAd = () => {
  const [article, setArticle] = useState(null);
  const [username, setUsername] = useState(null); // State to store the username
  const [chatData, setChatData] = useState([]);
  const [error, setError] = useState("");
  const { isLoggedIn, userData } = useAuth();
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleAndUser = async () => {
      try {
        // Fetch the article details
        const articleResponse = await axios.get(
          `http://localhost:8000/ads/${articleId}`
        );
        console.log(articleResponse.data); // Log the article data
        setArticle(articleResponse.data);

        // Fetch user details based on the user_id from the article data
        const userResponse = await axios.get(
          `http://localhost:8000/users/${articleResponse.data.user_id}`
        );
        // console.log(userResponse.data); // Log the user data
        setUsername(userResponse.data.username); // Set the username state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchArticleAndUser();
  }, [articleId]);

  // Start New Chat
  const handleNewChat = async () => {
    const sender_user_id = userData._id; // Logged-in User
    const receiver_user_id = article.user_id; // Ad Creator
    try {
      const response = await axios.post(
        "http://localhost:8000/chats/",
        {
          participants: [sender_user_id, receiver_user_id],
          messages: [],
          ad_id: article._id,
        },
        { withCredentials: true }
      );
      setChatData((prevChatData) => [...prevChatData, response.data]);
      navigate(
        `/singlechat/${response.data._id}/${article._id}/${receiver_user_id}`
      );
    } catch (error) {
      console.error("Error starting new chat:", error);
      setError("Error starting new chat");
    }
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.cat_id === id);
    return category ? category.name : "Unknown Category";
  };

  let tags;
  if (article) {
    tags = article.tags.split(",");
  }

  return (
    <div>
      {article && (
        <div className="mx-auto sm:flex-col max-w-2xl p-4">
          <div className="mb-8 text-teal-700 text-center">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          </div>
					{article.media.length > 0 &&
						<div className="mx-auto max-w-2xl h-96 rounded-lg overflow-hidden shadow-lg mb-8">
							<Carousel slide={false}>
								{article.media.map((image, index) => (
									<img
										className="h-full w-full object-contain"
										src={image}
										alt="..."
										key={index}
									/>
								))}
							</Carousel>
						</div>
					}
          <div className="w-96 mt-8 mb-14 mx-auto">
            <p className="text-teal-700 text-lg leading-relaxed">
              {article.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 my-6 items-center">
            <img src={folderlogo} className="size-9" title="Kategorie" />
            <p className="text-teal-700 bg-green-400/40 px-3 py-1 rounded-full">
              {getCategoryNameById(parseInt(article.categories))}
            </p>
            <p className="text-teal-700 bg-green-400/30 px-3 py-1 rounded-full">
              {" "}
              {getCategoryNameById(parseInt(article.subCategory))}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 my-6 items-center">
            <img src={taglogo} className="size-9" />
            {tags &&
              tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-teal-700 bg-teal-300/30 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap gap-2 my-6 items-center">
            <img src={locationlogo} className="size-9" />
            <p className="text-teal-700 text-lg">2.5 km entfernt</p>
          </div>
          {isLoggedIn && (
            <div
              className="flex flex-wrap gap-4 my-6 p-4 rounded-lg"
              gradientDuoTone="greenToBlue"
            >
              {article.user_id !== userData._id ? (
                <>
                  <Button
                    gradientDuoTone="greenToBlue"
                    className="border-2 border-teal-500 text-teal-700"
                    onClick={handleNewChat}
                  >
                    Nachricht
                  </Button>
                  <p className="text-teal-700 text-lg mr-1">
                    an{" "}
                    <span className="font-bold text-xl underline ml-1">
                      {username}
                    </span>
                  </p>
                  <div className="p-1 rounded-md bg-gradient-to-r from-teal-200 to-teal-700">
                    <Avatar
                      img="https://randomuser.me/api/portraits/men/42.jpg"
                      size="sm"
                      title={`Profil von ${username}`}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleViewAd;
