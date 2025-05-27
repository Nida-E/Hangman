import express from 'express';
import { getWords, createWord } from '../controllers/wordController.js';
import  auth  from '../config/authMiddleware.js';
import  admin  from '../config/adminMiddleware.js';

const router = express.Router();

router.get('/', getWords);
router.post('/create', auth , admin, createWord);

export default router;
