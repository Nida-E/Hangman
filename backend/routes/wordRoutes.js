import express from 'express';
import { getWords, createWord } from '../controllers/wordController.js';
import auth from '../config/authMiddleware.js';

const router = express.Router();

router.get('/', getWords);
router.post('/create', auth, createWord);

export default router;
