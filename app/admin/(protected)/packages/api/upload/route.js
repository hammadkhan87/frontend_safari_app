// app/admin/packages/api/upload/route.js
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomBytes } from 'crypto';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    
    if (!file) return Response.json({ error: 'No file provided' }, { status: 400 });
    if (file.size > MAX_SIZE) return Response.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) return Response.json({ error: 'Only image files allowed' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split('.').pop();
    const filename = `${randomBytes(16).toString('hex')}.${ext}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    
    await writeFile(filepath, buffer);
    return Response.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}