import {Router} from 'express';
import {createPublisher, getPublishers, deletePublisher, updatePublisher, getPublisher} from '../controllers/publisher.controller';

const router = Router();

router.post('/publisher/', createPublisher);
router.get('/publisher/', getPublishers);
router.get('/publisher/:id', getPublisher);
router.delete('/publisher/:id', deletePublisher);
router.put('/publisher/:id', updatePublisher);

export default router;
