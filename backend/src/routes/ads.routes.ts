import { Router } from "express";
import { createAds, deleteAds, getAds } from "../controllers/ads.controller";
import { isAdmin, isEditor } from "../middlewares/auth";
import upload from "../middlewares/upload";
const router: Router = Router();

// get all Ads 
// GET /api/v1/ads @access Public
router.get('/ads',getAds)

// create new Ads 
// POST /api/v1/ads @access Private Admin
router.post('/ads' ,isAdmin,upload.single("image"),createAds)

// deleteAds 
// DELETE /api/v1/ads @access Private Admin
router.delete('/ads/:id',isAdmin,deleteAds)

export default router;