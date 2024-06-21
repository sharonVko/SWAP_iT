import Ads from '../models/adsSchema.js'
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

//to get all Ads 
export const getAllAds = asyncHandler(async (req, res, next) =>
{
  const ads = await Ads.find().populate('user');
  res.json(ads);
});

//get ad by id

export const getSingleAd = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;

  const ad = await Ads.findById(id).populate('user');
  if (!ad) throw new ErrorResponse(`Ad ${id} does not exist`, 404);
  res.send(ad);
});

// create a ad or post a  ad

export const createAd = asyncHandler(async (req, res, next) =>
{
  const { body, uid } = req;

  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid); // Log user ID from token
  const newAd = await Ads.create({ ...body, user: uid });
  const populatedAd = await Ads.findById(newAd._id).populate('user');
  res.status(201).json(populatedAd);
});

export const updateAd = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid,
  } = req;
  const found = await Ads.findById(id);
  if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

  if (uid !== found.user.toString())
    throw new ErrorResponse('You have no permission to update this Ad', 401);

  const updatedAd = await Ads.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('user');
  res.json(updatedAd);
});

export const deleteAd = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid,
  } = req;

  const found = await Ads.findById(id);
  if (!found) throw new ErrorResponse(`Post ${id} does not exist`, 404);

  if (uid !== found.user.toString())
    throw new ErrorResponse('You have no permission to delete this post', 401);

  await Ads.findByIdAndDelete(id, body, { new: true }).populate('user');
  res.json({ success: `Ad ${id} was deleted` });
});
