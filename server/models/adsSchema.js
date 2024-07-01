import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
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
			// required: [true, 'zip code is required'],
		},
		city: {
			type: String,
			// required: [true, 'city is required'],
		},
		country: {
			type: String
		}
	},
	categories: {
		type: String,
		required: [true, 'categories are required'],
	},
	subCategory: {
		type: String,
		required: [true, 'subCategory are required'],
	},
	tags: {
		type: String,
		required: [true, '3 tags are required'],
		// minimnum 3 tags required
	},
	media: {
		type: mongoose.Schema.ObjectId,
		ref: 'Media'
	},
});

export default mongoose.model('Ads', adSchema);
