import pool from '../config/db';
import { logger } from '../utilities/logger';

const createTaskListTable = async () => {
  const taskListTable = `CREATE TABLE IF NOT EXISTS
      task_list(
        id SERIAL PRIMARY KEY,
        title VARCHAR(256) NOT NULL,
        list_order INT UNIQUE NOT NULL,
        deleted BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`;

  try {
    await pool.query(taskListTable);
  } catch (error) {
    logger.error(error);
  }
};

export default createTaskListTable;
