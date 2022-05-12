import { Router } from "express";
import { createCategory, deleteCategory, getCategories } from "../controllers/category";
const router: Router = Router();

// get all category 
// GET /api/v1/category @access Public
router.get('/category',getCategories)
// create new category 
// POST /api/v1/category @access Private Editor/Admin
router.post('/category',createCategory)
// deletecategory 
// DELETE /api/v1/category @access Private Editor/Admin
router.delete('/category/:id',deleteCategory)

export default router;