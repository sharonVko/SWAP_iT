import { Router } from "express";
import * as adsController from "../controller/ads.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../services/Upload.js";

const adsRouter = Router();

adsRouter.route('/')
	.get(adsController.getAllAds) // get all ads by all User

adsRouter
	.route("/createAd")
	.post(verifyToken, upload.array("media_files", 6), adsController.createAd);

adsRouter.route("/:id")
	.get(adsController.getSingleAd) 							 // get AD
	.put(verifyToken, adsController.updateAd)     // update AD
  .delete(verifyToken, adsController.deleteAd); // delete AD

export default adsRouter;
