import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import routes from './routes/routes';

dotenv.config();
const app: Application = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.json({ type: 'application/*+json', limit: '50mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
}));

app.get('/health', (req, res) => {
  res.send('working!');
});
app.use(routes);

export default app;
