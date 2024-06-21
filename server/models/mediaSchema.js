import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
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
