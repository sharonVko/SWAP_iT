import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required: [true, 'first name is required']
  },
  lastname: {
    type: String,
    // required: [true, 'last name is required']
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    //select: false,
    required: [true, "Email is required"],
    unique: true, // Ensure the email is unique
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ], // Regular expression to validate email format
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  phone: {
    type: String,
  },
  profileimage: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    housenumber: {
      type: String,
    },
    zip: {
      type: String,
      required: [true, "zip code is required"],
    },
    city: {
      type: String,

      // required: [true, 'city is required']
    },
    country: {
      type: String,
    },
  },
  preferredcats: {
    type: String, // if we want to keep it as a category_id as string or reference to taxonomies
    //ex: "1,2,3"  cat_ids
    default: "",
  },
  preferredSubcats: {
    type: String,
    default: "",
  },
  preferredtags: {
    type: String,
    default: "",
  },
  favorites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Ads",
    },
  ],
  ads: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Ads",
    },
  ],
  creationdate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
