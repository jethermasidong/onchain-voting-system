import express from 'express';
import {login, insert, editVoters, getAllVoters, deleteVoters} from '../controllers/voterController.js';
import {auth, adminOnly} from '../config/authMiddleware.js';
import { displayCandidates } from '../controllers/votingController.js';
const router = express.Router();

router.post('/login', login);
router.post('/insert-voter', insert);
router.post('/candidates-voting', auth, displayCandidates);
router.get('/voters', auth, getAllVoters);
router.put('/voters/edit/:id', auth, editVoters);
router.delete('/voters/:id', auth, deleteVoters);

export default router; 