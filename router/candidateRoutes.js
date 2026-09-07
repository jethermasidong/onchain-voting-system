import express from 'express';
import {insert, getAllCandidates} from '../controllers/candidateController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
const router = express.Router();

router.get('/candidates', auth, getAllCandidates);
router.post('/candidate', auth, adminOnly, insert);

export default router;