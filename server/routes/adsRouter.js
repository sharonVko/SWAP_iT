import { Router } from 'express';
import * as adsController from '../controller/ads.js';
import verifyToken from '../middleware/verifyToken.js';


const adsRouter = Router();
adsRouter
  .route('/')
  .get(adsController.getAllAds)
  .post(verifyToken, adsController.createAd);

adsRouter
  .route('/:id')
  .get(adsController.getSingleAd)
// .put(verifyToken, adsController.updatePost)
// .delete(verifyToken, adsController.deletePost);

export default adsRouter;