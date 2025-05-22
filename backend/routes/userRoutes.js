import express from 'express';
import { register } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', register);
// Добавим login, getUser и т.д.fdkshfhsdf
export default router;