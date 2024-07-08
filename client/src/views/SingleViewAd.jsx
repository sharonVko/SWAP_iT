import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleViewAd = () => {
  const { isLoggedIn, userData } = useAuth();
  const [article, setArticle] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [error, setError] = useState('');
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get Single Ad Data
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

    // Get All Chats
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

    fetchArticle();
    if (isLoggedIn) {
      fetchChats();
    }
  }, [articleId, isLoggedIn]);

  // Start New Chat
  const handleNewChat = async () => {
    const sender_user_id = userData._id; // Loggedin User
    const receiver_user_id = article.user_id; // Ad Creator

    try {
      const response = await axios.post(
        'http://localhost:8000/chats/',
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
      console.error('Error starting new chat:', error);
      setError('Error starting new chat');
    }
  };

  return (
    <div>
      <h1>Single View Ad</h1>
      {isLoggedIn && (
        <button className='btn-sm btn-red block mb-2' onClick={handleNewChat}>
          New Chat
        </button>
      )}
    </div>
  );
};

export default SingleViewAd;
