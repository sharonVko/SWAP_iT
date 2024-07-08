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

const SingleViewAd = () => {
  const [article, setArticle] = useState(null);
  const [username, setUsername] = useState(null); // State to store the username
  const { articleId } = useParams();

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
        console.log(userResponse.data); // Log the user data
        setUsername(userResponse.data.username); // Set the username state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticleAndUser();
  }, [articleId]);

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.cat_id === id);
    return category ? category.name : "Unknown Category";
  };

  let tags;

  if (article) {
    tags = article.tags.split(",");
  }

  return (
    <>
      {article && (
        <div className="mx-auto sm:flex-col max-w-2xl">
          <div className="mb-8 text-teal-700 text-center">
            <h1>{article.title}</h1>
          </div>
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
              {getCategoryNameById(parseInt(article.categories))} /{" "}
              {getCategoryNameById(parseInt(article.subCategory))}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 my-6">
            <img src={taglogo} className="size-9" />
            <p className="text-teal-700">{article.tags}</p>
          </div>

          <div className="flex flex-wrap gap-2 my-6 items-center">
            <img src={locationlogo} className="size-9" />
            <p className="text-teal-700">2.5 km entfernt</p>
          </div>

          <div className="flex flex-wrap gap-2 my-6 items-center">
            <img src={messagelogo} className="size-9 ml-2" title="Chat" />
            <p className="text-teal-700">Sende eine Nachricht an {username}</p>
            <div className="p-1 rounded-md bg-gradient-to-r from-teal-200 to-teal-500">
              <Avatar
                img="https://randomuser.me/api/portraits/men/42.jpg"
                size="sm"
                title={`Profil von ${username}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleViewAd;
