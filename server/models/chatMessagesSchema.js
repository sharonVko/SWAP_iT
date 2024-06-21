import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: [true, 'content is required'],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	attachment: {
		type: String,
	}
});

export default mongoose.model('ChatMessage', chatMessageSchema);
