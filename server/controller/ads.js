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

