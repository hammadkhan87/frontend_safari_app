// app/admin/packages/api/update/[id]/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const pkg = await request.json();
    const id = params.id;

    await pool.query(
      `UPDATE packages SET
        name = $1, slug = $2, duration = $3, price = $4, starting_from = $5,
        comfort_level = $6, tour_type = $7, safari_type = $8, image = $9, gallery = $10,
        short_description = $11, full_description = $12, specialized_tours = $13, features = $14,
        highlights = $15, destinations = $16, route = $17, accommodation_meals = $18,
        activities_transportation = $19, tour_features = $20, day_by_day = $21,
        rates = $22, inclusions = $23, getting_there = $24
      WHERE id = $25`,
      [
        pkg.name,
        pkg.slug,
        pkg.duration,
        pkg.price,
        pkg.startingFrom,
        pkg.comfortLevel,
        pkg.tourType,
        pkg.safariType,
        pkg.image,
        JSON.stringify(pkg.gallery),
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
        JSON.stringify(pkg.gettingThere),
        id
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update package error:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}