import { PoolClient } from 'pg';

import pool from '../config/db';
import IQueryResponse from '../interfaces/common';
import formatTaskList from './formatTaskList';
import { logger } from './logger';

const getTaskByTaskListId = async (taskListId: number):Promise<IQueryResponse> => {
  try {
    const query = `
    SELECT
      tl.title as task_list, t.title as task
    FROM
      task_list tl
    INNER JOIN task_order tor
      ON tl.id = tor.task_list_id
    INNER JOIN task t
      ON tor.task_id = t.id
    WHERE tl.id = $1
    ORDER BY tor.created_at;`;
    const value = [taskListId];
    const client: PoolClient = await pool.connect();
    const { rowCount, rows } = await client.query(query, value);
    const formattedData = formatTaskList(rows);
    logger.info(rowCount);
    logger.info(formattedData);
    return {
      rowCount,
      data: formattedData,
    };
  } catch (error) {
    logger.log(error);
    return {
      rowCount: 0,
      data: [],
    };
  }
};

export default getTaskByTaskListId;
