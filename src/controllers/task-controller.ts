import { Request, Response } from 'express';
import { PoolClient } from 'pg';

import pool from '../config/db';
import { logger } from '../utilities/logger';

const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const query: string = `SELECT * FROM task WHERE id=${id}  AND deleted = false;`;
    const client: PoolClient = await pool.connect();
    const { rowCount, rows } = await client.query(query);
    if (rowCount < 1) {
      res.status(404).send({
        message: 'data not found',
      });
    } else {
      res.status(200).send(rows[0]);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: string = 'SELECT * FROM task WHERE deleted = false;';
    const client: PoolClient = await pool.connect();
    const { rowCount, rows } = await client.query(query);
    if (rowCount < 1) {
      res.status(404).send({
        message: 'data not found',
      });
    } else {
      res.status(200).send(rows);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const values: string[] = [title];
    const query: string = 'INSERT INTO task(title) VALUES($1) RETURNING *;';
    const client: PoolClient = await pool.connect();
    const { rows } = await client.query(query, values);
    logger.info(rows);
    res.status(201).send(rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const values = [true, id];
    const query = 'UPDATE task SET deleted = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *;';
    const client: PoolClient = await pool.connect();
    const { rows } = await client.query(query, values);
    logger.info(rows);
    res.status(200).send({ message: 'task deleted successfully' });
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    let query: string = '';
    let values = [];
    if (title && title.length > 0) {
      values = [title, id];
      query = 'UPDATE task SET title = $1, updated_at = current_timestamp WHERE id = $2 RETURNING *;';
    }
    const client: PoolClient = await pool.connect();
    const { rows } = await client.query(query, values);
    logger.info(rows);
    res.status(200).send(rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export {
  getTask,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
