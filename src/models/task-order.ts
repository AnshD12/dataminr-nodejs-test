import pool from '../config/db';
import { logger } from '../utilities/logger';

const createTaskOrderTable = async () => {
  const taskOrderTable = `CREATE TABLE IF NOT EXISTS
      task_order(
        id SERIAL PRIMARY KEY,
        task_list_id INT NOT NULL,
        task_id INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_task_list FOREIGN KEY(task_list_id) REFERENCES task_list(id),
        CONSTRAINT fk_task FOREIGN KEY(task_id) REFERENCES task(id),
        UNIQUE (task_list_id, task_id)
      )`;

  try {
    await pool.query(taskOrderTable);
  } catch (error) {
    logger.error(error);
  }
};

export default createTaskOrderTable;
