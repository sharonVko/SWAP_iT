import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	message: {
		type: String,
		required: [true, 'message is required'],
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
