import express from 'express';
import {addActivity, getActivityId, getAllActivity, getCountActivityUsers, getAllActivityWithUsername, getTotalCodition, getTotalbyGrade, totalGradeInWeek, deleteDataActivity} from "../controllers/activity_controller.js";

const router = express.Router();

router.post('/activity', addActivity);
router.get('/activity/:id', getActivityId);
router.get('/activity/', getAllActivity);
router.get('/activity-users/', getCountActivityUsers);
router.get('/activity-users/detail/:username', getAllActivityWithUsername);
router.get('/total-condition', getTotalCodition)
router.get('/total-grade', getTotalbyGrade)
router.get('/activity-week', totalGradeInWeek)
router.delete('/delete-activity/:id', deleteDataActivity)

export default router;