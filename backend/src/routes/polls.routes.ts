import { Router } from "express";

const router: Router = Router();

import {
    getPolls,
    createPoll,
    getPoll,
    updatePoll,
    deletePoll,
    pollVote,
    checkVoted,
    getPollsWithVotes,
} from "../controllers/polls.controller";
import { isEditor, isReporter, isVisitor } from "../middlewares/auth";
import upload from "../middlewares/upload";

// polls crud 
router.get("/polls", getPolls);
router.get("/polls-votes", getPollsWithVotes);
router.get("/polls/:id", getPoll);
router.post("/polls",isReporter,upload.any(), createPoll);
router.put("/polls/:id",isReporter, updatePoll);
router.delete("/polls/:id",isReporter, deletePoll);

// poll votes
router.post("/polls/vote",isVisitor,pollVote);

// check if already voted 
router.get("/polls/:id/voted",isVisitor,checkVoted);

export default router;
