import express from 'express';
import {login, insert} from '../controllers/voterController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
import { displayCandidates } from '../controllers/votingController.js';
const router = express.Router();

router.post('/login', login);
router.post('/insert-voter', auth, adminOnly, insert);
router.post('/candidates', auth, displayCandidates);

export default router;