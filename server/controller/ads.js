import Ads from '../models/adsSchema.js'
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

//to get all Ads 

export const getAllAds = asyncHandler(async (req, res, next) =>
{
  const ads = await Ads.find().populate('user_id');
  if (!ads.length) throw new ErrorResponse('Ads not found', 404);
  res.json(ads);
});

//get ad by id

export const getSingleAd = asyncHandler(async (req, res, next) =>
{
  const { id } = req.params;

  const ad = await Ads.findById(id).populate('user_id');
  if (!ad) throw new ErrorResponse(`Ad ${id} does not exist`, 404);
  res.send(ad);
});

// create a ad or post a ad

export const createAd = asyncHandler(async (req, res, next) =>
{
  const { body, uid } = req;
  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid); // Log user ID from token
  const newAd = await Ads.create({ ...body, user: uid });
  const populatedAd = await Ads.findById(newAd._id).populate('user_id');
  res.status(201).json(populatedAd);
});

export const updateAd = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid,
  } = req;
  console.log('Request body:', body);
  console.log('User ID:', uid);
  const found = await Ads.findById(id);
  if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

  if (uid !== found.user_id.toString())
    throw new ErrorResponse('You have no permission to update this Ad', 401);

  const updatedAd = await Ads.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('user_id');
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
  if (!found) throw new ErrorResponse(`Ad ${id} does not exist`, 404);

  if (uid !== found.user_id.toString())
    throw new ErrorResponse('You have no permission to delete this post', 401);

  await Ads.findByIdAndDelete(id, body, { new: true }).populate('user_id');
  res.json({ success: `Ad ${id} was deleted` });
});