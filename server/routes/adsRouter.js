import { Router } from 'express';
import * as adsController from '../controller/ads.js';
import verifyToken from '../middleware/verifyToken.js';
//routes
const adsRouter = Router();
adsRouter.route('/').get(adsController.getAllAds) // get all ads by all User
//adsRouter.route('/:id').get(verifyToken, adsController.getSingleAd); // get single AD
adsRouter.route("/:id").get(adsController.getSingleAd); // get single AD
adsRouter.route('/:id').put(verifyToken, adsController.updateAd) // update Ad
adsRouter.route('/:id').delete(verifyToken, adsController.deleteAd);// delete Ad
adsRouter.route('/createAd').post(verifyToken, adsController.createAd); // create a ad
export default adsRouter;
