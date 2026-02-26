import express from 'express';
import {login} from '../controllers/voterController.js';
const router = express.Router();

router.post('/login', login);

export default router;