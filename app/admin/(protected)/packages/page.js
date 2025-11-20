// app/admin/packages/page.js
import pool from '@/lib/db';

export default async function PackagesPage() {
  const { rows: packages } = await pool.query('SELECT id, name, slug, duration, price, image FROM packages ORDER BY created_at DESC');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Safari Packages</h1>
        <a href="/admin/packages/new" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Add Package
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {pkg.image && (
                      <img src={pkg.image} alt={pkg.name} className="w-10 h-10 object-cover rounded mr-3" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                      <div className="text-sm text-gray-500">{pkg.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.duration} days</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${pkg.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href={`/admin/packages/${pkg.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                  <button 
                    onClick={async () => {
                      if (confirm('Are you sure?')) {
                        await fetch(`/admin/packages/api/delete/${pkg.id}`, { method: 'DELETE' });
                        window.location.reload();
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}