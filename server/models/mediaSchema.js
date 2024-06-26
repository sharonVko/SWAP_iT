import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	media_files: [
		{
			type: String,
			required: true,
		}
	],
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Media', mediaSchema);
