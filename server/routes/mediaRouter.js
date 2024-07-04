import { Router } from 'express';
import * as mediaController from '../controller/media.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../services/Upload.js';

const mediaRouter = Router();

mediaRouter.route('/').get(mediaController.getAllMedia); // get al images or videos
mediaRouter.route('/:id').get(verifyToken, mediaController.getSingleMedia); // to get images and videos per Ads ( it will show all the 6 media)

mediaRouter
  .route('/')
  .post(
    verifyToken,
    upload.array('media_files', 6),
    mediaController.createMedia
  ); // to upload images and videos max 6

mediaRouter
  .route('/:id')
  .put(
    verifyToken,
    upload.array('media_files', 6),
    mediaController.updateMedia
  ); // to update images or videos

mediaRouter.route('/:id').delete(verifyToken, mediaController.deleteMedia); // to delete videos or images

export default mediaRouter;
