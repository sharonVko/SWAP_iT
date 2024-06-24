import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'first name is required']
	},
	lastname: {
		type: String,
		required: [true, 'last name is required']
	},
	username: {
		type: String,
		unique: true,
		required: [true, 'username is required']
	},
	email: {
		type: String,
		required: [true, 'email is required']
	},
	password: {
		type: String,
		required: [true, 'password is required']
	},
	phone: {
		type: String
	},
	profileimage: {
		type: String
	},
	address: {
		street: {
			type: String
		},
		housenumber: {
			type: String
		},
		zip: {
			type: String,
			required: [true, 'zip code is required']
		},
		city: {
			type: String,
			required: [true, 'city is required']
		},
		country: {
			type: String
		}
	},
	preferredcats: {
		type: mongoose.Schema.ObjectId,
		ref: 'Taxonomies'
	},
	preferredtags: {
		type: mongoose.Schema.ObjectId,
		ref: 'Taxonomies'
	},
	//check what to use as type in case of problems
	favorites: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ads'
	},
	// we have already over preffered cats and tags... fields
	interestedCategories: {
		type: Array,
		required: [true, 'interested category is required'],
	},
	creationdate: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('User', userSchema);
