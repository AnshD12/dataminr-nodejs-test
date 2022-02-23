import { Request, Response } from 'express';
import { PoolClient } from 'pg';

import pool from '../config/db';
import { logger } from '../utilities/logger';

const addTaskToList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId, taskListId } = req.body;
    const taskOrderValues = [taskListId, taskId];
    const taskOrderQuery: string = 'INSERT INTO task_order(task_list_id, task_id) VALUES($1, $2) RETURNING *;';
    const client: PoolClient = await pool.connect();
    await client.query(taskOrderQuery, taskOrderValues);
    res.status(201).send({ message: 'task added to task list' });
  } catch (error) {
    logger.log(error);
    if (error.code === '23505') {
      res.status(400).send({ message: 'task already added to the list' });
    }
    res.status(400).send(error);
  }
};

const removeTaskFromList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId, taskListId } = req.body;
    const values = [taskListId, taskId];
    const query = 'DELETE FROM task_order WHERE task_list_id = $1 AND task_id = $2 RETURNING *;';
    const client: PoolClient = await pool.connect();
    await client.query(query, values);
    res.status(200).send({ message: 'task removed successfully from the list' });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export {
  addTaskToList,
  removeTaskFromList,
};
