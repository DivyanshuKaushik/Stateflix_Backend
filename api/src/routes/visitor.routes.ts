import {Router} from 'express';
import { followPublisher, getFollowing } from '../controllers/visitor.controller';

const router = Router();

router.post("/follow/publisher/:id",followPublisher)

router.get("/following",getFollowing)

export default router;