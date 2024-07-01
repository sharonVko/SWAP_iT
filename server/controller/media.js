import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Media from '../models/mediaSchema.js';
import User from '../models/usersSchema.js';
import Ads from '../models/adsSchema.js'

// get all images and videos
export const getAllMedia = asyncHandler(async (req, res, next) =>
{
  const media = await Media.find().populate('user_id');
  if (!media.length) throw new ErrorResponse('Media not found', 404);
  res.json(media);
});

// get all images and videos pro Ad
export const getSingleMedia = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;
  const media = await Media.findById(id).populate('user_id');
  if (!media) throw new ErrorResponse(`Media ${id} does not exist`, 404);
  res.send(media);
});

// To upload images or videos
export const createMedia = asyncHandler(async (req, res, next) =>
{
  const { body, uid } = req;
  const { ad_id } = body;
  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid);
  console.log('Ad ID:', ad_id);

  // Check if the user is logged in
  const user = await User.findById(uid);
  if (!user) throw new ErrorResponse('User not found', 404);

  // Check if the ad exists and belongs to the logged-in user
  const ad = await Ads.findById(ad_id);
  if (!ad) throw new ErrorResponse('Ad not found', 404);
  if (!ad.user_id === uid) throw new ErrorResponse('Unauthorized - This ad does not belong to you', 403);


  // Upload media files
  const media_files = req.files.map(file => file.path);

  // Create new media entry
  const newMedia = await Media.create({ user_id: uid, ad_id: ad_id, media_files });

  // Update the ad with the new media ID
  ad.media.push(newMedia._id);
  await ad.save();

  res.status(201).json(newMedia);
});


// update media
export const updateMedia = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, body, uid } = req;
  console.log('Request body:', body);
  console.log('User ID:', uid);

  // Check if the user is logged in
  const user = await User.findById(uid);
  if (!user) throw new ErrorResponse('User not found', 404);

  // Find the media by ID
  const foundMedia = await Media.findById(id);
  if (!foundMedia) throw new ErrorResponse(`Media ${id} does not exist`, 404);

  // Check if the user owns the media
  if (!foundMedia.user_id.equals(uid)) throw new ErrorResponse('You do not have permission to update this media', 401);


  // Check if the ad associated with the media belongs to the logged-in user
  const ad = await Ads.findById(foundMedia.ad_id);
  if (!ad) throw new ErrorResponse('Ad not found', 404);
  if (!ad.user_id.equals(uid)) throw new ErrorResponse('You do not have permission to update media for this ad', 403);


  // Upload new media files if provided
  const media_files = req.files.map(file => file.path);

  // Update the media entry
  const updatedMedia = await Media.findByIdAndUpdate(
    id,
    { ...body, user_id: uid, media_files },
    { new: true }
  ).populate('user_id');

  // Update the ad's media field if it's not already included
  if (!ad.media.includes(updatedMedia._id))
  {
    ad.media.push(updatedMedia._id);
    await ad.save();
  }
  res.json(updatedMedia);
});


// delete All images and videos pro Ad

export const deleteMedia = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, uid } = req;

  // Find the media by ID
  const found = await Media.findById(id);
  if (!found) throw new ErrorResponse(`Media ${id} does not exist`, 404);

  // Check if the logged-in user is the owner of the media
  if (uid !== found.user_id.toString()) throw new ErrorResponse('You have no permission to delete this media', 401);

  // Delete the media
  await Media.findByIdAndDelete(id);

  // Remove the reference to this media from the corresponding ad
  await Ads.findByIdAndUpdate(found.ad_id, {
    $pull: { media: id }
  });

  res.json({ success: `Media ${id} was deleted` });
});