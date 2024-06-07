import express from 'express';
import { setCalibration, getCalibration, updateCalibration } from '../controllers/calibration.js';

const router = express.Router();

router.post('/calibration', setCalibration);
router.get('/calibration/:id_user', getCalibration);
router.patch('/calibration/:id', updateCalibration);

export default router;