import { Router } from "express";
import { createCategory, deleteCategory, getCategories } from "../controllers/category";
import { isEditor } from "../middlewares/auth";
const router: Router = Router();

// get all category 
// GET /api/v1/category @access Public
router.get('/category',getCategories)
// create new category 
// POST /api/v1/category @access Private Editor/Admin
router.post('/category',isEditor,createCategory)
// deletecategory 
// DELETE /api/v1/category @access Private Editor/Admin
router.delete('/category/:id',isEditor,deleteCategory)

export default router;