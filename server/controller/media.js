import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Media from '../models/mediaSchema.js';

export const getAllMedia = asyncHandler(async (req, res, next) =>
{
  const media = await Media.find().populate('user_id');
  if (!media.length) throw new ErrorResponse('Media not found', 404);
  res.json(media);
});

export const getSingleMedia = asyncHandler(async (req, res, next) =>
{
  const id = req.params.id;
  const media = await Media.findById(id).populate('user_id');
  if (!media) throw new ErrorResponse(`Media ${id} does not exist`, 404);
  res.send(media);
});

// To upload images or videos
export const createMedia = asyncHandler(async (req, res, next) =>
{
  const { uid } = req.body;
  const media_files = req.files.map(file => file.path);

  const newMedia = await Media.insertMany({ media_files });
  const populatedMedia = await Media.findById(newMedia._id).populate('user_id');
  res.status(201).json(populatedMedia);
});

export const updateMedia = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, uid, body } = req;
  const found = await Media.findById(id).populate('user_id');
  if (!found) throw new ErrorResponse(`Media ${id} does not exist`, 404);
  if (uid !== found.user_id.toString())
    throw new ErrorResponse('You have no permission to update this Media', 401);
  const updatedMedia = await Media.findByIdAndUpdate(id, body, { new: true }).populate('user_id');
  res.json(updatedMedia);
});

export const deleteMedia = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, uid } = req;
  const found = await Media.findById(id);
  if (!found) throw new ErrorResponse(`Media ${id} does not exist`, 404);
  if (uid !== found.user_id.toString())
    throw new ErrorResponse('You have no permission to delete this Media', 401);
  await Media.findByIdAndDelete(id);
  res.json({ success: `Media ${id} was deleted` });
});
