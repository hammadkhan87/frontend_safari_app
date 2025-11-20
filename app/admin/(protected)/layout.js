
// app/admin/layout.js
import { requireAdmin } from '@/lib/auth';

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Safari Admin</h1>
        <nav className="space-y-4">
          <a href="/admin/packages" className="block py-2 hover:bg-gray-700 px-4 rounded">Packages</a>
          <a href="/admin/blogs" className="block py-2 hover:bg-gray-700 px-4 rounded">Blogs</a>
          <a href="/admin/logout" className="block py-2 hover:bg-gray-700 px-4 rounded text-red-300">Logout</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}