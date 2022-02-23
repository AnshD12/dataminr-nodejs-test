import { Request, Response } from 'express';
import { PoolClient } from 'pg';

import pool from '../config/db';
import getTaskByTaskListId from '../utilities/getTasksByTaskListId';
import { logger } from '../utilities/logger';

const getTaskList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const query: string = `SELECT * FROM task_list WHERE id = ${id} AND deleted = false;`;
    const client: PoolClient = await pool.connect();
    const taskListRowCount = (await client.query(query)).rowCount;
    const taskListRows = (await client.query(query)).rows;
    logger.info(taskListRowCount);
    const { rowCount, data } = await getTaskByTaskListId(parseInt(id, 10));
    if (taskListRowCount < 1) {
      res.status(404).send({
        message: 'data not found',
      });
    } else if (rowCount < 1) {
      const { title } = taskListRows[0];
      res.status(200).send({
        title,
        tasks: [],
      });
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTaskLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: string = 'SELECT * FROM task_list WHERE deleted = false;';
    const client: PoolClient = await pool.connect();
    const { rowCount, rows } = await client.query(query);

    if (rowCount < 1) {
      res.status(404).send({
        message: 'data not found',
      });
    } else {
      // loop each row to get structured data
      const result = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const row of rows) {
        // eslint-disable-next-line no-await-in-loop
        const { data } = await getTaskByTaskListId(parseInt(row.id, 10));
        result.push(data);
      }
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const createTaskList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, listOrder } = req.body;
    const values = [title, listOrder];
    const query = 'INSERT INTO task_list(title, list_order) VALUES($1,$2) RETURNING *;';
    const client: PoolClient = await pool.connect();
    const { rows } = await client.query(query, values);
    res.status(201).send(rows[0]);
  } catch (error) {
    if (error && error.code === '23505') {
      logger.error({ message: 'order already exists' });
      res.status(404).send({ message: 'order already exists' });
    } else {
      res.status(400).send(error);
    }
  }
};

const deleteTaskList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const values = [true, id];
    const query = 'UPDATE task_list SET deleted = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *;';
    const client: PoolClient = await pool.connect();
    await client.query(query, values);
    res.status(200).send({ message: 'task list deleted successfully' });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const updateTaskList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    let query: string = '';
    let values = [];
    if (title && title.length > 0) {
      values = [title, id];
      query = 'UPDATE task_list SET title = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *;';
    }
    const client: PoolClient = await pool.connect();
    const { rows } = await client.query(query, values);
    res.status(200).send(rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export {
  getTaskList,
  getTaskLists,
  createTaskList,
  deleteTaskList,
  updateTaskList,
};
