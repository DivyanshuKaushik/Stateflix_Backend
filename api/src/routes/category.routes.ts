import { Router } from "express";
import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller";
import { isEditor } from "../middlewares/auth";
import upload from "../middlewares/upload";
const router: Router = Router();

// get all category 
// GET /api/v1/category @access Public
router.get('/categories',getCategories)
// create new category 
// POST /api/v1/category @access Private Editor/Admin
router.post('/categories' ,upload.single("image"),createCategory)
// deletecategory 
// DELETE /api/v1/category @access Private Editor/Admin
router.delete('/categories/:id',isEditor,deleteCategory)

export default router;