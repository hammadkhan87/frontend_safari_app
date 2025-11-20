// app/admin/packages/[id]/edit/page.js
import pool from '@/lib/db';
import EditPackageForm from './EditPackageForm';

export default async function EditPackagePage({ params }) {
  const { rows } = await pool.query('SELECT * FROM packages WHERE id = $1', [params.id]);
  if (rows.length === 0) return <div>Package not found</div>;

  const pkg = {
    ...rows[0],
    // Parse JSON fields back to objects
    gallery: JSON.parse(rows[0].gallery || '[]'),
    specializedTours: JSON.parse(rows[0].specialized_tours || '[]'),
    features: JSON.parse(rows[0].features || '[]'),
    highlights: JSON.parse(rows[0].highlights || '[]'),
    destinations: JSON.parse(rows[0].destinations || '[]'),
    route: JSON.parse(rows[0].route || '{}'),
    accommodationMeals: JSON.parse(rows[0].accommodation_meals || '{}'),
    activitiesTransportation: JSON.parse(rows[0].activities_transportation || '{}'),
    tourFeatures: JSON.parse(rows[0].tour_features || '[]'),
    dayByDay: JSON.parse(rows[0].day_by_day || '[]'),
    rates: JSON.parse(rows[0].rates || '{}'),
    inclusions: JSON.parse(rows[0].inclusions || '{}'),
    gettingThere: JSON.parse(rows[0].getting_there || '{}')
  };

  return <EditPackageForm pkg={pkg} />;
}