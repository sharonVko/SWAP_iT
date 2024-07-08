import { useState, useCallback, useEffect } from 'react';
import beispielfotoprofil from '../assets/beispielfotoprofil.png';
import { Label } from 'flowbite-react';
import { ReactTags } from 'react-tag-autocomplete';
import { suggestions } from '../components/Categories.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

const MIN_SELECTED_LENGTH = 3;

const UserSettings = () => {
	const { isLoggedIn, userData } = useAuth();
	const [profile, setProfile] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		street: '',
		number: '',
		zip: '',
		country: '',
		name: '',
		imageUrl: '',
	});
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [editableField, setEditableField] = useState(null);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		if (isLoggedIn && userData) {
			setProfile((prevProfile) => ({
				...prevProfile,
				firstname: userData.firstname || '',
				lastname: userData.lastname || '',
				email: userData.email || '',
				phone: userData.phone || '',
				street: userData.address?.street || '',
				number: userData.address?.housenumber || '',
				zip: userData.address?.zip || '',
				country: userData.address?.city || '',
				name: userData.username || '',
				imageUrl: userData.profileImage || beispielfotoprofil,
			}));
		}
	}, [isLoggedIn, userData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfile((prevProfile) => ({
					...prevProfile,
					imageUrl: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		setIsEditing(false);
		setEditableField(null);
		// PUT REQUEST!
		console.log('Saved profile:', profile);
	};

	const onAdd = useCallback((newTag) => {
		setSelected((prevSelected) => [...prevSelected, newTag]);
	}, []);

	const onDelete = useCallback((index) => {
		setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
	}, []);

	const isInvalid = selected.length < MIN_SELECTED_LENGTH;

	if (!isLoggedIn) {
		return <div>Please log in to access your profile.</div>;
	}

	return (
		<>
			<h1 className="text-center mb-8">Profil-Einstellungen</h1>

			<div className='bg-white/30 rounded-lg p-4 md:p-8'>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

					<div className="lg:col-span-1">
						<div className="rounded-full mx-auto h-32 w-32 ring-4 ring-peach-600 relative overflow-hidden mt-8">
							<img src={profile.imageUrl} alt='Profilbild' className="absolute top-0 left-0 w-full h-full object-cover" />
						</div>

						<div className="text-center mt-8">
							<label htmlFor='profile-image-upload' className="max-w-sm mx-auto btn-sm btn-red text-lemon-500 py-2 cursor-pointer">Profilbild ändern</label>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								className='hidden'
								id='profile-image-upload'/>
						</div>

						<div className="text-center mt-8">
							<button className="max-w-sm mx-auto btn-sm btn-red text-lemon-500 py-2 cursor-pointer">Passwort ändern</button>
						</div>

					</div>

					<div className="lg:col-span-3 text-center lg:text-left">
						<h2>Persönliche Einstellungen</h2>

						{[
							'firstname',
							'lastname',
							'email',
							'phone',
							'street',
							'number',
							'zip',
							'country',
						].map((field) => (
							<div key={field} className='mb-6'>

								<div className=''>
									{field.charAt(0).toUpperCase() + field.slice(1)}
								</div>

								<div>
									{isEditing && editableField === field ? (
										<input
											type='text'
											name={field}
											value={profile[field]}
											className=''
											onChange={handleInputChange}
											onBlur={() => setEditableField(null)}
											autoFocus
										/>
									) : (
										<div
											className='field'
											onClick={() => {
												setIsEditing(true);
												setEditableField(field);
											}}
										>
											{profile[field] || `Edit your ${field}`}
										</div>
									)}
								</div>
							</div>
						))}

						{isEditing && (
							<button
								className='btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4'
								onClick={handleSave}
							>
								Save
							</button>
						)}
					</div>
				</div>

				<div className='max-w-sm mx-auto'>
					<input
						type='file'
						accept='image/*'
						onChange={handleImageChange}
						className='hidden'
						id='profile-image-upload'
					/>
					<label
						htmlFor='profile-image-upload'
						className='max-w-sm mx-auto btn-sm btn-red text-lemon-500 py-2 mb-4'
					>
						Change your Pic
					</label>

					<h1 className='h2 text-peach-300 text-center text-3xl font-bold mt-8'>
						{profile.firstname} {profile.lastname}
					</h1>

					<div className='max-w-sm mx-auto'>
						<button className='bg-green-700 text-white rounded-lg border-peach-300 p-3 w-full mb-9 mt-9'>
							Change your Password
						</button>
					</div>

					<form className='max-w-sm mx-auto'>
						<p id='custom-validity-description'>
							Please select at least {MIN_SELECTED_LENGTH} tags:
						</p>
						<ReactTags
							ariaDescribedBy='custom-validity-description'
							ariaErrorMessage='error'
							id='custom-validity-demo'
							isInvalid={isInvalid}
							labelText='Select countries'
							onDelete={onDelete}
							onAdd={onAdd}
							selected={selected}
							suggestions={suggestions}
						/>
						{isInvalid && (
							<p id='error' style={{ color: '#fd5956' }}>
								You must select {MIN_SELECTED_LENGTH - selected.length} more tags
							</p>
						)}

						<div className='mb-2 block'>
							<Label
								className='text-2xl text-peach-300'
								htmlFor='categories'
								value='Select a Category'
							/>
						</div>
						<select
							id='cats'
							className='bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8'
						>
							<option className='bg-peach-300 text-black hover:red-100'>
								Shopping
							</option>
							<option className='bg-peach-300 focus:ring-orange-500 text-black'>
								Household
							</option>
							<option className='bg-peach-300 text-black'>Garden</option>
							<option className='bg-peach-300 text-black'>Sport</option>
						</select>
					</form>



					<form className='max-w-sm mx-auto'>
						<div className='mb-2 block'>
							<Label
								className='text-2xl text-peach-300'
								htmlFor='categories'
								value='Select a Subcategory'
							/>
						</div>
						<select
							id='subcats'
							className='bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8'
						>
							<option className='bg-peach-300 text-black hover:red-100'>
								Shopping
							</option>
							<option className='bg-peach-300 focus:ring-orange-500 text-black'>
								Household
							</option>
							<option className='bg-peach-300 text-black'>Garden</option>
							<option className='bg-peach-300 text-black'>Sport</option>
						</select>
					</form>

					<form className='max-w-sm mx-auto'>
						<div className='mb-2 block'>
							<Label
								className='text-2xl text-peach-300'
								htmlFor='categories'
								value='Select at least three Tags'
							/>
						</div>
						<select
							id='tag'
							className='bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8'
						>
							<option className='bg-peach-300 text-black hover:red-100'>
								Shopping
							</option>
							<option className='bg-peach-300 focus:ring-orange-500 text-black'>
								Household
							</option>
							<option className='bg-peach-300 text-black'>Garden</option>
							<option className='bg-peach-300 text-black'>Sport</option>
						</select>
						<select
							id='tag'
							className='bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8'
						>
							<option className='bg-peach-300 text-black hover-red-100'>
								Shopping
							</option>
							<option className='bg-peach-300 focus-ring-orange-500 text-black'>
								Household
							</option>
							<option className='bg-peach-300 text-black'>Garden</option>
							<option className='bg-peach-300 text-black'>Sport</option>
						</select>
						<select
							id='tag'
							className='bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8'
						>
							<option className='bg-peach-300 text-black hover:red-100'>
								Shopping
							</option>
							<option className='bg-peach-300 focus:ring-orange-500 text-black'>
								Household
							</option>
							<option className='bg-peach-300 text-black'>Garden</option>
							<option className='bg-peach-300 text-black'>Sport</option>
						</select>
					</form>
				</div>


			</div>
		</>
	);
};

export default UserSettings;
