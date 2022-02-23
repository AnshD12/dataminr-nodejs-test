import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  connectionString: 'postgres://postgres:postgres@postgres/dataminr',
  idleTimeoutMillis: 30000,
});

export default pool;
