// app/packages/[id]/page.js
"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Correct hook for App Router
import Link from 'next/link';
import { FaStar, FaChevronLeft, FaChevronRight, FaSearch, FaTimes, FaMapMarkerAlt, FaGlobe, FaPhone, FaCheck, FaInfoCircle, FaCalendarAlt, FaUserFriends, FaBed, FaUtensils, FaTicketAlt } from 'react-icons/fa';
import { mockPackages } from '../../../lib/mockData'; // Adjust path if needed

const PackageDetailsPage = () => {
  const params = useParams(); // Correct hook for App Router
  const { id } = params;

  const [activeTab, setActiveTab] = useState('overview');
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect for adding shadow to main nav
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow to main nav when scrolled past a small threshold
      // This logic can be added if needed, but it's not critical for the package details page
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Logic for closing dropdowns if any exist on this page
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Simplified dropdown toggling for mobile (if needed)
  const toggleDropdown = (dropdown) => {
    setExpandedCard(expandedCard === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setExpandedCard(null);
    // setIsMenuOpen(false); // If you have a mobile menu state
  };

  // Fetch package data based on ID
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Simulate fetching data by ID from mock data
        // In a real app, this would be an API call
        const pkg = mockPackages.find(p => p.id === parseInt(id));
        if (pkg) {
          setPackageData(pkg);
        } else {
          console.error('Package not found');
          // Optionally redirect to 404 page
          // router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching package ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#465b2d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h1>
          <p className="text-gray-600 mb-4">Sorry, we couldn't find the package you're looking for.</p>
          <Link href="/packages" className="text-[#465b2d] hover:underline">
            ← Back to All Packages
          </Link>
        </div>
      </div>
    );
  }

  // Tab Content Components
  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Route Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">ROUTE SUMMARY</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {packageData.route.days.map((day, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#465b2d] text-white flex items-center justify-center mb-2">
                <span className="font-bold">{day.day}</span>
              </div>
              <p className="text-sm font-medium text-[#465b2d]">{day.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tour Features */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">TOUR FEATURES</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packageData.tourFeatures.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="w-5 h-5 bg-[#465b2d] rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activities & Transportation */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">ACTIVITIES & TRANSPORTATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">ACTIVITIES</h4>
            <ul className="space-y-2">
              {packageData.activitiesTransportation.activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-[#465b2d] mr-3" />
                  <span className="text-gray-700">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">TRANSPORTATION</h4>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Vehicle:</span> {packageData.activitiesTransportation.vehicle}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Transfer:</span> {packageData.activitiesTransportation.transfer}
            </p>
          </div>
        </div>
      </div>

      {/* Accommodation & Meals */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">ACCOMMODATION & MEALS</h3>
        <p className="text-gray-600 mb-4">{packageData.accommodationMeals.note}</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#465b2d] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Day</th>
                <th className="py-3 px-4 text-left">Accommodation</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Meals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packageData.accommodationMeals.schedule.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 font-medium text-gray-800">{item.day}</td>
                  <td className="py-3 px-4 text-gray-700">{item.accommodation}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">{item.accommodationType}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.meals}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">GALLERY</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {packageData.gallery.map((img, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDayByDayTab = () => (
    <div className="space-y-8">
      {packageData.dayByDay.map((day, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Day Info */}
            <div className="md:w-1/4">
              <div className="bg-[#465b2d] text-white rounded-lg p-4 text-center mb-4">
                <h3 className="text-2xl font-bold">DAY {day.day}</h3>
                <p className="text-lg font-semibold mt-1">{day.location}</p>
              </div>
              
              {/* User & Rating */}
              <div className="flex items-center mb-4">
                <img
                  src={day.avatar || packageData.image} // Use day avatar or fallback
                  alt={`${day.username || 'Guide'} preview`}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < (day.rating || packageData.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{day.date || "No date"}</p>
                </div>
              </div>

              {/* Best Times */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">BEST TIMES TO VISIT</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><span className="font-medium">Best Time To Visit:</span> {day.bestTimeToVisit}</li>
                  <li><span className="font-medium">High Season:</span> {day.highSeason}</li>
                  <li><span className="font-medium">Best Weather:</span> {day.bestWeather}</li>
                </ul>
              </div>

              {/* Wildlife */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">WILDLIFE SPOTTED</h4>
                <div className="space-y-2">
                  {day.wildlife.map((animal, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                      <span className="text-gray-700">{animal.animal}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        animal.abundance === 'Abundant' ? 'bg-green-100 text-green-800' :
                        animal.abundance === 'Common' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {animal.abundance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day Details */}
            <div className="md:w-3/4">
              <p className="text-gray-700 mb-4 whitespace-pre-line">{day.description}</p>
              
              {/* Accommodation */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaBed className="text-[#465b2d] mr-2" />
                  ACCOMMODATION
                </h4>
                <p className="text-gray-700">
                  <span className="font-medium">{day.accommodation}</span> - {day.accommodationType}
                </p>
              </div>
              
              {/* Meals & Drinks */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaUtensils className="text-[#465b2d] mr-2" />
                  MEALS & DRINKS
                </h4>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Meals:</span> {day.meals}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Drinks:</span> {day.drinks}
                </p>
              </div>
              
              {/* Gallery for Day */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">DAY GALLERY</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {day.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="aspect-square overflow-hidden rounded">
                      <img
                        src={img}
                        alt={`Day ${day.day} image ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRatesTab = () => (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Important to Know: Rates are per person and exclude the international flight from/to your home country. 
              This tour accepts children of all ages. Children under 12 receive a discount and children under 2 are free.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 overflow-x-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">PRICING PER PERSON (USD)</h3>
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#465b2d] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Period</th>
              <th className="py-3 px-4 text-left">Solo</th>
              <th className="py-3 px-4 text-left">1 Room (2 People)</th>
              <th className="py-3 px-4 text-left">1 Room (3 People)</th>
              <th className="py-3 px-4 text-left">1 Room (4 People)</th>
              <th className="py-3 px-4 text-left">2 Rooms (5 People)</th>
              <th className="py-3 px-4 text-left">3 Rooms (6 People)</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packageData.rates.pricing.map((rate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{rate.period}</td>
                <td className="py-3 px-4 text-gray-700">{rate.solo}</td>
                <td className="py-3 px-4 text-gray-700">{rate.oneRoomTwoPeople}</td>
                <td className="py-3 px-4 text-gray-700">{rate.oneRoomThreePeople}</td>
                <td className="py-3 px-4 text-gray-700">{rate.oneRoomFourPeople}</td>
                <td className="py-3 px-4 text-gray-700">{rate.twoRoomsFivePeople}</td>
                <td className="py-3 px-4 text-gray-700">{rate.threeRoomsSixPeople}</td>
                <td className="py-3 px-4">
                  <button className="bg-[#465b2d] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3a4a24] transition-colors duration-200">
                    Get Quote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInclusionsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Included */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaTicketAlt className="text-[#465b2d] mr-2" />
          INCLUDED IN THE PRICE
        </h3>
        <ul className="space-y-3">
          {packageData.inclusions.included.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-5 h-5 bg-[#465b2d] rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">EXCLUDED FROM THE PRICE</h3>
        <ul className="space-y-3">
          {packageData.inclusions.excluded.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderGettingThereTab = () => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">GETTING THERE</h3>
      <p className="text-gray-700 mb-6">{packageData.gettingThere.description}</p>
      
      <div className="space-y-4">
        {packageData.gettingThere.details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <div className="w-5 h-5 bg-[#465b2d] rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">{detail}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full bg-[#465b2d] text-white py-3 rounded-lg font-semibold hover:bg-[#3a4a24] transition-colors duration-200 shadow-md">
          Get Directions & Flight Info
        </button>
      </div>
    </div>
  );

  const renderOfferedByTab = () => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">OFFERED BY</h3>
      <div className="flex items-center mb-6">
        <img
          src={packageData.image} // Use package image as operator logo
          alt={packageData.tourOperator}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-bold text-[#465b2d]">{packageData.tourOperator}</h4>
            <button className="bg-[#465b2d] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#3a4a24] transition-colors duration-200">
              Contact
            </button>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(packageData.rating)
                      ? 'fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {packageData.rating}/5 ({packageData.reviewCount} Reviews)
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-6">
        {packageData.fullDescription}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-2">Contact Information</h5>
          <p className="text-sm mb-2">Email: info@souloftanzania.com</p>
          <p className="text-sm mb-2">Phone: +255 123 456 7890</p>
          <p className="text-sm mb-2">Address: Arusha, Tanzania</p>
          <p className="text-sm">Office Hours: Mon-Fri 9am-5pm</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-2">Office Location</h5>
          <p className="text-sm mb-2">Arusha, Tanzania</p>
          <p className="text-sm mb-2">Dar es Salaam, Tanzania</p>
          <p className="text-sm">Nairobi, Kenya (Satellite Office)</p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full bg-[#465b2d] text-white py-3 rounded-lg font-semibold hover:bg-[#3a4a24] transition-colors duration-200 shadow-md">
          Contact {packageData.tourOperator}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/packages" 
          className="inline-flex items-center text-[#465b2d] hover:text-[#3a4a24] mb-6 transition-colors duration-200"
        >
          <FaChevronLeft className="mr-2" />
          Back to All Packages
        </Link>

        {/* Package Header */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/80 p-8 lg:p-12 shadow-xl mb-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#465b2d]/10 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#465b2d] rounded-full animate-pulse"></div>
              <span className="text-[#465b2d] text-md font-bold">Asili Explorer</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#465b2d] mb-4 leading-tight">
              {packageData.name}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] rounded-full"></div>
          </div>

          {/* Main Description */}
          <div className="space-y-6 text-slate-700 mb-8">
            <p className="text-lg leading-relaxed">
              {packageData.fullDescription}
            </p>
          </div>

          {/* Rating & Review Count */}
          <div className="flex items-center mb-8">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(packageData.rating) ? 'fill-current' : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">
              {packageData.rating}/5 ({packageData.reviewCount} Reviews)
            </span>
          </div>

          {/* Custom Trip Section */}
          <div className="bg-gradient-to-r from-[#465b2d]/10 to-[#8B5A4A]/10 rounded-xl p-6 border border-[#465b2d]/20 mb-8">
            <p className="text-slate-700 text-lg leading-relaxed">
              You can choose one of our popular Tanzania itineraries or build your own trip exactly the way you love it. Let us know which national parks and islands you like and we will design the perfect Tanzania vacation for you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-[#465b2d] to-[#3a4a24] text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex-1 text-center">
              VIEW ALL OUR ITINERARIES
            </button>
         
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'day-by-day', label: 'Day by Day' },
              { id: 'rates', label: 'Rates' },
              { id: 'inclusions', label: 'Inclusions' },
              { id: 'getting-there', label: 'Getting There' },
              { id: 'offered-by', label: 'Offered By' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedCard(null); // Close any expanded card when switching tabs
                }}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#465b2d] text-[#465b2d]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-inner border border-gray-200">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'day-by-day' && renderDayByDayTab()}
          {activeTab === 'rates' && renderRatesTab()}
          {activeTab === 'inclusions' && renderInclusionsTab()}
          {activeTab === 'getting-there' && renderGettingThereTab()}
          {activeTab === 'offered-by' && renderOfferedByTab()}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#465b2d] mb-4">
            Ready to Book Your Dream Safari?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Get a free, customized quote for your Tanzania adventure. Our experts are ready to design the perfect trip for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#465b2d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#3a4a24] transition-colors duration-200 shadow-md">
              MAKE A REQUEST
            </button>
            <button className="border-2 border-[#465b2d] text-[#465b2d] px-8 py-4 rounded-xl font-semibold hover:bg-[#465b2d]/10 transition-colors duration-200 shadow-sm">
              VIEW ALL PACKAGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage; // Note: This should probably be renamed to PackageDetailsPage