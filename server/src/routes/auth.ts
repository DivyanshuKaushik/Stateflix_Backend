import { Router } from "express";
import { check } from "express-validator";
import { getAllUsers, getAuthenticatedUser, login, register } from "../controllers/auth";
import { isAdmin, verifyToken } from "../middlewares/auth";
import upload from "../middlewares/upload";
const router: Router = Router();

/***** user registration - starts *****/
// POST /api/v1/auth/register @access Private - Admin
router.post(
    "/auth/register",
    isAdmin,
    [
        check("email", "Enter a valid email!").isEmail().notEmpty(),
        check("password", "Password should be atleast 8 characters long!")
            .isLength({ min: 8 })
            .notEmpty(),
        check("name", "Name should be atleast 3 characters long!")
            .isLength({ min: 3 })
            .notEmpty(),
        check("phone", "Phone number should be atleast 10 characters long!")
            .isLength({ min: 10 })
            .notEmpty(),
        check("role", "Role should be atleast 3 characters long!")
            .isLength({ min: 3 })
            .notEmpty(),
    ],
    register
);
/***** user registration - ends *****/

/***** login module - start *****/
// POST /api/v1/auth/login @access Public
router.post(
    "/auth/login",
    [
        check("email", "Enter a valid email!").isEmail().notEmpty(),
        check("password", "Password should be atleast 8 characters long!")
            .isLength({ min: 8 })
            .notEmpty(),
    ],
    login
);
/***** login module - end *****/

/** get current authenticated user */
router.get('/getAuthenticatedUser',verifyToken,getAuthenticatedUser)
/** get current authenticated user - end */
/** get All users */
router.get('/users',isAdmin,getAllUsers)
export default router;