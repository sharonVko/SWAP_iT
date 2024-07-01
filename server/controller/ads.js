import Ads from '../models/adsSchema.js'
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersSchema.js'

//to get all Ads by all users
export const getAllAds = asyncHandler(async (req, res, next) =>
{
  const { uid } = req;
  const ads = await Ads.find({ user: uid }).populate('user_id');
  if (!ads.length) throw new ErrorResponse('Ads not found', 404);
  res.json(ads);
});

//get ad by id
export const getSingleAd = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;
  const { uid } = req;

  // Find the ad by its ID
  const ad = await Ads.findById(id).populate('user_id');

  // Check if the ad exists
  if (!ad) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

  // Check if the logged-in user is the one who posted the ad
  if (!ad.user_id.equals(uid)) throw new ErrorResponse('You are not authorized to view this ad', 403);
  // Send the ad data
  res.send(ad);
});


// create a ad or post a ad
export const createAd = asyncHandler(async (req, res, next) =>
{
  const { body, uid } = req;

  // Validate that the user ID (uid) matches the user associated with the ad being created
  if (body.user_id !== uid) throw new ErrorResponse('Unauthorized - User ID does not match', 401)

  // Create the ad associated with the logged-in user
  const newAd = await Ads.create({ ...body, user_id: uid });

  // Find the logged-in user and update their ads field with the new ad ID
  const user = await User.findById(uid);
  if (!user) throw new ErrorResponse('User not found', 404);

  // Update user's ads field with the new ad ID
  user.ads.push(newAd._id);
  await user.save();

  // Populate the user_id field in the ad before sending the response
  const populatedAd = await Ads.findById(newAd._id).populate('user_id');

  // Return the populated ad in the response
  res.status(201).json(populatedAd);
});

// update a ad
export const updateAd = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid,
  } = req;

  console.log('Request body:', body);
  console.log('User ID:', uid);

  // Check if the ad exists
  const found = await Ads.findById(id);
  if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);


  // Ensure that only the ad owner can update the ad
  if (uid !== found.user_id.toString()) throw new ErrorResponse('Unauthorized - You have no permission to update this Ad', 401);

  // Update the ad
  const updatedAd = await Ads.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('user_id');

  // Find the logged-in user and update their ads field if necessary
  const user = await User.findById(uid);
  if (!user) throw new ErrorResponse('User not found', 404);

  // Check if the ad ID is already in the user's ads array
  const adIndex = user.ads.findIndex(ad => ad.equals(updatedAd._id));
  if (adIndex === -1)
  {
    // If the ad ID is not in the user's ads array, add it
    user.ads.push(updatedAd._id);
    await user.save();
  }
  // Return the updated ad
  res.json(updatedAd);

});

//delete ad by id
// export const deleteAd = asyncHandler(async (req, res, next) =>
// {
//   const {
//     body,
//     params: { id },
//     uid,
//   } = req;

//   const found = await Ads.findById(id);
//   if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

//   if (uid !== found.user_id.toString())
//     throw new ErrorResponse('You have no permission to delete this post', 401);

//   await Ads.findByIdAndDelete(id, body, { new: true }).populate('user_id');
//   res.json({ success: `Ad ${id} was deleted` });
// });

export const deleteAd = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, uid } = req;

  // Find the ad by ID
  const found = await Ads.findById(id);
  if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

  // Check if the logged-in user is the owner of the ad
  if (uid !== found.user_id.toString()) throw new ErrorResponse('You have no permission to delete this post', 401);

  // Delete the ad
  await Ads.findByIdAndDelete(id);

  // Remove the reference to this ad from the user's ads array
  await User.findByIdAndUpdate(uid, {
    $pull: { ads: id }
  });

  res.json({ success: `Ad ${id} was deleted` });
});