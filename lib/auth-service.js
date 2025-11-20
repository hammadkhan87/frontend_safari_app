// lib/auth-service.js
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export async function verifyAdminCredentials(email, password) {
  try {
    const result = await pool.query(
      'SELECT password_hash FROM admins WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) return false;
    return await bcrypt.compare(password, result.rows[0].password_hash);
  } catch (err) {
    console.error('DB error in auth:', err);
    return false;
  }
}