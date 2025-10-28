// components/TestimonialSlider.js
"use client"
import { useState, useEffect, useRef } from 'react';

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // Pause on hover

  // Refs for controlling the slider interval
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      username: "terenceb480",
      date: "19 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=100&h=100&fit=crop",
      review: "My wife and I had an amazing experience with Tanzania Specialist from start to finish, their team went above and beyond to make our safari unforgettable."
    },
    {
      id: 2,
      username: "654rener",
      date: "19 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?w=100&h=100&fit=crop",
      review: "We had an amazing two weeks. The trip was perfectly planned by Anna, with Bobby and Julia we had two local guides who made our experience unforgettable. The attention to detail and personalized service exceeded all our expectations."
    },
    {
      id: 3,
      username: "Kwatson83",
      date: "18 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551632811-561732d1c5e0?w=100&h=100&fit=crop",
      review: "Tanzania Specialist was a great company to work with planning mine and my husband's safari. The booking process was smooth, and our guide Samuel was fantastic. "
    },
    {
      id: 4,
      username: "karimQ7567NF",
      date: "17 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=100&h=100&fit=crop",
      review: "We (my wife and I) had the pleasure of spending 6 days with our Safari Guide Abdallah Hussein visiting Arusha National Park and Tarangire. His expertise and friendly demeanor made our trip exceptional. We saw elephants, giraffes, and even a leopard!"
    },
    {
      id: 5,
      username: "carolan",
      date: "17 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      review: "An unforgettable experience led by a very knowledgeable and lovely guide who taught us so much about the wildlife and culture. Every game drive was an adventure, filled with exciting sightings and fascinating facts."
    },
    {
      id: 6,
      username: "Dotto W",
      date: "16 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=100&h=100&fit=crop",
      review: "I booked a safari/Zanzibar itinerary with Tanzania Specialist last June for September 2025. From the moment I contacted them, they were timely and very informative."
    },
    {
      id: 7,
      username: "JambiFan",
      date: "15 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573843988976-8a4c7a9b0e6a?w=100&h=100&fit=crop",
      review: "Myself and my partner heard about Tanzania specialist through google searches and as soon as we got in contact with them they were extremely helpful and helped us to create a personalised package for us."
    },
    {
      id: 8,
      username: "HappyTraveller",
      date: "14 October 2025",
      rating: 5,
      image: "https://images.unsplash.com/photo-1551632811-561732d1c5e0?w=100&h=100&fit=crop",
      review: "We thoroughly enjoyed our week-long safari that was expertly organised by Tanzanian Specialist, meeting our requirements for places to visit, both on safari and afterwards in a luxurious beachside resort in Zanzibar (The Mora)."
    }
    // Add more testimonials as needed...
  ];

  // Auto slide effect - Continuous sliding
  useEffect(() => {
    if (isHovered) {
        // Clear interval if hovered
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return;
    }

    // Set up interval for auto-scroll
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
      setExpandedCard(null); // Collapse any expanded card on slide
    }, 2000); // Change slide every 4 seconds

    // Cleanup function to clear interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered]); // Depend on isHovered to restart/pause correctly

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
    setExpandedCard(null); // Collapse any expanded card on slide
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length);
    setExpandedCard(null); // Collapse any expanded card on slide
  };

  const toggleReadMore = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Calculate the transform value for the slider
  const sliderTransform = `translateX(-${currentIndex * 25}%)`;

  return (
   <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#465b2d] mb-4">
        WHAT TRAVELLERS SAY
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-[#8B5A4A] mb-6">
        GENUINE REVIEWS FROM OUR GUESTS
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] rounded-full mx-auto"></div>
    </div>

    {/* Testimonial Slider */}
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: sliderTransform }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 h-full hover:shadow-lg transition-shadow duration-300">
                {/* User Info */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#465b2d]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-base font-bold text-[#465b2d] truncate">
                        {testimonial.username}
                      </h3>
                      <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                        {testimonial.date}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-3">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {expandedCard === testimonial.id
                      ? testimonial.review
                      : `${testimonial.review.substring(0, 100)}${
                          testimonial.review.length > 100 ? "..." : ""
                        }`}
                  </p>
                </div>

                {/* Read More */}
                {testimonial.review.length > 100 && (
                  <button
                    onClick={() => toggleReadMore(testimonial.id)}
                    className="text-xs text-[#465b2d] font-semibold hover:text-[#3a4a24] transition-colors duration-200 flex items-center gap-1"
                  >
                    {expandedCard === testimonial.id
                      ? "Read less"
                      : "Read more"}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        expandedCard === testimonial.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 border border-slate-200 hover:bg-white shadow-md transition-all duration-300 z-10"
      >
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 border border-slate-200 hover:bg-white shadow-md transition-all duration-300 z-10"
      >
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setExpandedCard(null);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] scale-125"
                : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default TestimonialSlider;