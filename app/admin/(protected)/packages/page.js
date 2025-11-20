// app/admin/packages/page.js
import pool from '@/lib/db';

export default async function PackagesPage() {
  try {
    // ✅ Fetch packages from PostgreSQL
    const { rows: packages } = await pool.query(
      'SELECT id, name, slug, duration, price, image FROM packages ORDER BY created_at DESC'
    );

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Safari Packages</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage all your safari packages and tour offerings
                  </p>
                </div>
                <a
                  href="/admin/packages/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  + Add Package
                </a>
              </div>
            </div>

            {/* Table */}
            <div className="px-6 py-6">
              {packages.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No packages</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new safari package.</p>
                  <div className="mt-6">
                    <a
                      href="/admin/packages/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Create Package
                    </a>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Package
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {packages.map((pkg) => (
                        <tr key={pkg.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {pkg.image && (
                                <img
                                  src={pkg.image}
                                  alt={pkg.name}
                                  className="h-10 w-10 rounded object-cover border"
                                />
                              )}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                                <div className="text-sm text-gray-500">{pkg.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{pkg.duration} days</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${pkg.price?.toFixed(2) || '0.00'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a
                              href={`/admin/packages/${pkg.id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              Edit
                            </a>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
                                  fetch(`/admin/packages/api/delete/${pkg.id}`, {
                                    method: 'DELETE',
                                  })
                                    .then(() => window.location.reload())
                                    .catch((err) => alert(`Delete failed: ${err.message}`));
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch packages:', error);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-red-800">Error Loading Packages</h2>
            <p className="mt-1 text-sm text-red-600">Failed to retrieve package data. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }
}