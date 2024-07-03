import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  tradeOption: {
    type: Boolean,
  },
  pickupaddress: {
    street: {
      type: String,
    },
    housenumber: {
      type: String,
    },
    zip: {
      type: String,
      // required: [true, 'zip code is required'],
    },
    city: {
      type: String,
      // required: [true, 'city is required'],
    },
    country: {
      type: String,
    },
  },
  categories: {
    type: String,
    required: [true, 'categories are required'],
  },
  subCategory: {
    type: String,
    required: [true, 'subCategory are required'],
  },
  tags: {
    type: String,
    required: [true, '3 tags are required'],
    // minimum 3 tags required
  },
  preferredcats: {
    type: String, // if we want to keep it as a category_id as string or reference to taxonomies
    // ex: "1,2,3"  cat_ids
  },
  preferredSubcats: {
    type: String,
  },
  preferredtags: {
    type: String,
  },
  media: [
    {
      type: [String],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Ads', adSchema);
