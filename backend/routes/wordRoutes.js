import express from 'express';
import { getWords, createWord } from '../controllers/wordController.js';

const router = express.Router();

router.get('/', getWords);
router.post('/create', createWord);

export default router;
