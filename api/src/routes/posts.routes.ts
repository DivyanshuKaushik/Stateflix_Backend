import { Router } from "express";
import { checkSchema } from "express-validator";
import {
    createPost,
    deletePost,
    getIndexPosts,
    getPost,
    getPosts,
    getPostsByCategory,
    getUnpublishedPosts,
    getUserPosts,
    updatePost,
    updatePostStatus,
} from "../controllers/posts.controller";
import { isEditor, isReporter } from "../middlewares/auth";
import upload from "../middlewares/upload";
import validateRequest from "../middlewares/validateRequest";
import {
    categoryValidator,
    idValidator,
    newPostValidator,
    updatePostValidator,
    updateStatusValidator,
    userIdValidator,
} from "../validators";

const router: Router = Router();

/** create post  */
// POST /api/v1/createPost @access Private - Admin,Editor,Author
router.post(
    "/createPost",
    isReporter,
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
    isReporter,
    upload.single("image"),
    // validate id to update post
    checkSchema(updatePostValidator),
    validateRequest,
    // controller
    updatePost
);

/** update post - end */

/** update post status */
// PATCH /api/v1/updatePostStatus @access Private - Admin,Editor
router.patch(
    "/updatePostStatus/:id/:status",
    isEditor,
    // checkSchema(updateStatusValidator),
    // validateRequest,
    updatePostStatus
);
/** update post status - end*/

/** delete post  */
// DELETE /api/v1/deletePost/id @access Private - Admin,Editor
router.delete(
    "/deletePost/:id",
    isEditor,
    // validate id to update post
    checkSchema(idValidator),
    deletePost
);
/** delete post - end */

/** get methods to fetch articles - Private APIs */
// GET /api/v1/posts/unpublished @access Private - Editor,Admin
router.get("/posts/unpublished", isEditor, getUnpublishedPosts);

// GET /api/v1/getUserPosts @access Private - Editor,Admin,Reporter
router.get(
    "/posts/user/:user",
    isReporter,
    checkSchema(userIdValidator),
    validateRequest,
    getUserPosts
);
/** get methods to fetch articles - end Private APIs */

/** get methods to fetch articles - Public APIs */
// GET /api/v1/posts | /api/v1/posts?page=?&limit=?  @access Public
router.get("/posts", getPosts);

// // GET /api/v1/getPostsByCategory?category=? | /api/v1/getPostsByCategory?category=?&page=?&limit=?  @access Public
// router.get(
//     "/getPostsByCategory",
//     checkSchema(categoryValidator),
//     validateRequest,
//     getPostsByCategory
// );

// GET /api/v1/getArticle @access Public
router.get("/posts/:id", checkSchema(idValidator), validateRequest, getPost);

// GET /api/v1/allPosts @access Public
router.get('/allPosts',getIndexPosts)

/** get methods to fetch articles - end */

export default router;
