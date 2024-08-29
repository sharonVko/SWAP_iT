import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
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
    required: [true, "categories are required"],
  },
  subCategory: {
    type: String,
    required: [true, "subCategory is required"],
  },
  tags: {
    type: String,
    required: [true, "3 tags are required"],
    // minimum 3 tags required
  },
	condition: {
		type: String,
		required: [true, "condition is required"],
	},
	material: {
		type: String,
		required: [true, "material is required"],
	},
	color: {
		type: String,
		required: [true, "color is required"],
	},
	diverse: {
		type: String,
	},
  media: [
    {
      type: String,
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Ads', adSchema);
