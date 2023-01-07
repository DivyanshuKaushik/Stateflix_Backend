import { Router } from "express";
import { createTrendingTag, deleteTrendingTag, getAllTrendingTags } from "../controllers/trending.controller";
import { isEditor } from "../middlewares/auth";

const router: Router = Router();

// get all trending tags
// GET /api/v1/trending @access Public
router.get('/trending',getAllTrendingTags);

// create trending tag 
// POST /api/v1/trending @access Private Editor/Admin
router.post('/trending',isEditor,createTrendingTag);

// delete trending tag 
// DELETE /api/v1/trending @access Private Editor/Admin
router.delete('/trending/:id',isEditor,deleteTrendingTag);

export default router;