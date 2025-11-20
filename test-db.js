// test-db.js
import { config } from 'dotenv';
import { Pool } from 'pg';

config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function test() {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS test (id SERIAL PRIMARY KEY, name TEXT)');
    console.log('✅ Can create tables');
    await pool.query('INSERT INTO test (name) VALUES ($1)', ['Local Test']);
    const { rows } = await pool.query('SELECT * FROM test');
    console.log('✅ Data inserted and fetched:', rows);
    await pool.query('DROP TABLE test');
    console.log('✅ Cleanup successful');
  } catch (err) {
    console.error('❌ DB test failed:', err.message);
  } finally {
    await pool.end();
  }
}

test();