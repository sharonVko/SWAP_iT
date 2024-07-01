import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  email_type: {
    type: String,
    required: [true, 'Email type is required'],

  },
  //not sure about template
  template: {
    type: String,

  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Notification', notificationSchema);