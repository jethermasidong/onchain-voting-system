import express from 'express';
import { auth, adminOnly } from '../config/authMiddleware.js';
import { deletePosition, editPosition, getAllPositions, insertPosition } from '../controllers/positionController.js';
const router = express.Router();



router.post('/positions', auth, adminOnly, insertPosition);
router.get('/positions', auth, adminOnly, getAllPositions);
router.put('/positions/:id', auth, adminOnly, editPosition);
router.delete('/positions/:id', auth, adminOnly, deletePosition);



export default router;