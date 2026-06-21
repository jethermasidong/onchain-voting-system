import express from 'express';
import {insert, getAllCandidates} from '../controllers/candidateController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
const router = express.Router();

router.post('/insert-candidate', auth, adminOnly, insert);
router.get('/candidates', auth, getAllCandidates);
export default router;