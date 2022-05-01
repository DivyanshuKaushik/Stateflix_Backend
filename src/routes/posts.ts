import { Router } from "express";
import { checkSchema } from "express-validator";
import { createPost, updatePost } from "../controllers/posts";
import upload from "../middlewares/upload";
import { idValidator, newPostValidator, updatePostValidator } from "../validators";

const router: Router = Router();

/** create post  */
// POST /api/v1/createPost @access Private - Admin,Editor,Author
router.post(
    "/createPost",
    upload.single("image"),
    // validation of req body through validator schema
    checkSchema(newPostValidator),
    createPost
);
/** create post - end */

/** update post  */
// POST /api/v1/createPost @access Private - Admin,Editor,Author
router.put(
    "/updatePost",
    upload.single("image"),
    // validate id to update post
    checkSchema(updatePostValidator),
    updatePost
);

/** update post - end */

/** delete post  */
// DELETE /api/v1/deletePost @access Private - Admin,Editor
router.delete(
    "/deletePost", // validate id to update post
    checkSchema(idValidator),
    createPost
);

/** delete post - end */

export default router;
