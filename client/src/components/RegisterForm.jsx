import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm()
{
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipCode] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) =>
  {
    e.preventDefault();
    try
    {
      const response = await axios.post(
        'http://localhost:8000/users/register',
        {
          // firstName,
          // lastName,
          username,
          email,
          password,
          address: {
            zip: zipcode
          }
        },
        { withCredentials: true }
      );

      if (response.status === 201)
      {
        toast.success('Successfully registered! Welcome');
        navigate('/login');
      }
    } catch (error)
    {
      // console.error(error);
      toast.error(error.response.data.error || 'Registration failed');
    }
  };

  return (
    <div>
      <div >
        <h2 >Register</h2>
        <form onSubmit={handleRegister}>

          <div className='mb-4'>
            <label className='mb-2 block'>Username:</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='border rounded w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <label className='mb-2 block'>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required

            />
          </div>
          <div className='mb-4'>
            <label className='mb-2 block'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

            />
            {/* validation */}
          </div>
          <div className='mb-4'>
            <label className='mb-2 block'>Zip Code:</label>
            <input
              type='text'
              value={zipcode}
              onChange={(e) => setZipCode(e.target.value)}
              required

            />
          </div>
          <button
            type='submit'

          >
            Register
          </button>
        </form>
        <p >
          Already havean account?{' '}
          <Link to='/login' >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;


// <div >
// <label >First Name:</label>
// <input
//   type='text'
//   value={firstName}
//   onChange={(e) => setFirstName(e.target.value)}
//   required
//   className='border rounded w-full p-2'
// />
// </div>
// <div className='mb-4'>
// <label className='mb-2 block'>Last Name:</label>
// <input
//   type='text'
//   value={lastName}
//   onChange={(e) => setLastName(e.target.value)}
//   required
//   className='border rounded w-full p-2'
// />
// </div>