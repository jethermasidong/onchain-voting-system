import express from 'express';
import {insert} from '../controllers/candidateController';
const router = express.Router();

router.post('/insert-candidate', insert);

export default router;