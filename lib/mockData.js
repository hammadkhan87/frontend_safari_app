// frontend/lib/mockData.js

export const mockPackages = [
  {
    id: 1,
    name: "6-Day Majestic Tanzania - Mid-Range",
    offeredBy: "Soul of Tanzania",
    tourOperator: "Soul of Tanzania",
    rating: 4.9,
    reviewCount: 525,
    shortDescription: "Explore the best of Tanzania in 6 days, visiting Tarangire, Lake Manyara, Serengeti, and Ngorongoro Crater. Enjoy breathtaking landscapes, diverse wildlife, and unforgettable game drives through iconic national parks.",
    fullDescription: "In this tour, you will have the opportunity to visit the most iconic parks of the northern safari circuit of Tanzania – Tarangire National Park, Lake Manyara National Park, Serengeti National Park (where you will stay 2 nights), and Ngorongoro Crater.",
    duration: 6,
    price: 2890,
    startingFrom: "Arusha",
    comfortLevel: "mid-range",
    tourType: "private",
    safariType: "lodge",
    specializedTours: ["safari", "wildlife"],
    features: ["can start any day", "can be customized", "suitable for solo travelers", "suitable for all ages", "airport transfer included"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park (2 nights)",
      "Ngorongoro Crater",
      "Mid-range tour with lodges & tented camps",
      "Private tour",
      "Can start any day",
      "Can be customized"
    ],
    destinations: [
      "Arusha",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park",
      "Ngorongoro Crater"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Arusha (Day 1)",
      end: "Arusha (Day 6)",
      days: [
        { day: 1, location: "Tarangire NP", description: "" },
        { day: 2, location: "Lake Manyara NP", description: "" },
        { day: "3-4", location: "Serengeti NP", description: "" },
        { day: 5, location: "Ngorongoro Crater", description: "" },
        { day: 6, location: "End of tour", description: "" }
      ]
    },
    tourFeatures: [
      "Mid-range tour",
      "Private tour",
      "Can start any day",
      "Can be customized",
      "Suitable for solo travelers",
      "Suitable for all ages"
    ],
    activitiesTransportation: {
      activities: ["game drives"],
      vehicle: "pop-up roof 4x4 vehicle",
      transfer: "A transfer from and back to the airport is included"
    },
    accommodationMeals: {
      note: "Additional accommodation before and at the end of the tour can be arranged for an extra cost",
      schedule: [
        {
          day: 1,
          accommodation: "Tarangire Sopa Lodge",
          accommodationType: "Mid-range lodge inside Tarangire NP",
          meals: "All Meals Included"
        },
        {
          day: 2,
          accommodation: "Escarpment Luxury Lodge Manyara",
          accommodationType: "Luxury lodge on the escarpment above Lake Manyara NP",
          meals: "All Meals Included"
        },
        {
          day: "3-4",
          accommodation: "Nyikani Camp Central Serengeti",
          accommodationType: "Mid-range tented camp inside Central Serengeti NP",
          meals: "All Meals Included"
        },
        {
          day: 5,
          accommodation: "Ngorongoro Serena Safari Lodge",
          accommodationType: "Luxury lodge on the crater rim of Ngorongoro Crater",
          meals: "All Meals Included"
        },
        {
          day: 6,
          accommodation: "End of tour",
          accommodationType: "(No accommodation)",
          meals: "Breakfast Included"
        }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Tarangire National Park",
        description: "We will pick you up from your hotel at 8 am and take you to a very special national park. Tarangire is famous for its diverse landscape with nine different vegetation zones. The park is particularly known for the abundance of Ancient Baobab trees (the largest trees on the continent) which fill the landscape and dwarf the animals next to them. The river of the park is full of wildlife ranging from a large variety of birds to lions, leopards, zebras, giraffes, buffaloes, antelopes, and, of course, elephants. In fact, the park has the largest concentration of elephants in the whole country and provides unique chances to observe the interaction between elephant families. The lunch area is fascinating, boasting an observatory with amazing views of the river and wildlife (with good chances of seeing a hunt while having your picnic). In the afternoon we will still do a game drive before continuing to your accommodation.",
        accommodation: "Tarangire Sopa Lodge",
        accommodationType: "Mid-range lodge located inside Tarangire NP",
        meals: "All meals included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to November (Animals come to the Tarangire River)",
        highSeason: "June to October (The park is full of visitors)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Abundant" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 2,
        location: "Lake Manyara NP",
        description: "A beautiful short journey across the Great Rift Valley until Lake Manyara National Park for a full-day game drive. Although small in dimension (205 sq. miles), the park has breathtaking scenery and is well famous for its lush acacia forest, giant figs, and mahogany trees, as well as for a growing population of baboons and blue monkeys. Permanent residents of this park also include giraffes, elephants, impalas, and a huge amount of buffaloes. The lake is also home to a large number of hippos. The landscapes of Lake Manyara are something that can not be described with words, and the game drives along the lake provide stunning photo opportunities of giraffes and buffaloes in the foreground and the lake (and its flamingos) in the background. During this day, some possible extra tours are possible, including a bike tour or a boat excursion. In the afternoon, transfer to the camp for dinner.",
        accommodation: "Escarpment Luxury Lodge Manyara",
        accommodationType: "Luxury lodge on the escarpment above Lake Manyara NP",
        meals: "All meals included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Easier to spot animals)",
        highSeason: "July to March (The northern section gets crowded)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Zebra", abundance: "Common" },
          { animal: "Wildebeest", abundance: "Common" },
          { animal: "Hippo", abundance: "Common" }
        ]
      },
      {
        day: "3-4",
        location: "Serengeti NP",
        description: "After an early breakfast, depart towards the most famous National park in the World, the Serengeti. You will drive up the crater highlands, making a quick stop at the rim for an out of this world view of Ngorongoro Crater. This will be an unforgettable moment for anyone seeing it for the first time. As you progress well into the Serengeti, you will see why the name means, in Swahili, 'endless plains'. The park has 6,900 sq. miles and for most of it, the plains will stretch to the horizon defying your senses and perception of distances. It is the home of the Great Migration and to 2 million wildebeests, hundreds of thousands of zebras, and all kinds of antelopes including the abundant impalas and Thomson's gazelles. As for Big Cats and large predators, it's the place of choice to look out for lions, cheetahs, leopards, hyenas, with many television scenes like the famous river crossings having been filmed in this park.\n\nFull day in the Serengeti National Park. We are completely flexible with your preferences and this day will be organized according to your wishes. On every day of the safari, your guide will discuss with you the best timings for you, including the game drives and the wake-up time. For example, on this day, you could do a morning game drive, return to the camp for lunch and relaxation and finish with an afternoon game drive, or you could do a full day game drive with a picnic lunch.",
        accommodation: "Nyikani Camp Central Serengeti",
        accommodationType: "Mid-range tented camp inside Central Serengeti NP",
        meals: "All meals included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to February and June to October (Different areas are best at different times)",
        highSeason: "July to March (The Seronera area is crowded)",
        bestWeather: "June to October (Little to no rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 5,
        location: "Ngorongoro Crater",
        description: "On this day we suggest a very early wake up in order to do an early morning game drive (when the animals are more active) and see one of the best sunrises you'll ever witness. After the game drive, we return to the camp for a rewarding brunch, and then we'll proceed to Ngorongoro, the 8th wonder of the Natural World. The crater spreads for 102 sq. miles and has 2.000 ft high walls, making it virtually Noah's ark and inhabiting almost every species of wildlife that is indigenous to East Africa. It's one of the very rare locations in the whole continent where you can witness the Black Rhino. The crater has a river, several swamps, a soda lake with a great concentration of flamingos, a forest, and open plains. It's also famous for its elephants which, are the largest in the world and have huge tusks. Ngorongoro Crater is truly a Wonder of the Natural World.\n\nYou will reach Ngorongoro in time for a sundowner.",
        accommodation: "Ngorongoro Serena Safari Lodge",
        accommodationType: "Luxury lodge on the crater rim of Ngorongoro Crater",
        meals: "All meals included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Wildlife viewing is best)",
        highSeason: "Most of the year – July to March (Expect crowds)",
        bestWeather: "June to October (Rainfall is little to none)",
        wildlife: [
          { animal: "Black Rhino", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" },
          { animal: "Hyena", abundance: "Abundant" }
        ]
      },
      {
        day: 6,
        location: "Ngorongoro",
        description: "We will start the day very early and descend into the crater floor for an incredible morning of wildlife in one of the most stunning places on Earth. After the game drive, there will be time for a picnic lunch near the beautiful hippo Lake. After lunch, we will have time for a short game drive and then ascend the crater and exit Ngorongoro Conservation Area towards Arusha. We expect to be back in Arusha around 5 pm although we are flexible in case there is a flight to catch or another situation.",
        accommodation: "End of tour",
        accommodationType: "(No accommodation)",
        meals: "Breakfast (Lunch & dinner not included)",
        drinks: "Drinks not included",
        images: [],
        bestTimeToVisit: "",
        highSeason: "",
        bestWeather: "",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. This tour accepts children of all ages. Children under 12 receive a discount and children under 2 are free.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$4,065",
          oneRoomTwoPeople: "$2,670",
          oneRoomThreePeople: "$2,250",
          oneRoomFourPeople: "$2,190",
          twoRoomsFivePeople: "$2,070",
          threeRoomsSixPeople: "$2,070"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$5,070",
          oneRoomTwoPeople: "$3,340",
          oneRoomThreePeople: "$2,920",
          oneRoomFourPeople: "$2,860",
          twoRoomsFivePeople: "$2,740",
          threeRoomsSixPeople: "$2,740"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        }
      ]
    },
    inclusions: {
      included: [
        "Park fees (For non-residents)",
        "All activities (Unless labeled as optional)",
        "All accommodation (Unless listed as upgrade)",
        "A professional driver/guide",
        "All transportation (Unless labeled as optional)",
        "All Taxes/VAT",
        "Roundtrip airport transfer",
        "Meals (As specified in the day-by-day section)",
        "Drinks (As specified in the day-by-day section)"
      ],
      excluded: [
        "International flights (From/to home)",
        "Additional accommodation before and at the end of the tour",
        "Tips (Tipping guideline US$10.00 pp per day)",
        "Personal items (Souvenirs, travel insurance, visa fees, etc.)",
        "Government imposed increase of taxes and/or park fees"
      ]
    },
    gettingThere: {
      description: "This tour starts and ends in Arusha",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to/from Kilimanjaro Airport (JRO - Check price) near Arusha. Or fly to/from Arusha Airport (ARK - Check price) via Dar es Salaam or Nairobi (Kenya).",
        "A transfer from and back to the airport is included.",
        "Additional accommodation before and at the end of the tour can be arranged for an extra cost."
      ]
    }
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
    destinations: [
      "Moshi",
      "Marangu Gate",
      "Mandara Huts",
      "Horombo Huts",
      "Kibo Huts",
      "Uhuru Peak",
      "Mweka Gate"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Moshi (Day 1)",
      end: "Moshi (Day 5)",
      days: [
        { day: 1, location: "Moshi", description: "Arrival in Moshi. Briefing and equipment check. Overnight at hotel in Moshi." },
        { day: 2, location: "Marangu Gate -> Mandara Huts", description: "Drive to Marangu Gate for registration. Start trek through the rainforest to Mandara Huts (2,700m)." },
        { day: 3, location: "Mandara Huts -> Horombo Huts", description: "Continue trek through moorland to Horombo Huts (3,720m)." },
        { day: 4, location: "Horombo Huts -> Kibo Huts", description: "Ascend to Kibo Huts (4,700m) near the crater rim. Early rest for summit attempt." },
        { day: 5, location: "Kibo Huts -> Uhuru Peak -> Mweka Gate", description: "Very early start for summit attempt. Descend via Mweka Route to Mweka Gate. Transfer to Moshi." }
      ]
    },
    tourFeatures: [
      "Mid-range tour",
      "Shared tour (Max 12 climbers per group)",
      "Can start any day",
      "Can be customized (different routes available)",
      "Suitable for moderate fitness levels",
      "Minimum age of 10 years"
    ],
    activitiesTransportation: {
      activities: ["trekking", "camping"],
      vehicle: "4x4 safari vehicle (transfers)",
      transfer: "A transfer from and back to the airport/hotel is included"
    },
    accommodationMeals: {
      note: "Hut accommodation is included on the mountain. Hotel accommodation in Moshi before/after trek can be arranged for an extra cost.",
      schedule: [
        { day: 1, accommodation: "Hotel in Moshi", accommodationType: "Mid-range hotel", meals: "Dinner Included" },
        { day: 2, accommodation: "Mandara Huts", accommodationType: "Basic mountain hut", meals: "All Meals Included" },
        { day: 3, accommodation: "Horombo Huts", accommodationType: "Basic mountain hut", meals: "All Meals Included" },
        { day: 4, accommodation: "Kibo Huts", accommodationType: "Basic mountain hut", meals: "All Meals Included" },
        { day: 5, accommodation: "None (Day Trek)", accommodationType: "Day Trek", meals: "Breakfast & Lunch Included" }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Moshi",
        description: "Arrival at Kilimanjaro International Airport or by road to Moshi. Meet and greet by our representative and transfer to your hotel in Moshi for overnight. Briefing session in the evening covering gear check, itinerary, and safety protocols.",
        accommodation: "Selected Hotel in Moshi",
        accommodationType: "Mid-range hotel",
        meals: "Dinner Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to March & June to October",
        highSeason: "July to September",
        bestWeather: "Dry seasons (January-March, June-October)",
        wildlife: []
      },
      {
        day: 2,
        location: "Marangu Gate -> Mandara Huts",
        description: "Drive to Marangu Gate (approx. 1 hour) for registration and permit check. Start trek through the lush montane forest, home to blue monkeys and colorful birds. Ascend gradually to Mandara Huts (2,700m) for overnight stay.",
        accommodation: "Mandara Huts",
        accommodationType: "Basic mountain hut",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to March & June to October",
        highSeason: "July to September",
        bestWeather: "Dry seasons (January-March, June-October)",
        wildlife: [
          { animal: "Blue Monkey", abundance: "Common" },
          { animal: "Colobus Monkey", abundance: "Common" },
          { animal: "Various Birds", abundance: "Abundant" }
        ]
      },
      {
        day: 3,
        location: "Mandara Huts -> Horombo Huts",
        description: "Continue trek through the moorland zone, passing heather and giant lobelias. The landscape becomes more open with expansive views. Reach Horombo Huts (3,720m) for overnight stay.",
        accommodation: "Horombo Huts",
        accommodationType: "Basic mountain hut",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to March & June to October",
        highSeason: "July to September",
        bestWeather: "Dry seasons (January-March, June-October)",
        wildlife: [
          { animal: "Elephants", abundance: "Rare (Seen at lower altitudes)" },
          { animal: "Various Birds", abundance: "Common" }
        ]
      },
      {
        day: 4,
        location: "Horombo Huts -> Kibo Huts",
        description: "Ascend to the alpine desert zone. The terrain becomes increasingly rocky and barren. Reach Kibo Huts (4,700m) near the crater rim. Early dinner and rest in preparation for the summit attempt.",
        accommodation: "Kibo Huts",
        accommodationType: "Basic mountain hut",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to March & June to October",
        highSeason: "July to September",
        bestWeather: "Dry seasons (January-March, June-October)",
        wildlife: []
      },
      {
        day: 5,
        location: "Kibo Huts -> Uhuru Peak -> Mweka Gate",
        description: "Very early start (around midnight) for the summit attempt. Trek through the night to Stella Point (5,700m) and then to Uhuru Peak (5,895m), the highest point in Africa. Descend via the Mweka Route to Mweka Gate (approx. 3-4 hours). Transfer back to your hotel in Moshi.",
        accommodation: "None (Day Trek)",
        accommodationType: "Day Trek",
        meals: "Breakfast & Lunch Included",
        drinks: "Drinks not included",
        images: [],
        bestTimeToVisit: "January to March & June to October",
        highSeason: "July to September",
        bestWeather: "Dry seasons (January-March, June-October)",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. Prices vary based on group size and season. A single supplement may apply for hut accommodation. Porters and tips are extra.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$2,200",
          oneRoomTwoPeople: "$1,750",
          oneRoomThreePeople: "$1,600",
          oneRoomFourPeople: "$1,550",
          twoRoomsFivePeople: "$1,500",
          threeRoomsSixPeople: "$1,500"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$2,200",
          oneRoomTwoPeople: "$1,750",
          oneRoomThreePeople: "$1,600",
          oneRoomFourPeople: "$1,550",
          twoRoomsFivePeople: "$1,500",
          threeRoomsSixPeople: "$1,500"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$2,000",
          oneRoomTwoPeople: "$1,600",
          oneRoomThreePeople: "$1,450",
          oneRoomFourPeople: "$1,400",
          twoRoomsFivePeople: "$1,350",
          threeRoomsSixPeople: "$1,350"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$2,550",
          oneRoomTwoPeople: "$1,980",
          oneRoomThreePeople: "$1,830",
          oneRoomFourPeople: "$1,780",
          twoRoomsFivePeople: "$1,730",
          threeRoomsSixPeople: "$1,730"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$2,200",
          oneRoomTwoPeople: "$1,750",
          oneRoomThreePeople: "$1,600",
          oneRoomFourPeople: "$1,550",
          twoRoomsFivePeople: "$1,500",
          threeRoomsSixPeople: "$1,500"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$2,500",
          oneRoomTwoPeople: "$1,950",
          oneRoomThreePeople: "$1,800",
          oneRoomFourPeople: "$1,750",
          twoRoomsFivePeople: "$1,700",
          threeRoomsSixPeople: "$1,700"
        }
      ]
    },
    inclusions: {
      included: [
        "All accommodation during trek (huts)",
        "All meals as per itinerary",
        "Park entrance fees",
        "Services of an expert mountain guide and porter",
        "Transportation to/from trailheads",
        "Airport transfer (Moshi)",
        "All necessary camping equipment"
      ],
      excluded: [
        "International flights",
        "Tanzania visa",
        "Travel insurance",
        "Alcoholic drinks",
        "Tips/gratuities",
        "Personal expenses",
        "Hotel in Moshi before/after trek (unless specified)"
      ]
    },
    gettingThere: {
      description: "This tour starts and ends in Moshi",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to/from Kilimanjaro Airport (JRO - Check price) near Moshi.",
        "A transfer from and back to the airport/hotel in Moshi is included.",
        "Additional accommodation before and at the end of the trek in Moshi can be arranged for an extra cost."
      ]
    }
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
    destinations: [
      "Dar es Salaam",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park",
      "Ngorongoro Crater",
      "Arusha",
      "Nairobi",
      "Maasai Mara National Reserve"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Dar es Salaam (Day 1)",
      end: "Nairobi (Day 10)",
      days: [
        { day: 1, location: "Dar es Salaam", description: "Arrival at Julius Nyerere International Airport. Meet and greet by our representative and transfer to your hotel in Dar es Salaam for overnight." },
        { day: 2, location: "Dar es Salaam -> Arusha", description: "Drive to Arusha (approx. 8-9 hours). Overnight at hotel in Arusha." },
        { day: 3, location: "Tarangire NP", description: "Drive to Tarangire National Park. Game drive with focus on large elephant herds. Overnight at camp." },
        { day: 4, location: "Lake Manyara NP", description: "Drive to Lake Manyara National Park. Game drive in the afternoon. Overnight at lodge." },
        { day: "5-6", location: "Serengeti NP", description: "Drive to Serengeti National Park via Ngorongoro Highlands. Arrive in time for lunch and afternoon game drive. Spend 2 nights at camp." },
        { day: 7, location: "Ngorongoro Crater", description: "Early breakfast and descend into the Ngorongoro Crater for a full-day game drive. Picnic lunch inside the crater. Return to Arusha. Overnight at lodge." },
        { day: 8, location: "Arusha -> Nairobi -> Maasai Mara", description: "Drive to the Kenyan border. Cross border and continue to Nairobi. Fly from Nairobi Wilson Airport to Maasai Mara. Game drive en route to camp. Overnight at camp." },
        { day: 9, location: "Maasai Mara NP", description: "Full day game drive in the Maasai Mara. Look for the Big Five and the Great Migration (seasonal). Overnight at camp." },
        { day: 10, location: "Maasai Mara -> Nairobi", description: "Morning game drive. Fly back to Nairobi Wilson Airport. Transfer to your hotel. Overnight in Nairobi." }
      ]
    },
    tourFeatures: [
      "Luxury tour",
      "Private tour",
      "Can start any day",
      "Can be customized",
      "Suitable for solo travelers",
      "Minimum age of 18 years"
    ],
    activitiesTransportation: {
      activities: ["game drives"],
      vehicle: "pop-up roof 4x4 vehicle",
      transfer: "A transfer from and back to the airport is included"
    },
    accommodationMeals: {
      note: "Additional accommodation before and at the end of the tour can be arranged for an extra cost",
      schedule: [
        { day: 1, accommodation: "Selected Hotel in Dar es Salaam", accommodationType: "Mid-range hotel", meals: "Breakfast & Dinner Included" },
        { day: 2, accommodation: "Hotel in Arusha", accommodationType: "Mid-range hotel", meals: "All Meals Included" },
        { day: 3, accommodation: "Tarangire Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 4, accommodation: "Lake Manyara Lodge", accommodationType: "Luxury lodge", meals: "All Meals Included" },
        { day: "5-6", accommodation: "Dove Serengeti Camp", accommodationType: "Luxury tented camp inside Central Serengeti NP", meals: "All Meals Included" },
        { day: 7, accommodation: "Arusha Lodge", accommodationType: "Luxury lodge", meals: "All Meals Included" },
        { day: 8, accommodation: "Maasai Mara Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 9, accommodation: "Maasai Mara Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 10, accommodation: "Hotel in Nairobi", accommodationType: "Mid-range hotel", meals: "Breakfast & Lunch Included" }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Dar es Salaam",
        description: "Arrival at Julius Nyerere International Airport. Meet and greet by our representative and transfer to your hotel in Dar es Salaam for overnight.",
        accommodation: "Selected Hotel in Dar es Salaam",
        accommodationType: "Mid-range hotel",
        meals: "Breakfast & Dinner Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      },
      {
        day: 2,
        location: "Dar es Salaam -> Arusha",
        description: "Drive to Arusha (approx. 8-9 hours). Pass through scenic landscapes and small towns. Stop for lunch en route. Overnight at hotel in Arusha.",
        accommodation: "Hotel in Arusha",
        accommodationType: "Mid-range hotel",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      },
      {
        day: 3,
        location: "Tarangire NP",
        description: "Drive to Tarangire National Park (approx. 2-3 hours). Game drive in the afternoon. Look for large elephant herds, baobab trees, and diverse birdlife. Overnight at camp.",
        accommodation: "Tarangire Camp",
        accommodationType: "Luxury tented camp",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to November (Animals come to the Tarangire River)",
        highSeason: "June to October (The park is full of visitors)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Abundant" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 4,
        location: "Lake Manyara NP",
        description: "Drive to Lake Manyara National Park (approx. 3-4 hours). Game drive in the afternoon. Look for tree-climbing lions, elephants, and flamingos along the alkaline lake shore. Overnight at lodge.",
        accommodation: "Lake Manyara Lodge",
        accommodationType: "Luxury lodge",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Easier to spot animals)",
        highSeason: "July to March (The northern section gets crowded)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Zebra", abundance: "Common" },
          { animal: "Wildebeest", abundance: "Common" },
          { animal: "Hippo", abundance: "Common" }
        ]
      },
      {
        day: "5-6",
        location: "Serengeti NP",
        description: "Drive to Serengeti National Park via Ngorongoro Highlands (approx. 6-7 hours total). Stop at Olduvai Gorge. Arrive in time for lunch and afternoon game drive. Spend 2 nights at camp.",
        accommodation: "Dove Serengeti Camp",
        accommodationType: "Luxury tented camp inside Central Serengeti NP",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to February and June to October (Different areas are best at different times)",
        highSeason: "July to March (The Seronera area is crowded)",
        bestWeather: "June to October (Little to no rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 7,
        location: "Ngorongoro Crater",
        description: "Early breakfast and descend into the Ngorongoro Crater for a full-day game drive. Picnic lunch inside the crater. Return to Arusha. Overnight at lodge.",
        accommodation: "Arusha Lodge",
        accommodationType: "Luxury lodge",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Wildlife viewing is best)",
        highSeason: "Most of the year – July to March (Expect crowds)",
        bestWeather: "June to October (Rainfall is little to none)",
        wildlife: [
          { animal: "Black Rhino", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" },
          { animal: "Hyena", abundance: "Abundant" }
        ]
      },
      {
        day: 8,
        location: "Arusha -> Nairobi -> Maasai Mara",
        description: "Drive to the Kenyan border (approx. 3 hours). Cross border and continue to Nairobi (approx. 1 hour). Fly from Nairobi Wilson Airport to Maasai Mara (approx. 45 mins). Game drive en route to camp. Overnight at camp.",
        accommodation: "Maasai Mara Camp",
        accommodationType: "Luxury tented camp",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to October (Great Migration)",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: [
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Leopard", abundance: "Common" },
          { animal: "Elephant", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Rhino", abundance: "Rare" },
          { animal: "Wildebeest", abundance: "Abundant (Seasonal)" },
          { animal: "Zebra", abundance: "Abundant (Seasonal)" }
        ]
      },
      {
        day: 9,
        location: "Maasai Mara NP",
        description: "Full day game drive in the Maasai Mara. Look for the Big Five and the Great Migration (seasonal). Overnight at camp.",
        accommodation: "Maasai Mara Camp",
        accommodationType: "Luxury tented camp",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to October (Great Migration)",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: [
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Leopard", abundance: "Common" },
          { animal: "Elephant", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Rhino", abundance: "Rare" },
          { animal: "Wildebeest", abundance: "Abundant (Seasonal)" },
          { animal: "Zebra", abundance: "Abundant (Seasonal)" }
        ]
      },
      {
        day: 10,
        location: "Maasai Mara -> Nairobi",
        description: "Morning game drive. Fly back to Nairobi Wilson Airport (approx. 45 mins). Transfer to your hotel in Nairobi. Overnight in Nairobi.",
        accommodation: "Hotel in Nairobi",
        accommodationType: "Mid-range hotel",
        meals: "Breakfast & Lunch Included",
        drinks: "Drinks not included",
        images: [],
        bestTimeToVisit: "July to October (Great Migration)",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. Prices vary based on group size, season, and accommodation upgrades. Children under 12 receive a discount, children under 2 are free. A single supplement may apply. Cross-border permits and domestic flights are included.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$5,800",
          oneRoomTwoPeople: "$3,700",
          oneRoomThreePeople: "$3,300",
          oneRoomFourPeople: "$3,200",
          twoRoomsFivePeople: "$3,100",
          threeRoomsSixPeople: "$3,100"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$5,800",
          oneRoomTwoPeople: "$3,700",
          oneRoomThreePeople: "$3,300",
          oneRoomFourPeople: "$3,200",
          twoRoomsFivePeople: "$3,100",
          threeRoomsSixPeople: "$3,100"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$5,200",
          oneRoomTwoPeople: "$3,300",
          oneRoomThreePeople: "$2,900",
          oneRoomFourPeople: "$2,800",
          twoRoomsFivePeople: "$2,700",
          threeRoomsSixPeople: "$2,700"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$6,550",
          oneRoomTwoPeople: "$4,250",
          oneRoomThreePeople: "$3,850",
          oneRoomFourPeople: "$3,750",
          twoRoomsFivePeople: "$3,650",
          threeRoomsSixPeople: "$3,650"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$5,800",
          oneRoomTwoPeople: "$3,700",
          oneRoomThreePeople: "$3,300",
          oneRoomFourPeople: "$3,200",
          twoRoomsFivePeople: "$3,100",
          threeRoomsSixPeople: "$3,100"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$6,500",
          oneRoomTwoPeople: "$4,200",
          oneRoomThreePeople: "$3,800",
          oneRoomFourPeople: "$3,700",
          twoRoomsFivePeople: "$3,600",
          threeRoomsSixPeople: "$3,600"
        }
      ]
    },
    inclusions: {
      included: [
        "All accommodation (9 nights)",
        "All meals as per itinerary",
        "Park entrance fees (Tanzania & Kenya)",
        "Game drives",
        "Services of an expert driver-guide",
        "4x4 pop-up roof safari vehicle",
        "Airport transfers (Arrival & Departure)",
        "Cross-border permits",
        "Domestic flights (Nairobi - Mara - Nairobi)"
      ],
      excluded: [
        "International flights",
        "Tanzania & Kenya visas",
        "Travel insurance",
        "Alcoholic drinks",
        "Tips/gratuities",
        "Personal expenses"
      ]
    },
    gettingThere: {
      description: "This tour starts in Dar es Salaam and ends in Nairobi",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to Julius Nyerere International Airport (DAR) in Dar es Salaam.",
        "Fly from Wilson Airport (NBO) in Nairobi at the end of the tour.",
        "A transfer from and back to the airports is included.",
        "Additional accommodation before and at the end of the tour can be arranged for an extra cost."
      ]
    }
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
    destinations: [
      "Zanzibar Airport",
      "Stone Town",
      "Paje Beach",
      "Matemwe Beach",
      "Nungwi Beach"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Zanzibar Airport (Day 1)",
      end: "Zanzibar Airport (Day 3)",
      days: [
        { day: 1, location: "Zanzibar", description: "Arrival at Abeid Amani Karume International Airport. Meet and greet by our representative and transfer to your beach resort. Relax and enjoy the beach. Overnight at resort." },
        { day: 2, location: "Zanzibar", description: "Full day at leisure on the beach or optional excursions (e.g., snorkeling, Stone Town tour, spice tour). Overnight at resort." },
        { day: 3, location: "Zanzibar", description: "Breakfast at the resort. Check-out and transfer to the airport for your departure flight." }
      ]
    },
    tourFeatures: [
      "Mid-range tour",
      "Shared tour (Private option available)",
      "Can start any day",
      "Can be customized (Excursions can be added)",
      "Suitable for solo travelers",
      "Minimum age of 16 years"
    ],
    activitiesTransportation: {
      activities: ["beach relaxation", "snorkeling", "stone town tour", "spice tour"],
      vehicle: "Comfortable car/van (transfers & tours)",
      transfer: "A transfer from and back to the airport is included"
    },
    accommodationMeals: {
      note: "Additional accommodation before and at the end of the tour can be arranged for an extra cost",
      schedule: [
        { day: 1, accommodation: "Selected Beach Resort", accommodationType: "Mid-range beach resort", meals: "Half Board Included" },
        { day: 2, accommodation: "Selected Beach Resort", accommodationType: "Mid-range beach resort", meals: "Half Board Included" },
        { day: 3, accommodation: "None", accommodationType: "End of tour", meals: "Breakfast Included" }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Zanzibar",
        description: "Arrival at Abeid Amani Karume International Airport. Meet and greet by our representative and transfer to your beach resort. Check-in and relax on the beach. Enjoy the resort facilities. Overnight at resort.",
        accommodation: "Selected Beach Resort",
        accommodationType: "Mid-range beach resort",
        meals: "Half Board Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      },
      {
        day: 2,
        location: "Zanzibar",
        description: "Full day at leisure on the beach or optional excursions. Popular options include snorkeling in the coral reefs, a guided tour of historic Stone Town, or a visit to a local spice plantation. Overnight at resort.",
        accommodation: "Selected Beach Resort",
        accommodationType: "Mid-range beach resort",
        meals: "Half Board Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      },
      {
        day: 3,
        location: "Zanzibar",
        description: "Breakfast at the resort. Check-out and transfer to the airport for your departure flight.",
        accommodation: "None",
        accommodationType: "End of tour",
        meals: "Breakfast Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. Prices vary based on group size, season, and accommodation upgrades. Children under 12 receive a discount, children under 2 are free. A single supplement may apply.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$1,000",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$1,000",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$900",
          oneRoomTwoPeople: "$650",
          oneRoomThreePeople: "$550",
          oneRoomFourPeople: "$500",
          twoRoomsFivePeople: "$450",
          threeRoomsSixPeople: "$450"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$1,250",
          oneRoomTwoPeople: "$900",
          oneRoomThreePeople: "$800",
          oneRoomFourPeople: "$750",
          twoRoomsFivePeople: "$700",
          threeRoomsSixPeople: "$700"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$1,000",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$850",
          oneRoomThreePeople: "$750",
          oneRoomFourPeople: "$700",
          twoRoomsFivePeople: "$650",
          threeRoomsSixPeople: "$650"
        }
      ]
    },
    inclusions: {
      included: [
        "All accommodation (2 nights)",
        "Half board meals as per itinerary",
        "Airport transfers (Arrival & Departure)",
        "Use of resort facilities (pool, beach access)"
      ],
      excluded: [
        "International flights",
        "Tanzania visa",
        "Travel insurance",
        "Alcoholic drinks",
        "Tips/gratuities",
        "Personal expenses",
        "Optional excursions"
      ]
    },
    gettingThere: {
      description: "This tour starts and ends in Zanzibar",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to/from Abeid Amani Karume International Airport (ZNZ - Check price) on Zanzibar Island.",
        "A transfer from and back to the airport is included.",
        "Additional accommodation before and at the end of the tour can be arranged for an extra cost."
      ]
    }
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
    duration: 7,
    price: 2800,
    startingFrom: "Arusha",
    comfortLevel: "luxury",
    tourType: "private",
    safariType: "lodge",
    specializedTours: ["family", "honeymoon"],
    features: ["airport transfer included", "itinerary customizable"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Witness the Great Migration in the Serengeti",
      "Explore the Ngorongoro Crater, a UNESCO World Heritage Site",
      "Stay in luxury lodges with stunning views",
      "Expert local guides and 4x4 vehicles"
    ],
    destinations: [
      "Arusha",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Serengeti National Park",
      "Ngorongoro Crater"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Arusha (Day 1)",
      end: "Arusha (Day 7)",
      days: [
        { day: 1, location: "Arusha", description: "Arrival at Kilimanjaro International Airport. Meet and greet by our representative and transfer to your hotel in Arusha for overnight." },
        { day: 2, location: "Lake Manyara NP", description: "Drive to Lake Manyara National Park ( approx. 3-4 hours). Game drive in the afternoon. Overnight at lodge." },
        { day: 3, location: "Serengeti NP", description: "Full day game drive to Serengeti National Park via Ngorongoro Highlands. Arrive in time for lunch and afternoon game drive. Overnight at camp." },
        { day: 4, location: "Serengeti NP", description: "Full day game drive in the vast Serengeti plains. Witness the Great Migration if timing allows. Overnight at camp." },
        { day: 5, location: "Ngorongoro Crater", description: "Early breakfast and descend into the Ngorongoro Crater for a full-day game drive. Picnic lunch inside the crater. Return to Arusha. Overnight at lodge." },
        { day: 6, location: "Tarangire NP", description: "Drive to Tarangire National Park. Game drive with focus on large elephant herds. Overnight at camp." },
        { day: 7, location: "Kilimanjaro Airport", description: "Breakfast at the camp/lodge. Drive to Kilimanjaro International Airport for your departure flight." }
      ]
    },
    tourFeatures: [
      "Luxury tour",
      "Private tour",
      "Can start any day",
      "Can be customized",
      "Suitable for solo travelers",
      "Minimum age of 18 years"
    ],
    activitiesTransportation: {
      activities: ["game drives"],
      vehicle: "pop-up roof 4x4 vehicle",
      transfer: "A transfer from and back to the airport is included"
    },
    accommodationMeals: {
      note: "Additional accommodation before and at the end of the tour can be arranged for an extra cost",
      schedule: [
        { day: 1, accommodation: "Selected Hotel in Arusha", accommodationType: "Mid-range hotel", meals: "Breakfast & Dinner Included" },
        { day: 2, accommodation: "Lake Manyara Lodge", accommodationType: "Luxury lodge", meals: "All Meals Included" },
        { day: 3, accommodation: "Central Serengeti Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 4, accommodation: "Central Serengeti Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 5, accommodation: "Arusha Lodge", accommodationType: "Luxury lodge", meals: "All Meals Included" },
        { day: 6, accommodation: "Tarangire Camp", accommodationType: "Luxury tented camp", meals: "All Meals Included" },
        { day: 7, accommodation: "None", accommodationType: "End of tour", meals: "Breakfast & Lunch Included" }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Arusha",
        description: "Arrival at Kilimanjaro International Airport. Meet and greet by our representative and transfer to your hotel in Arusha for overnight.",
        accommodation: "Selected Hotel in Arusha",
        accommodationType: "Mid-range hotel",
        meals: "Breakfast & Dinner Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      },
      {
        day: 2,
        location: "Lake Manyara NP",
        description: "Drive to Lake Manyara National Park ( approx. 3-4 hours). Game drive in the afternoon. Look for tree-climbing lions, elephants, and flamingos along the alkaline lake shore. Overnight at lodge.",
        accommodation: "Lake Manyara Lodge",
        accommodationType: "Luxury lodge",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Easier to spot animals)",
        highSeason: "July to March (The northern section gets crowded)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Zebra", abundance: "Common" },
          { animal: "Wildebeest", abundance: "Common" },
          { animal: "Hippo", abundance: "Common" }
        ]
      },
      {
        day: 3,
        location: "Serengeti NP",
        description: "Full day game drive to Serengeti National Park via Ngorongoro Highlands. Arrive in time for lunch and afternoon game drive. Spend 2 nights at camp.",
        accommodation: "Central Serengeti Camp",
        accommodationType: "Luxury tented camp inside Central Serengeti NP",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to February and June to October (Different areas are best at different times)",
        highSeason: "July to March (The Seronera area is crowded)",
        bestWeather: "June to October (Little to no rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 4,
        location: "Serengeti NP",
        description: "Full day game drive in the vast Serengeti plains. Witness the Great Migration if timing allows. Spot lions, leopards, cheetahs, elephants, giraffes, zebras, and wildebeest. Overnight at camp.",
        accommodation: "Central Serengeti Camp",
        accommodationType: "Luxury tented camp inside Central Serengeti NP",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "January to February and June to October (Different areas are best at different times)",
        highSeason: "July to March (The Seronera area is crowded)",
        bestWeather: "June to October (Little to no rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Cheetah", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 5,
        location: "Ngorongoro Crater",
        description: "Early breakfast and descend into the Ngorongoro Crater for a full-day game drive. Picnic lunch inside the crater. Return to Arusha. Overnight at lodge.",
        accommodation: "Arusha Lodge",
        accommodationType: "Luxury lodge",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Wildlife viewing is best)",
        highSeason: "Most of the year – July to March (Expect crowds)",
        bestWeather: "June to October (Rainfall is little to none)",
        wildlife: [
          { animal: "Black Rhino", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" },
          { animal: "Hyena", abundance: "Abundant" }
        ]
      },
      {
        day: 6,
        location: "Tarangire NP",
        description: "Drive to Tarangire National Park. Game drive with focus on large elephant herds. Overnight at camp.",
        accommodation: "Tarangire Camp",
        accommodationType: "Luxury tented camp",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to November (Animals come to the Tarangire River)",
        highSeason: "June to October (The park is full of visitors)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Abundant" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 7,
        location: "Kilimanjaro Airport",
        description: "Breakfast at the camp/lodge. Drive to Kilimanjaro International Airport for your departure flight.",
        accommodation: "None",
        accommodationType: "End of tour",
        meals: "Breakfast & Lunch Included",
        drinks: "Drinks not included",
        images: [],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. Prices vary based on group size, season, and accommodation upgrades. Children under 12 receive a discount, children under 2 are free. A single supplement may apply.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$4,065",
          oneRoomTwoPeople: "$2,670",
          oneRoomThreePeople: "$2,250",
          oneRoomFourPeople: "$2,190",
          twoRoomsFivePeople: "$2,070",
          threeRoomsSixPeople: "$2,070"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$5,070",
          oneRoomTwoPeople: "$3,340",
          oneRoomThreePeople: "$2,920",
          oneRoomFourPeople: "$2,860",
          twoRoomsFivePeople: "$2,740",
          threeRoomsSixPeople: "$2,740"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$4,500",
          oneRoomTwoPeople: "$2,960",
          oneRoomThreePeople: "$2,540",
          oneRoomFourPeople: "$2,480",
          twoRoomsFivePeople: "$2,360",
          threeRoomsSixPeople: "$2,360"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$5,025",
          oneRoomTwoPeople: "$3,310",
          oneRoomThreePeople: "$2,890",
          oneRoomFourPeople: "$2,830",
          twoRoomsFivePeople: "$2,710",
          threeRoomsSixPeople: "$2,710"
        }
      ]
    },
    inclusions: {
      included: [
        "All accommodation (6 nights)",
        "All meals as per itinerary",
        "Park entrance fees",
        "Game drives",
        "Services of an expert driver-guide",
        "4x4 pop-up roof safari vehicle",
        "Airport transfers (Arrival & Departure)"
      ],
      excluded: [
        "International flights",
        "Tanzania visa",
        "Travel insurance",
        "Alcoholic drinks",
        "Tips/gratuities",
        "Personal expenses"
      ]
    },
    gettingThere: {
      description: "This tour starts and ends in Arusha",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to/from Kilimanjaro Airport (JRO - Check price) near Arusha. Or fly to/from Arusha Airport (ARK - Check price) via Dar es Salaam or Nairobi (Kenya).",
        "A transfer from and back to the airport is included.",
        "Additional accommodation before and at the end of the tour can be arranged for an extra cost."
      ]
    }
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
    destinations: [
      "Arusha",
      "Tarangire National Park",
      "Lake Manyara National Park",
      "Karatu",
      "Arusha"
    ],
    // --- Detailed Data for Tabs ---
    route: {
      start: "Arusha (Day 1)",
      end: "Arusha (Day 4)",
      days: [
        { day: 1, location: "Arusha", description: "Pickup from your hotel in Arusha. Drive to Tarangire National Park. Game drive in the afternoon. Overnight camping." },
        { day: 2, location: "Tarangire NP", description: "Full day game drive in Tarangire National Park. Focus on elephants and baobab trees. Overnight camping." },
        { day: 3, location: "Lake Manyara NP", description: "Drive to Lake Manyara National Park. Game drive to see tree-climbing lions and flamingos. Overnight camping." },
        { day: 4, location: "Arusha", description: "Morning game drive. Drive back to Arusha. Drop-off at your hotel or the airport." }
      ]
    },
    tourFeatures: [
      "Budget tour",
      "Shared tour (Max 8 travelers per group)",
      "Can start any day",
      "Can be customized (Limited options)",
      "Suitable for budget-conscious travelers",
      "Minimum age of 12 years"
    ],
    activitiesTransportation: {
      activities: ["game drives", "camping"],
      vehicle: "pop-up roof 4x4 vehicle",
      transfer: "A transfer from and back to the airport/hotel is included"
    },
    accommodationMeals: {
      note: "Camping under the stars with basic facilities. Additional accommodation before and at the end of the tour can be arranged for an extra cost.",
      schedule: [
        { day: 1, accommodation: "Budget Camp in Tarangire", accommodationType: "Basic camping site", meals: "All Meals Included" },
        { day: 2, accommodation: "Budget Camp in Tarangire", accommodationType: "Basic camping site", meals: "All Meals Included" },
        { day: 3, accommodation: "Budget Camp in Lake Manyara", accommodationType: "Basic camping site", meals: "All Meals Included" },
        { day: 4, accommodation: "None", accommodationType: "End of tour", meals: "Breakfast & Lunch Included" }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    dayByDay: [
      {
        day: 1,
        location: "Arusha",
        description: "Pickup from your hotel in Arusha (approx. 1 hour drive). Drive to Tarangire National Park (approx. 2-3 hours). Game drive in the afternoon. Look for large elephant herds and baobab trees. Overnight camping.",
        accommodation: "Budget Camp in Tarangire",
        accommodationType: "Basic camping site",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to November (Animals come to the Tarangire River)",
        highSeason: "June to October (The park is full of visitors)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Abundant" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 2,
        location: "Tarangire NP",
        description: "Full day game drive in Tarangire National Park. Focus on elephants, baobab trees, and diverse birdlife. The park's varied landscape offers excellent opportunities for photography. Overnight camping.",
        accommodation: "Budget Camp in Tarangire",
        accommodationType: "Basic camping site",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "July to November (Animals come to the Tarangire River)",
        highSeason: "June to October (The park is full of visitors)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Abundant" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Lion", abundance: "Common" },
          { animal: "Buffalo", abundance: "Abundant" },
          { animal: "Zebra", abundance: "Abundant" },
          { animal: "Wildebeest", abundance: "Abundant" }
        ]
      },
      {
        day: 3,
        location: "Lake Manyara NP",
        description: "Drive to Lake Manyara National Park (approx. 3-4 hours). Game drive to see tree-climbing lions and flamingos along the alkaline lake shore. Overnight camping.",
        accommodation: "Budget Camp in Lake Manyara",
        accommodationType: "Basic camping site",
        meals: "All Meals Included",
        drinks: "All drinks (Except for spirits/liquor)",
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1c5e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October (Easier to spot animals)",
        highSeason: "July to March (The northern section gets crowded)",
        bestWeather: "June to October (Little rainfall)",
        wildlife: [
          { animal: "Elephant", abundance: "Common" },
          { animal: "Giraffe", abundance: "Common" },
          { animal: "Buffalo", abundance: "Common" },
          { animal: "Zebra", abundance: "Common" },
          { animal: "Wildebeest", abundance: "Common" },
          { animal: "Hippo", abundance: "Common" }
        ]
      },
      {
        day: 4,
        location: "Arusha",
        description: "Morning game drive. Drive back to Arusha (approx. 3-4 hours). Drop-off at your hotel or the airport.",
        accommodation: "None",
        accommodationType: "End of tour",
        meals: "Breakfast & Lunch Included",
        drinks: "Drinks not included",
        images: [
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        bestTimeToVisit: "June to October",
        highSeason: "July to September",
        bestWeather: "Dry season (June-October)",
        wildlife: []
      }
    ],
    rates: {
      disclaimer: "Rates are per person and exclude the international flight from/to your home country. Prices vary based on group size and season. A single supplement may apply. Camping equipment is provided.",
      pricing: [
        {
          period: "Oct 1, 2025 - Oct 31, 2025",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Nov 1, 2025 - Dec 15, 2025",
          solo: "$1,000",
          oneRoomTwoPeople: "$650",
          oneRoomThreePeople: "$550",
          oneRoomFourPeople: "$500",
          twoRoomsFivePeople: "$450",
          threeRoomsSixPeople: "$450"
        },
        {
          period: "Dec 16, 2025 - Dec 31, 2025",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Jan 1, 2026 - Feb 28, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Mar 1, 2026 - Mar 31, 2026",
          solo: "$1,000",
          oneRoomTwoPeople: "$650",
          oneRoomThreePeople: "$550",
          oneRoomFourPeople: "$500",
          twoRoomsFivePeople: "$450",
          threeRoomsSixPeople: "$450"
        },
        {
          period: "Apr 1, 2026 - May 31, 2026",
          solo: "$900",
          oneRoomTwoPeople: "$550",
          oneRoomThreePeople: "$450",
          oneRoomFourPeople: "$400",
          twoRoomsFivePeople: "$350",
          threeRoomsSixPeople: "$350"
        },
        {
          period: "Jun 1, 2026 - Jun 30, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Jul 1, 2026 - Sep 30, 2026",
          solo: "$1,250",
          oneRoomTwoPeople: "$800",
          oneRoomThreePeople: "$700",
          oneRoomFourPeople: "$650",
          twoRoomsFivePeople: "$600",
          threeRoomsSixPeople: "$600"
        },
        {
          period: "Oct 1, 2026 - Oct 31, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        },
        {
          period: "Nov 1, 2026 - Dec 15, 2026",
          solo: "$1,000",
          oneRoomTwoPeople: "$650",
          oneRoomThreePeople: "$550",
          oneRoomFourPeople: "$500",
          twoRoomsFivePeople: "$450",
          threeRoomsSixPeople: "$450"
        },
        {
          period: "Dec 16, 2026 - Dec 31, 2026",
          solo: "$1,200",
          oneRoomTwoPeople: "$750",
          oneRoomThreePeople: "$650",
          oneRoomFourPeople: "$600",
          twoRoomsFivePeople: "$550",
          threeRoomsSixPeople: "$550"
        }
      ]
    },
    inclusions: {
      included: [
        "All accommodation (3 nights camping)",
        "All meals as per itinerary",
        "Park entrance fees",
        "Game drives",
        "Services of an expert driver-guide",
        "4x4 pop-up roof safari vehicle",
        "Airport/hotel transfers (Arusha)"
      ],
      excluded: [
        "International flights",
        "Tanzania visa",
        "Travel insurance",
        "Alcoholic drinks",
        "Tips/gratuities",
        "Personal expenses"
      ]
    },
    gettingThere: {
      description: "This tour starts and ends in Arusha",
      details: [
        "This operator can help select your international flights, but you'll have to book them yourself.",
        "Fly to/from Kilimanjaro Airport (JRO - Check price) near Arusha.",
        "A transfer from and back to the airport/hotel in Arusha is included.",
        "Additional accommodation before and at the end of the tour can be arranged for an extra cost."
      ]
    }
  }
  // Add more packages as needed...
];

// Filter options data
export const filterOptions = {
  categories: [
    { id: 'all', name: 'All Packages' },
    { id: 'safari', name: 'Safari' },
    { id: 'kilimanjaro', name: 'Kilimanjaro' },
    { id: 'zanzibar', name: 'Zanzibar' },
    { id: 'combined', name: 'Combined' }
  ],
  durations: [
    { id: 'all', name: 'Any Duration' },
    { id: 'short', name: '1-5 Days' },
    { id: 'medium', name: '6-10 Days' },
    { id: 'long', name: '11+ Days' }
  ],
  difficulties: [
    { id: 'all', name: 'Any Difficulty' },
    { id: 'easy', name: 'Easy' },
    { id: 'moderate', name: 'Moderate' },
    { id: 'challenging', name: 'Challenging' }
  ],
  priceRanges: [
    { id: 'all', name: 'Any Price' },
    { id: 'budget', name: 'Under $1500' },
    { id: 'mid', name: '$1500 - $3000' },
    { id: 'luxury', name: '$3000+' }
  ],
  comfortLevels: [
    { id: 'all', name: 'All Comfort Levels' },
    { id: 'budget', name: 'Budget' },
    { id: 'mid-range', name: 'Mid-Range' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'luxury+', name: 'Luxury+' }
  ],
  tourTypes: [
    { id: 'all', name: 'All Tour Types' },
    { id: 'private', name: 'Private Tour' },
    { id: 'shared', name: 'Shared Tour' }
  ],
  safariTypes: [
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
    { id: 'domestic-flight', name: 'Domestic Flight Included' }
  ]
};

export { mockPackages };