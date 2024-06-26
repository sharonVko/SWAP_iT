import mongoose from 'mongoose';

const chatsSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	receiver: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	ad_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ads',
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Chat', chatsSchema);
