import { Router } from "express";
import { checkSchema } from "express-validator";
import { createPost, deletePost, updatePost } from "../controllers/posts";
import upload from "../middlewares/upload";
import validateRequest from "../middlewares/validateRequest";
import { idValidator, newPostValidator, updatePostValidator } from "../validators";

const router: Router = Router();

/** create post  */
// POST /api/v1/createPost @access Private - Admin,Editor,Author
router.post(
    "/createPost",
    upload.single("image"),
    // validation of req body through validator schema
    checkSchema(newPostValidator),
    validateRequest,
    // controller
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
    validateRequest,
    // controller 
    updatePost
);

/** update post - end */

/** delete post  */
// DELETE /api/v1/deletePost/id @access Private - Admin,Editor
router.delete(
    "/deletePost/:id", // validate id to update post
    checkSchema(idValidator),
    deletePost
);
/** delete post - end */

/** get all articles */
// router.get('/getAllArticles', (req: Request, res: Response) => {})
/** get all articles - end */

export default router;
