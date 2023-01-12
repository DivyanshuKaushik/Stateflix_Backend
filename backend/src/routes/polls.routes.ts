import { Router } from "express";

const router: Router = Router();

import {
    getPolls,
    createPoll,
    getPoll,
    updatePoll,
    deletePoll,
} from "../controllers/polls.controller";
import upload from "../middlewares/upload";

router.get("/polls", getPolls);
router.post("/polls",upload.any(), createPoll);
router.get("/polls/:id", getPoll);
router.put("/polls/:id", updatePoll);
router.delete("/polls/:id", deletePoll);

export default router;
