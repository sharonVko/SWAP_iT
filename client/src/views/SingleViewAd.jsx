import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleViewAd = () => {
  const { isLoggedIn, userData } = useAuth();
  const [article, setArticle] = useState(null);
  const [chatData, setChatData] = useState([]);
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/ads/${articleId}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/chats/', {
          withCredentials: true,
        });
        setChatData(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchArticle().then();
    fetchChats().then();
  }, [articleId, setChatData]);

  const handleNewChat = async () => {
    // create new chat
    // Ad_Id
    // receiver_user_id = ad creator
    // sender_user_id => loggedin user
    // return a chatId

    const sender_user_id = userData._id; // Loggedin User
    const receiver_user_id = article.user_id; // Ad Creator

    console.log(sender_user_id, receiver_user_id);

    try {
      const response = await axios.post(
        'http://localhost:8000/chats/',
        {
          participants: [sender_user_id, receiver_user_id],
          ad_id: article._id,
        },
        { withCredentials: true }
      );

      console.log(response);
      //setChatData(prevChatData => [...prevChatData, response.data]);
    } catch (error) {
      console.error('Error starting new chat:', error);
    }

    console.log(chatData);

    //navigate(`/singlechat/${chatData[0]._id}`);
  };

  console.log(isLoggedIn);

  return (
    <div>
      <h1>Single View Ad</h1>
      <button className='btn-sm btn-red block mb-2' onClick={handleNewChat}>
        New Chat
      </button>
      {/*<button className="btn-sm btn-red block mb-2">Open Chat</button> */}
    </div>
  );
};
export default SingleViewAd;
