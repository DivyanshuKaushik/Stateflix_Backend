import { Router } from "express";
import { check } from "express-validator";
import { createPost } from "../controllers/posts";
import upload from "../middlewares/upload";

const router: Router = Router();

/** create post  */
// POST /api/v1/createPost @access Private - Admin,Editor,Author
router.post("/createPost",upload.single('image'),createPost);
// [
//     check("title", "Title should be atleast 10 characters long!")
//         .isLength({ min: 10 })
//         .notEmpty(),
//     check("summary", "Summary should not be empty!").notEmpty(),
//     check("image", "Image should not be empty!").notEmpty(),
// ]
/** create post - end */

export default router;
