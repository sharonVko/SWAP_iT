import mongoose from 'mongoose';

const chatsSchema = new mongoose.Schema({
	// sender: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// },
	// receiver: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// },
	participants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, "sender and receiver required"],
	}],
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}],
	ad_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ads',
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Chat', chatsSchema);
