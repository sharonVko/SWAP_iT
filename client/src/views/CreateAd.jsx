import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import LoginForm from '../components/LoginForm.jsx';
import axios from 'axios';

const CreateAd = () => {
	const { isLoggedIn, userData } = useAuth();

	const [formData, setFormData] = useState({
		user_id: '',
		title: '',
		description: '',
		tradeOption: false,
		pickupaddress: {
			street: '',
			housenumber: '',
			zip: '',
			city: '',
			country: '',
		},
		categories: '',
		subCategory: '',
		tags: '',
	});

	useEffect(() => {
		if (userData && userData._id) {
			setFormData((prev) => ({
				...prev,
				user_id: userData._id,
			}));
		}
	}, [userData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.includes('pickupaddress')) {
			const [_, addressField] = name.split('.');
			setFormData((prev) => ({
				...prev,
				pickupaddress: {
					...prev.pickupaddress,
					[addressField]: value,
				},
			}));
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, tradeOption: e.target.checked });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:8000/ads/createAd',
				formData,
				{ withCredentials: true }
			);
			console.log('Ad created successfully:', response.data);
			// Reset form
			setFormData({
				user_id: '',
				title: '',
				description: '',
				tradeOption: Boolean,
				pickupaddress: {
					street: '',
					housenumber: '',
					zip: '',
					city: '',
					country: '',
				},
				categories: '',
				subCategory: '',
				tags: '',
			});
		} catch (error) {
			console.error('Error creating ad:', error);
		}
	};

	return (
		<div>
			{isLoggedIn ? (
				<div>
					<h1>Anzeige erstellen</h1>

					<div className='create-ad-form-container'>
						<form className='create-ad-form' onSubmit={handleSubmit}>
							<div>
								<label>Title:</label>
								<input
									type='text'
									name='title'
									value={formData.title}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label>Description:</label>
								<textarea
									name='description'
									value={formData.description}
									onChange={handleChange}
									required
								></textarea>
							</div>
							<div>
								<label>Trade Option:</label>
								<input
									type='checkbox'
									name='tradeOption'
									checked={formData.tradeOption}
									onChange={handleCheckboxChange}
								/>
							</div>
							<div>
								<label>Street:</label>
								<input
									type='text'
									name='pickupaddress.street'
									value={formData.pickupaddress.street}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label>House Number:</label>
								<input
									type='text'
									name='pickupaddress.housenumber'
									value={formData.pickupaddress.housenumber}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label>Zip:</label>
								<input
									type='text'
									name='pickupaddress.zip'
									value={formData.pickupaddress.zip}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label>City:</label>
								<input
									type='text'
									name='pickupaddress.city'
									value={formData.pickupaddress.city}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label>Country:</label>
								<input
									type='text'
									name='pickupaddress.country'
									value={formData.pickupaddress.country}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label>Categories:</label>
								<input
									type='text'
									name='categories'
									value={formData.categories}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label>SubCategory:</label>
								<input
									type='text'
									name='subCategory'
									value={formData.subCategory}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label>Tags:</label>
								<input
									type='text'
									name='tags'
									value={formData.tags}
									onChange={handleChange}
									required
								/>
							</div>
							<button type='submit'>Create Ad</button>
						</form>
					</div>
				</div>
			) : (
				<LoginForm target='/profile/ads/new' />
			)}
		</div>
	);
};

export default CreateAd;
