'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPackageForm({ pkg: initialPkg }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pkg, setPkg] = useState(initialPkg);

  const update = (path, value) => {
    const keys = path.split('.');
    setPkg(prev => {
      const result = { ...prev };
      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return result;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/admin/packages/api/update/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pkg),
      });
      if (res.ok) {
        alert('✅ Package updated successfully!');
        router.push('/admin/packages');
      } else {
        throw new Error('Failed to update package');
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Use the SAME FORM as your "Add Package" page, but:
  // - Pre-populate with `pkg` data
  // - Submit to `/api/update/[id]`
  // - Change button to "Update Package"
  
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Edit Package: {pkg.name}</h1>
      
      {/* Reuse your existing form fields here */}
      {/* Example: */}
      <input
        value={pkg.name}
        onChange={e => update('name', e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Package Name"
      />
      
      <textarea
        value={pkg.shortDescription}
        onChange={e => update('shortDescription', e.target.value)}
        rows="3"
        className="w-full p-2 border rounded mb-4"
        placeholder="Short Description"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Package'}
      </button>
    </form>
  );
}