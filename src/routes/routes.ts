import { Router } from 'express';
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../controllers/task-controller';
import {
  getTaskList,
  getTaskLists,
  createTaskList,
  updateTaskList,
  deleteTaskList,
} from '../controllers/task-list-controller';
import { addTaskToList, removeTaskFromList } from '../controllers/task-order-controller';

const routes = Router();

// task-list routes
routes.get('/task-list/:id', getTaskList);
routes.get('/task-list', getTaskLists);
routes.post('/task-list', createTaskList);
routes.patch('/task-list/:id', updateTaskList);
routes.delete('/task-list/:id', deleteTaskList);

// task routes
routes.get('/task/:id', getTask);
routes.get('/task', getTasks);
routes.post('/task', createTask);
routes.patch('/task/:id', updateTask);
routes.delete('/task/:id', deleteTask);

// task-order routes
routes.post('/add-task', addTaskToList);
routes.post('/remove-task', removeTaskFromList);

export default routes;
