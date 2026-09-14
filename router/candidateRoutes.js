import express from 'express';
import {insert, getAllCandidates, editCandidates, deleteCandidates} from '../controllers/candidateController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
const router = express.Router();

router.get('/candidates', auth, getAllCandidates);
router.post('/candidates', auth, adminOnly, insert);
router.put('/candidates/:id', auth, adminOnly, editCandidates);
router.delete('/candidates/:id', auth, adminOnly, deleteCandidates);

export default router;