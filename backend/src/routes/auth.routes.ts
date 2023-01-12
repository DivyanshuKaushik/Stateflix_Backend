import { Router,Request,Response } from "express";
import { check } from "express-validator";
import passport from "../passport";
import { changePassword, deleteUser, getAllUsers, getAuthenticatedUser, login, register } from "../controllers/auth.controller";
import { isAdmin, verifyToken } from "../middlewares/auth";

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

// DELETE /users/:id @access Private - Admin
router.delete("/users/:id", isAdmin, deleteUser);

// PATCH /users/changePassword @access Private 
router.patch("/users/changePassword",verifyToken, changePassword);


/** google login for visitors - start */
router.get("/auth/google/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			data: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/auth/google/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

const scopes : string[] = ["profile", "email"]

router.get("/auth/google", passport.authenticate("google", { scope: scopes,session: true }));

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.STATEFLIX_CLIENT_URI,
		failureRedirect: "/auth/google/login/failed",
        session: true
	})
);

router.get("/auth/google/logout",async (req:Request, res:Response) => {
	req.logout((err:any) => console.error(err));
    // req.session.destroy((err)=>err)
    res.json({message:"logged out"})
	// res.redirect(process.env.STATEFLIX_CLIENT_URI as string);
});
/** google login for visitors - end */

export default router;