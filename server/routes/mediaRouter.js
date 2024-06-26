import { Router } from 'express';
import * as mediaController from '../controller/media.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../services/Upload.js';

const mediaRouter = Router();

mediaRouter
  .route('/')
  .get(mediaController.getAllMedia)
  // .post(upload.array('media_files', 6), mediaController.createMedia); // we need verify token

  .post(verifyToken, upload.array('media_files', 6), mediaController.createMedia);

mediaRouter
  .route('/:id')
  .get(mediaController.getSingleMedia)
  .put(verifyToken, mediaController.updateMedia)
  .delete(verifyToken, mediaController.deleteMedia);

export default mediaRouter;
