import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'first name is required'],
		trim: true
	},
	lastname: {
		type: String,
		required: [true, 'last name is required'],
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: [true, 'username is required'],
	},
	email: {
		type: String,
		required: [true, 'email is required'],
		select: false,
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		select: false,
	},
	phone: {
		type: String,
	},
	profileimage: {
		type: String,
	},
	address: {
		street: {
			type: String,
		},
		housenumber: {
			type: String,
		},
		zip: {
			type: String,
			required: [true, 'zip code is required'],
		},
		city: {
			type: String,
			required: [true, 'city is required'],
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
	// check what to use as type in case of problems
	favorites: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ads'
	},
	creationdate: {
		type: String,
		default: Date.now,
	},
});

export default mongoose.model('User', userSchema);
