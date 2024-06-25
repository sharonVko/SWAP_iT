import { Router } from 'express';
import * as mediaController from '../controller/media.js';
import verifyToken from '../middleware/verifyToken.js';
import upload from '../services/Upload.js';

const mediaRouter = Router();
// mediaRouter
//   .post('/upload', mediaController.uploadMedia)


mediaRouter
  .route('/')
  .get(mediaController.getAllMedia)
  .post(upload.single('media_1'), mediaController.createMedia)
  .post(upload.single('media_2'), mediaController.createMedia)
  .post(upload.single('media_3'), mediaController.createMedia)
  .post(upload.single('media_4'), mediaController.createMedia)
  .post(upload.single('media_5'), mediaController.createMedia)
  .post(upload.single('media_6'), mediaController.createMedia)

mediaRouter
  .route('/:id')
  .get(mediaController.getSingleMedia)
  .put(mediaController.updateMedia)
  .delete(mediaController.deleteMedia)

export default mediaRouter;