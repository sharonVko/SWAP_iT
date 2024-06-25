import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
	// do we need file type and name .. that will be in service/upload.js && how many (maximum) num of images or videos user can upload in advertisement.
	// filename: {
	// 	type: String,
	// 	required: [true, 'file name is required'],
	// },
	// filetype: {
	// 	type: String,
	// 	required: [true, 'file type is required'],
	// },
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		// required: true,
	},
	media_1: {
		type: String,
	},
	// media_2: {
	// 	type: String,
	// },
	// media_3: {
	// 	type: String,
	// },
	// media_4: {
	// 	type: String,
	// },
	// media_5: {
	// 	type: String,
	// },
	// media_6: {
	// 	type: String,
	// },
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

// const mediaSchema = new mongoose.Schema({
// 	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// 	mediaType: { type: String, enum: ['image', 'video'], required: true },
// 	mediaPath: { type: String, required: true },
// 	uploadedAt: { type: Date, default: Date.now }
// });

export default mongoose.model('Media', mediaSchema);
