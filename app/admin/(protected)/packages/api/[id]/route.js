import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request, { params }) {
  await pool.query('DELETE FROM packages WHERE id = $1', [params.id]);
  return NextResponse.redirect(new URL('/admin/packages', process.env.NEXT_PUBLIC_SITE_URL));
}