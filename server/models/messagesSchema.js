import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chat',
		required: [true, 'chat id is required']
	},
	sender_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	message: {
		type: String,
		required: [true, 'message is required'],
	},
	ad_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'Ads',
		required: [true, "ad required"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	}
	// nice to have
	// attachment: {
	// 	type: String,
	// }
});

export default mongoose.model('Message', messageSchema);
