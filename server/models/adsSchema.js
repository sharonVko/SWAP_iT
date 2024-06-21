import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
	},
	tradeOption: {
		type: Boolean,
	},
	pickupaddress: {
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
	media: {
		type: mongoose.Schema.ObjectId,
		ref: 'Media'
	},
});

export default mongoose.model('Book', adSchema);
