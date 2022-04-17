import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "../controllers/auth";
import { isAdmin } from "../middlewares/auth";
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
router.post('/upload',upload.single('image'),async(req:any,res:any)=>{
    try{
        res.send(req.file.originalname)
    }catch(error){
        console.error(error);
        res.status(500).json({ status: 500, error });
    }
})
export default router;