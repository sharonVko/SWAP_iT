import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

function LoginForm()
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn, checkUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) =>
  {
    e.preventDefault();
    try
    {
      const response = await axios.post(
        'http://localhost:8000/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200)
      {
        setIsLoggedIn(true);
        checkUser();
        // toast.info('Logged in');
        navigate('/');
      }
    } catch (error)
    {
      setError(error.response.data.error || 'Something went wrong');
    }
  };

  return (
    <div >
      <div >
        <h2 >Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <div >
            <label>Email:</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required

            />
          </div>
          <div >
            <label >Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

            />
          </div>
          <button type='submit'>
            Login
          </button>
        </form>
        <p>
          Not registered yet?{' '}
          <Link to='/register'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
