// app/admin/packages/api/delete/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(request, { params }) {
  try {
    await pool.query('DELETE FROM packages WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete package error:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}