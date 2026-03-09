import express from 'express';
import {login, insert} from '../controllers/voterController.js';
const router = express.Router();

router.post('/login', login);
router.post('/insert-voter', insert)

export default router;