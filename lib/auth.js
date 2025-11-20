// lib/auth.js
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60; // 1 day

function generateSessionId() {
  return randomBytes(32).toString('hex');
}

export async function loginAdmin(email, password) {
  try {
    const result = await pool.query(
      'SELECT id, password_hash FROM admins WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) return false;

    const isValid = await bcrypt.compare(password, result.rows[0].password_hash);
    if (!isValid) return false;

    const sessionId = generateSessionId();

    (await cookies()).set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_DURATION,
      path: '/admin', // critical: must match logout
      sameSite: 'strict',
    });

    return true;
  } catch (err) {
    console.error('Login error:', err);
    return false;
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  
  // Delete with EXACT same path
  cookieStore.delete(SESSION_COOKIE_NAME);
  
  // Overwrite with expired cookie as extra safety
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 0,
    expires: new Date(0),
  });

  redirect('/admin/login');
}

export async function verifySession() {
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return !!sessionId;
}

export async function requireAdmin() {
  const isValid = await verifySession();
  if (!isValid) {
    redirect('/admin/login');
  }
}