// components/ZanzibarPackages.js
"use client";
import { useState } from "react";

const ZanzibarPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const packages = [
    {
      id: 1,
      title: "BEACH PARADISE ESCAPE",
      subtitle: "Luxury Beach Resort Stay",
      duration: "5-7 Days",
      experience: "Relaxing",
      rating: "4.8/5",
      price: "From $1,200 USD",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Unwind in luxury beachfront resorts with white sandy beaches and turquoise waters.",
      highlights: ["Private Beach", "Spa Treatments", "All-Inclusive"],
      groupSize: "2-8 people",
    },
    {
      id: 2,
      title: "HISTORIC STONE TOWN",
      subtitle: "Cultural & Historical Experience",
      duration: "4-6 Days",
      experience: "Cultural",
      rating: "4.7/5",
      price: "From $950 USD",
      image:
        "https://images.unsplash.com/photo-1589553416260-f1c7b0d82b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Explore the UNESCO World Heritage Site of Stone Town with its rich history and architecture.",
      highlights: ["UNESCO Site", "Spice Tours", "Local Markets"],
      groupSize: "2-12 people",
    },
    {
      id: 3,
      title: "PRIVATE ISLAND RETREAT",
      subtitle: "Exclusive Island Getaway",
      duration: "7-10 Days",
      experience: "Luxury",
      rating: "4.9/5",
      price: "From $2,800 USD",
      image:
        "https://images.unsplash.com/photo-1552733407-5d5c46c0bb36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Experience ultimate privacy and luxury on your own private island with personalized service.",
      highlights: ["Private Island", "Butler Service", "Marine Activities"],
      groupSize: "2-6 people",
    },
    {
      id: 4,
      title: "ADVENTURE & WATERSPORTS",
      subtitle: "Active Beach Vacation",
      duration: "6-8 Days",
      experience: "Adventure",
      rating: "4.6/5",
      price: "From $1,500 USD",
      image:
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Perfect for active travelers with snorkeling, diving, kayaking, and water sports included.",
      highlights: ["Scuba Diving", "Snorkeling", "Water Sports"],
      groupSize: "2-10 people",
    },
    {
      id: 5,
      title: "ROMANTIC HONEYMOON",
      subtitle: "Perfect Couples Getaway",
      duration: "8-10 Days",
      experience: "Romantic",
      rating: "4.9/5",
      price: "From $2,100 USD",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Ultimate romantic experience with private dinners, couple massages, and luxury accommodations.",
      highlights: ["Private Dinners", "Couple Spa", "Romantic Setup"],
      groupSize: "2 people",
    },
    {
      id: 6,
      title: "FAMILY BEACH HOLIDAY",
      subtitle: "Fun for All Ages",
      duration: "7-9 Days",
      experience: "Family",
      rating: "4.7/5",
      price: "From $1,800 USD",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Family-friendly resorts with kids clubs, activities, and safe swimming beaches.",
      highlights: ["Kids Club", "Family Rooms", "Safe Beaches"],
      groupSize: "2-6 people",
    },
    {
      id: 7,
      title: "SPICE TOUR & CULTURE",
      subtitle: "Authentic Zanzibar Experience",
      duration: "5-7 Days",
      experience: "Cultural",
      rating: "4.8/5",
      price: "From $1,350 USD",
      image:
        "https://images.unsplash.com/photo-1552733407-5d5c46c0bb36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Immerse yourself in Zanzibar's rich culture with spice tours, local villages, and traditional cuisine.",
      highlights: ["Spice Farms", "Local Cuisine", "Cultural Tours"],
      groupSize: "2-12 people",
    },
    {
      id: 8,
      title: "LUXURY YACHT CHARTER",
      subtitle: "Sail the Zanzibar Archipelago",
      duration: "4-7 Days",
      experience: "Luxury",
      rating: "5.0/5",
      price: "From $3,500 USD",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Explore hidden islands and pristine beaches aboard your private luxury yacht with crew.",
      highlights: ["Private Yacht", "Hidden Islands", "Crew Service"],
      groupSize: "2-8 people",
    },
    {
      id: 9,
      title: "ZANZIBAR + SAFARI COMBO",
      subtitle: "Beach & Wildlife Adventure",
      duration: "10-12 Days",
      experience: "Adventure",
      rating: "4.9/5",
      price: "From $3,200 USD",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Combine Zanzibar's beaches with Serengeti safari for the ultimate Tanzania experience.",
      highlights: ["Beach & Safari", "Complete Package", "Wildlife Experience"],
      groupSize: "2-8 people",
    },
    {
      id: 10,
      title: "CUSTOM PRIVATE TOUR",
      subtitle: "Tailored to Your Preferences",
      duration: "Custom",
      experience: "Custom",
      rating: "5.0/5",
      price: "From $2,500 USD",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Fully customized Zanzibar experience with personalized itinerary and private guide.",
      highlights: ["Private Guide", "Custom Itinerary", "Personalized"],
      groupSize: "1-6 people",
    },
  ];

  const filteredPackages =
    activeFilter === "all"
      ? packages
      : packages.filter((pkg) =>
          pkg.experience.toLowerCase().includes(activeFilter)
        );

  return (
    <section className="pb-20">
      <div className="relative text-center mb-16 py-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Your Color Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#465b2d]/10 to-[#8B5A4A]/10" />

        {/* Content with Your Colors */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            DISCOVER <span className="text-white">ZANZIBAR</span>
          </h2>
          <p className="text-xl md:text-2xl text-white opacity-80 font-semibold mb-4">
            Tropical Paradise in the Indian Ocean
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] mx-auto rounded-full mb-8"></div>

          <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the magic of Zanzibar's pristine beaches, rich culture, and turquoise waters. 
            Your perfect island getaway awaits with luxury resorts, historic sites, and unforgettable adventures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        {/* Packages Grid - 2 columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col md:flex-row h-auto md:h-60 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-md bg-white group transition-all duration-300 hover:shadow-lg">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 left-3 bg-[#465b2d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                    {pkg.duration}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    {pkg.rating} Rating
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="text-[#465b2d] font-medium text-xs mt-1">
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-base font-bold text-[#465b2d]">
                        {pkg.price}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {pkg.groupSize}
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="transform transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                      <div className="w-8 h-8 bg-[#465b2d] rounded-full flex items-center justify-center hover:bg-[#3a4a24] transition-colors duration-300 shadow-md">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#465b2d]/30 rounded-xl transition-all duration-500 pointer-events-none" />

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
      
      </div>
    </section>
  );
};

export default ZanzibarPackages;