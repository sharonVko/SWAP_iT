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

  const newAd = await Ads.create({ ...body, user: uid });
  const populatedAd = await Ads.findById(newAd._id).populate('user');
  res.status(201).json(populatedAd);
});