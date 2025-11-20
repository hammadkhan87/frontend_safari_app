// app/admin/packages/api/create/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const pkg = await request.json();

    // Validate required fields
    if (!pkg.name?.trim()) {
      return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
    }
    if (pkg.gallery.length < 8) {
      return NextResponse.json({ error: 'Minimum 8 gallery images required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO packages (
        name, slug, duration, price, starting_from, comfort_level, tour_type, safari_type,
        image, gallery, short_description, full_description, specialized_tours, features,
        highlights, destinations, route, accommodation_meals, activities_transportation,
        tour_features, day_by_day, rates, inclusions, getting_there
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING id`,
      [
        pkg.name,
        pkg.slug,
        pkg.duration,
        pkg.price,
        pkg.startingFrom,
        pkg.comfortLevel,
        pkg.tourType,
        pkg.safariType,
        pkg.image, // URL string
        JSON.stringify(pkg.gallery), // array of URLs
        pkg.shortDescription,
        pkg.fullDescription,
        JSON.stringify(pkg.specializedTours),
        JSON.stringify(pkg.features),
        JSON.stringify(pkg.highlights),
        JSON.stringify(pkg.destinations),
        JSON.stringify(pkg.route),
        JSON.stringify(pkg.accommodationMeals),
        JSON.stringify(pkg.activitiesTransportation),
        JSON.stringify(pkg.tourFeatures),
        JSON.stringify(pkg.dayByDay),
        JSON.stringify(pkg.rates),
        JSON.stringify(pkg.inclusions),
        JSON.stringify(pkg.gettingThere)
      ]
    );

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Create package error:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}