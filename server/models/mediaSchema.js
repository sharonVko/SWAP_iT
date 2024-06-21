import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
	// do we need file type and name .. that will be in service/upload.js && how many (maximum) num of images or videos user can upload in advertisement.
	filename: {
		type: String,
		required: [true, 'file name is required'],
	},
	filetype: {
		type: String,
		required: [true, 'file type is required'],
	},
	url: {
		type: String,
		required: [true, 'url is required'],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Media', mediaSchema);
