import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Media from '../models/mediaSchema.js';

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
  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid);

  const media_files = req.files.map(file => file.path);

  const newMedia = await Media.insertMany({ ...body, user: uid, media_files });
  // const populatedMedia = await Media.findById(newMedia._id).populate('user_id');
  // res.status(201).json(populatedMedia); // Onur's solution
  res.status(201).json(newMedia);
});


// update media
export const updateMedia = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, body, uid } = req;
  console.log('Request body:', body);
  console.log('User ID:', uid);

  const found = await Media.findById(id);
  if (!found) throw new ErrorResponse(`media ${id} does not exist`, 404);
  if (uid !== found.user_id.toString())
    throw new ErrorResponse(`You have no permission to update this Media`, 401);

  const media_files = req.files.map(file => file.path);

  const updatedMedia = await Media.findByIdAndUpdate(id, { ...body, user: uid, media_files }, { new: true }).populate('user_id');
  res.json(updatedMedia);
});

// delete All images and videos pro Ad
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
