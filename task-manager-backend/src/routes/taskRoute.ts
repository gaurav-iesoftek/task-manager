import { Router } from 'express';
import { deleteTaskById, getTasks, postTasks, updateTasks } from '../controllers/taskController';
const router = Router();

router.get('/task', getTasks);
router.post('/task', postTasks);
router.put('/task/:id', updateTasks);
router.delete('/task/:id', deleteTaskById);

export default router;