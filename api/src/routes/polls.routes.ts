import { Router } from "express";

const router: Router = Router();

import {
    getPolls,
    createPoll,
    getPoll,
    updatePoll,
    deletePoll,
} from "../controllers/polls.controller";

router.get("/polls", getPolls);
router.post("/polls", createPoll);
router.get("/polls/:id", getPoll);
router.put("/polls/:id", updatePoll);
router.delete("/polls/:id", deletePoll);

export default router;
