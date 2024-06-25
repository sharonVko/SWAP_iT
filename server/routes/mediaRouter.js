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
  .post(upload.array('medias', 6), mediaController.createMedia) // store media in array max 6

mediaRouter
  .route('/:id')
  .get(mediaController.getSingleMedia)
  .put(mediaController.updateMedia)
  .delete(mediaController.deleteMedia)

export default mediaRouter;

// import express from 'express';
// import { uploadMedia, createMedia, getMedia, updateMedia, deleteMedia } from '../controller/media.js'

// const router = express.Router();

// router.post('/upload', uploadMedia, createMedia);
// router.get('/:userId', getMedia);
// router.put('/:id', updateMedia);
// router.delete('/:id', deleteMedia);

// export default router;
