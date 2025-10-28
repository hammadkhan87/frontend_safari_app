// components/KilimanjaroPackages.js
"use client";
import { useState } from "react";

const KilimanjaroPackages = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const routes = [
    {
      id: 1,
      title: "MACHAME ROUTE",
      subtitle: "The Whiskey Route - Most Popular",
      duration: "6-7 Days",
      difficulty: "Medium",
      successRate: "85%",
      price: "From $2,100 USD",
      image:
        "https://tanzania-specialist.com/wp-content/uploads/2023/08/19-Kilimanjaro-marangu-1024x683.jpg",
      description:
        "The most popular route offering beautiful scenery and excellent acclimatization profile.",
      highlights: ["Best Scenery", "Great Acclimatization", "High Success"],
      groupSize: "2-12 people",
    },
    {
      id: 2,
      title: "MARANGU ROUTE",
      subtitle: "The Coca-Cola Route - Hut Accommodation",
      duration: "5-6 Days",
      difficulty: "Medium",
      successRate: "70%",
      price: "From $1,850 USD",
      image:
        "https://tanzania-specialist.com/wp-content/uploads/2023/08/21-Kilimanjaro-Lemosho-1024x767.jpg",
      description:
        "The only route with comfortable hut accommodations. Most direct path to the summit.",
      highlights: ["Hut Accommodations", "Direct Route", "Budget Friendly"],
      groupSize: "2-12 people",
    },
    {
      id: 3,
      title: "LEMOSHO ROUTE",
      subtitle: "The Scenic Route - Highest Success",
      duration: "7-8 Days",
      difficulty: "Medium-Hard",
      successRate: "90%",
      price: "From $2,450 USD",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Most beautiful route with the highest success rates. Excellent for photography.",
      highlights: ["Most Scenic", "95% Success", "Less Crowded"],
      groupSize: "2-10 people",
    },
    {
      id: 4,
      title: "RONGAI ROUTE",
      subtitle: "The Dry Route - Unique Approach",
      duration: "6-7 Days",
      difficulty: "Medium",
      successRate: "80%",
      price: "From $2,150 USD",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Approach from the north with drier conditions and unique perspective.",
      highlights: ["Drier Conditions", "Less Crowded", "Unique Views"],
      groupSize: "2-12 people",
    },
    {
      id: 5,
      title: "NORTHERN CIRCUIT",
      subtitle: "The Long Route - Ultimate Experience",
      duration: "8-9 Days",
      difficulty: "Medium",
      successRate: "95%",
      price: "From $2,850 USD",
      image:
        "https://tanzania-specialist.com/wp-content/uploads/2023/08/22-Kilimanjaro-Shira-1024x768.jpg",
      description:
        "Longest route with best acclimatization and summit success rates.",
      highlights: [
        "Best Acclimatization",
        "Highest Success",
        "Complete Experience",
      ],
      groupSize: "2-8 people",
    },
    {
      id: 6,
      title: "UMBWE ROUTE",
      subtitle: "The Challenging Route - For Experts",
      duration: "6-7 Days",
      difficulty: "Hard",
      successRate: "65%",
      price: "From $2,300 USD",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Most direct and steepest route for experienced climbers seeking challenge.",
      highlights: ["Most Direct", "Challenging", "Expert Level"],
      groupSize: "2-6 people",
    },
    {
      id: 7,
      title: "SHIRA ROUTE",
      subtitle: "The High Start - Scenic Alternative",
      duration: "7-8 Days",
      difficulty: "Medium-Hard",
      successRate: "75%",
      price: "From $2,350 USD",
      image:
        "https://tanzania-specialist.com/wp-content/uploads/2023/08/Kilimanjaro-Beklimmen-1024x748.jpg",
      description: "Starts at higher elevation with stunning plateau views.",
      highlights: ["High Start", "Less Traveled", "Plateau Views"],
      groupSize: "2-10 people",
    },
    {
      id: 8,
      title: "WESTERN BREACH",
      subtitle: "The Technical Route - Adventure Climb",
      duration: "7-8 Days",
      difficulty: "Hard",
      successRate: "60%",
      price: "From $2,700 USD",
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Technical route requiring scrambling skills. Most adventurous approach.",
      highlights: ["Technical Climb", "Adventure", "Dramatic Scenery"],
      groupSize: "2-6 people",
    },
    {
      id: 9,
      title: "KILIMANJARO + SAFARI",
      subtitle: "Complete Tanzania Experience",
      duration: "12-14 Days",
      difficulty: "Medium",
      successRate: "85%",
      price: "From $4,200 USD",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Combine Kilimanjaro climb with safari in Serengeti and Ngorongoro.",
      highlights: ["Climb + Safari", "Complete Package", "Wildlife Experience"],
      groupSize: "2-8 people",
    },
    {
      id: 10,
      title: "PRIVATE CLIMB",
      subtitle: "Customized Experience",
      duration: "Custom",
      difficulty: "Custom",
      successRate: "90%",
      price: "From $3,500 USD",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Fully customized private climb with personalized itinerary and dates.",
      highlights: ["Private Guide", "Custom Dates", "Personalized"],
      groupSize: "1-4 people",
    },
  ];

  const filteredRoutes =
    activeFilter === "all"
      ? routes
      : routes.filter((route) =>
          route.difficulty.toLowerCase().includes(activeFilter)
        );

  return (
    <section className="pb-20">
      <div className="relative text-center mb-16 py-16  overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Your Color Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#465b2d]/10 to-[#8B5A4A]/10" />

        {/* Content with Your Colors */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            CLIMB <span className="text-white">KILIMANJARO</span>
          </h2>
          <p className="text-xl md:text-2xl text-white opacity-80 font-semibold mb-4">
            Choose Your Route to the Roof of Africa
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] mx-auto rounded-full mb-8"></div>

          <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the adventure of a lifetime climbing Africa's highest
            peak with expert guides, proven safety records, and unforgettable
            memories guaranteed.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  bg-white">
        {/* Header Section */}
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CLIMB KILIMANJARO
          </h2>
          <p className="text-xl md:text-2xl text-[#465b2d] font-semibold mb-4">
            Choose Your Route to the Roof of Africa
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] mx-auto rounded-full mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Experience the adventure of a lifetime climbing Africa's highest peak with expert guides, 
            proven safety records, and unforgettable memories guaranteed.
          </p>
        </div> */}

        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'All Routes' },
            { id: 'medium', label: 'Beginner Friendly' },
            { id: 'medium-hard', label: 'Moderate' },
            { id: 'hard', label: 'Challenging' },
            { id: 'custom', label: 'Private Climbs' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-[#465b2d] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div> */}

        {/* Routes Grid - 2 columns */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="relative group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
              onMouseEnter={() => setHoveredCard(route.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col md:flex-row h-auto md:h-60 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-md bg-white group transition-all duration-300 hover:shadow-lg">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 left-3 bg-[#465b2d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                    {route.duration}
                  </div>

                  {/* Success Rate */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    {route.successRate} Success
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {route.title}
                      </h3>
                      <p className="text-[#465b2d] font-medium text-xs mt-1">
                        {route.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                      {route.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1">
                      {route.highlights.map((highlight, index) => (
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
                        {route.price}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {route.groupSize}
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
       
        {/* Trust Indicators */}
        
      </div>
    </section>
  );
};

export default KilimanjaroPackages;
