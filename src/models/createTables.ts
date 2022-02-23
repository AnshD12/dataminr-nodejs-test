import createTaskListTable from './task-list';
import createTaskTable from './task';
import createOrderTable from './task-order';
import { logger } from '../utilities/logger';

const createTables = async () => {
  try {
    await createTaskListTable();
    await createTaskTable();
    await createOrderTable();
  } catch (error) {
    logger.error(error);
  }
};

export default createTables;
