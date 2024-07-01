import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  user_1: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  user_2: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  ad_1: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ads',
  },
  ad_2: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ads',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Swap', swapSchema);