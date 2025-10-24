// frontend/lib/mockData.js

export const mockPackages = [
  {
    id: 1,
    name: "9-Day Ultimate Tanzania Experience",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Asili Explorer Safaris",
    rating: 4.9,
    reviewCount: 3395,
    shortDescription: "Experience the ultimate 'once-in-a-lifetime' adventure through Tanzania's iconic landscapes and Zanzibar's pristine beaches.",
    fullDescription: "This comprehensive 9-day journey takes you through the heart of Tanzania's northern safari circuit, including a visit to the cascading Materuni Waterfalls, the diverse ecosystems of Lake Manyara, the unparalleled wildlife spectacle of the Ngorongoro Crater, and the ancient elephant highways of Tarangire National Park. Conclude your adventure with 3 blissful days relaxing on the idyllic beaches of Zanzibar.",
    duration: 9, // Tour Length
    price: 3200, // Rates in USD
    startingFrom: "Arusha", // Starting From
    comfortLevel: "luxury", // Comfort Level
    tourType: "private", // Private or Shared Tour
    safariType: "lodge", // Safari Type
    specializedTours: ["honeymoon", "family"], // Specialized Tours
    features: ["airport transfer included", "itinerary customizable", "domestic flight included"], // Other Tour Features
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Visit Materuni Waterfalls for a refreshing cultural experience",
      "Explore Lake Manyara's tree-climbing lions and flamingo-lined shores",
      "Descend into the Ngorongoro Crater, a UNESCO World Heritage Site",
      "Witness ancient elephant highways in Tarangire National Park",
      "Relax on Zanzibar's pristine beaches",
      "Includes domestic flight Arusha <-> Zanzibar"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Arusha",
      "Materuni Waterfalls",
      "Lake Manyara National Park",
      "Ngorongoro Crater",
      "Tarangire National Park",
      "Zanzibar Beaches",
      "Zanzibar Island"
    ]
  },
  {
    id: 2,
    name: "5-Day Kilimanjaro Trek - Marangu Route",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Summit Seekers Ltd",
    rating: 4.7,
    reviewCount: 808,
    shortDescription: "Conquer Africa's highest peak via the popular Marangu Route.",
    fullDescription: "This 5-day trek on the Marangu Route offers hut accommodation and a steady ascent to Uhuru Peak, the highest point in Africa. Guided by experienced professionals with all necessary equipment provided.",
    duration: 5,
    price: 1950,
    startingFrom: "Moshi",
    comfortLevel: "mid-range",
    tourType: "shared",
    safariType: "camping",
    specializedTours: ["gorilla trekking"],
    features: ["airport transfer included"],
    image: "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Reach the summit of Mount Kilimanjaro",
      "Experience diverse ecosystems from rainforest to arctic zone",
      "Stay in comfortable huts on Marangu Route",
      "All meals and equipment provided"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Moshi",
      "Marangu Gate",
      "Mandara Huts",
      "Horombo Huts",
      "Kibo Huts",
      "Uhuru Peak",
      "Mweka Gate"
    ]
  },
  {
    id: 3,
    name: "10-Day Epic Tanzania & Kenya Safari",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Asili Explorer Safaris",
    rating: 4.95,
    reviewCount: 1205,
    shortDescription: "Cross borders for the ultimate East African safari adventure.",
    fullDescription: "This epic 10-day journey takes you through Tanzania's northern circuit and into Kenya's Maasai Mara, offering the chance to see an even wider variety of wildlife and landscapes.",
    duration: 10,
    price: 4200,
    startingFrom: "Dar es Salaam",
    comfortLevel: "luxury",
    tourType: "private",
    safariType: "tented",
    specializedTours: ["fly in safaris", "family"],
    features: ["itinerary customizable", "airport transfer included", "domestic flight included"],
    image: "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Cross-border safari from Tanzania to Kenya",
      "Visit the Maasai Mara National Reserve",
      "Experience both lodge and tented camp stays",
      "Fly-in safari option available"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Dar es Salaam",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park",
      "Ngorongoro Crater",
      "Arusha",
      "Nairobi",
      "Maasai Mara National Reserve"
    ]
  },
  {
    id: 4,
    name: "3-Day Zanzibar Beach Getaway",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Zanzibar Bliss Travel",
    rating: 4.8,
    reviewCount: 750,
    shortDescription: "Escape to paradise with this short but sweet Zanzibar beach holiday.",
    fullDescription: "Perfect for a quick getaway, this 3-day package includes transfers, accommodation at a selected beach resort, and half-board meals. Spend your days lounging on the beach, snorkeling, or exploring Stone Town.",
    duration: 3,
    price: 850,
    startingFrom: "Zanzibar",
    comfortLevel: "mid-range",
    tourType: "shared",
    safariType: "hotel",
    specializedTours: ["beach time", "honeymoon"],
    features: ["airport transfer included"],
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Stay at a handpicked beach resort",
      "Half-board meals included",
      "Transfers from/to airport",
      "Ideal for couples or solo travelers"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Zanzibar Airport",
      "Stone Town",
      "Paje Beach",
      "Matemwe Beach",
      "Nungwi Beach"
    ]
  },
  {
    id: 5,
    name: "7-Day Classic Serengeti & Ngorongoro Safari",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Asili Explorer Safaris",
    rating: 4.9,
    reviewCount: 2104,
    shortDescription: "Experience the heart of Tanzania's wildlife migration and the Ngorongoro Crater.",
    fullDescription: "This 7-day adventure takes you through the iconic Serengeti National Park and the Ngorongoro Conservation Area. Witness the Great Migration, spot the Big Five, and enjoy luxury accommodations.",
    duration: 7, // Tour Length
    price: 2800, // Rates in USD
    startingFrom: "Arusha", // Starting From
    comfortLevel: "luxury", // Comfort Level
    tourType: "private", // Private or Shared Tour
    safariType: "lodge", // Safari Type
    specializedTours: ["family", "honeymoon"], // Specialized Tours
    features: ["airport transfer included", "itinerary customizable"], // Other Tour Features
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Witness the Great Migration in the Serengeti",
      "Explore the Ngorongoro Crater, a UNESCO World Heritage Site",
      "Stay in luxury lodges with stunning views",
      "Expert local guides and 4x4 vehicles"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Arusha",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park",
      "Ngorongoro Crater"
    ]
  },
  {
    id: 6,
    name: "Budget 4-Day Tarangire & Lake Manyara Safari",
    offeredBy: "Asili Explorer Safaris",
    tourOperator: "Budget Safaris TZ",
    rating: 4.6,
    reviewCount: 320,
    shortDescription: "An affordable way to experience Tanzania's wildlife wonders.",
    fullDescription: "This budget-friendly 4-day safari focuses on two of Tanzania's most accessible parks, Tarangire and Lake Manyara, known for their large elephant populations and tree-climbing lions respectively.",
    duration: 4,
    price: 750,
    startingFrom: "Arusha",
    comfortLevel: "budget",
    tourType: "shared",
    safariType: "camping",
    specializedTours: ["family"],
    features: ["airport transfer included"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Focus on Tarangire and Lake Manyara National Parks",
      "Affordable shared safari experience",
      "Camping under the stars",
      "Expert driver-guide"
    ],
    // --- New: Specific Destinations Visited ---
    destinations: [
      "Arusha",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Karatu",
      "Arusha"
    ]
  }
  // Add more packages as needed...
];

// Filter options data
export const filterOptions = {
  tourLength: [
    { id: 'all', name: 'All Durations' },
    { id: 'halfDay', name: '½ Day', min: 0.5, max: 0.5 },
    { id: '1-3', name: '1-3 Days', min: 1, max: 3 },
    { id: '4-7', name: '4-7 Days', min: 4, max: 7 },
    { id: '8-14', name: '8-14 Days', min: 8, max: 14 },
    { id: '15+', name: '15+ Days', min: 15, max: 100 } // Using 100 as a practical max
  ],
  priceRange: [
    { id: 'all', name: 'Any Price' },
    { id: '0-1000', name: 'Under $1000', min: 0, max: 1000 },
    { id: '1000-2500', name: '$1000 - $2500', min: 1000, max: 2500 },
    { id: '2500-5000', name: '$2500 - $5000', min: 2500, max: 5000 },
    { id: '5000+', name: '$5000+', min: 5000, max: 100000 } // Assuming max is 100000
  ],
  startingFrom: [
    { id: 'all', name: 'All Locations' },
    { id: 'arusha', name: 'Arusha' },
    { id: 'zanzibar', name: 'Zanzibar' },
    { id: 'dar-es-salaam', name: 'Dar es Salaam' },
    { id: 'moshi', name: 'Moshi' },
    { id: 'nairobi', name: 'Nairobi (Kenya)' } // Clarified it's Kenya
  ],
  comfortLevel: [
    { id: 'all', name: 'All Comfort Levels' },
    { id: 'luxury+', name: 'Luxury+' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'mid-range', name: 'Mid-Range' },
    { id: 'budget', name: 'Budget' }
  ],
  tourType: [
    { id: 'all', name: 'All Tour Types' },
    { id: 'private', name: 'Private Tour' },
    { id: 'shared', name: 'Shared Tour' }
  ],
  safariType: [
    { id: 'all', name: 'All Safari Types' },
    { id: 'lodge', name: 'Lodge' },
    { id: 'tented', name: 'Tented Camp' },
    { id: 'hotel', name: 'Hotel' },
    { id: 'camping', name: 'Camping' }
  ],
  specializedTours: [
    { id: 'fly-in-safaris', name: 'Fly-in Safaris' },
    { id: 'family', name: 'Family' },
    { id: 'beach-time', name: 'Beach Time' },
    { id: 'honeymoon', name: 'Honeymoon' },
    { id: 'gorilla-trekking', name: 'Gorilla Trekking' },
    { id: 'walking-safaris', name: 'Walking Safaris' }
  ],
  otherFeatures: [
    { id: 'airport-transfer', name: 'Airport Transfer Included' },
    { id: 'customizable', name: 'Itinerary Can Be Customized' },
    { id: 'domestic-flight', name: 'Domestic Flight Included' } // Added new feature
  ]
};