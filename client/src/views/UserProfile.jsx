import { useAuth } from '../context/AuthProvider.jsx';

function UserProfile() {
	const { isLoggedIn, userData } = useAuth();

	if (!isLoggedIn) {
		return <div>Please log in to access your profile.</div>;
	}

	return (
		<div>
			User Profile
		</div>
	)
}

export default UserProfile;
