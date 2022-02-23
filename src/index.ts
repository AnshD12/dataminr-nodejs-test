import app from './app';
import { logger } from './utilities/logger';
import createTables from './models/createTables';

const port: number = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, async () => {
  // initiate db and table creation
  try {
    await createTables();
  } catch (error) {
    logger.error(error);
  }
  logger.info('server started', { port: process.env.PORT });
});
