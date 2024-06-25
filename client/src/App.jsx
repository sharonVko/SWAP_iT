import {categories} from "./utils/categories.js";
import {users} from "./utils/users.js";
import {ads} from "./utils/ads.js";

function App() {

	const getCategories = (id = 0) => {
		return categories.filter(category => {
			if (category.parent === id) {
				return category;
			}
		})
	}
	//const maincats = getCategories();

	const getUserById = (id) => {
		return users.find((user) => user.user_id === id);
	}

	const myads = ads.map(ad => {

		let adId = ad.ad_id;
		let adUserid = ad.user_id;
		let adUserName = getUserById(ad.user_id).name;
		let adCat = ad.ad_cat;

		let interestedUsers = users.filter(user => {
			return user.user_cats === adCat;
		});

		return {
			adId: adId,
			adCat: adCat,
			adUserid: adUserid,
			adUserName: adUserName,
			interestedUsers: interestedUsers
		}

	});



	console.log(myads);
	//console.log(users);

	return (
    <>
      <h1>Alle Ads</h1>
			{ads.map((ad, i) => (<p key={i}>{ad.ad_id}</p>))}
    </>
  );
}

export default App;
