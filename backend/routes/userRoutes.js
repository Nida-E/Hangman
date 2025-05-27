import express from 'express';
import { register, login, adminRegister } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', adminRegister);

export default router;