import pool from '../config/db';
import { logger } from '../utilities/logger';

const createTaskTable = async () => {
  const taskTable = `CREATE TABLE IF NOT EXISTS
      task(
        id SERIAL PRIMARY KEY,
        title VARCHAR(256) NOT NULL,
        deleted BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`;

  try {
    await pool.query(taskTable);
  } catch (error) {
    logger.error(error);
  }
};

export default createTaskTable;
