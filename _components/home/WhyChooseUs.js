"use client"
import { useState, useRef, useEffect } from 'react';

const WhyChooseUs = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const features = [
    "100% specialized in Tanzania",
    "Private safaris, dedicated vehicles and guides for top-notch service",
    "Travel advisors who live in Tanzania",
    "Guarantee for an amazing safari experience",
    "Personalized service, from booking to on-site support",
    "Approachable and quick response"
  ];

  // Auto play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch((error) => {
        console.log("Auto-play failed:", error);
      });
    }
  }, []);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="w-full flex justify-between bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            WHY CHOOSE <span className="text-[#465b2d] uppercase">Asili Explorer</span>
          </h1>
          <h2 className="text-xl lg:text-2xl text-slate-600 mb-6">
            THE EXPERT WITH IN-DEPTH KNOWLEDGE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#465b2d] to-[#8B5A4A] rounded-full mx-auto mb-8"></div>
          
          {/* Main Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed mb-6">
              Professional private guides, comfortable private jeeps, flexible itineraries, and the best customer experiences. Our meticulous trip preparation ensures you can enjoy your journey stress-free and worry-free.
            </p>
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed font-semibold">
              Opt for an unforgettable trip with top-notch service.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Side - Wider Feature List */}
          <div className="flex-1 lg:flex-[2] w-full"> {/* Left side takes 2/3 space */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-[#465b2d] mb-6 text-center">
                Why We're Different
              </h3>
              
              {/* Simple Feature List */}
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 bg-[#465b2d] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-slate-700 text-lg font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="bg-gradient-to-r from-[#465b2d] to-[#3a4a24] text-white font-bold py-3 px-6 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex-1 text-center">
                  REQUEST A TRAVEL PROPOSAL
                </button>
                <button className="bg-white/80 text-slate-700 font-bold py-3 px-6 rounded-xl border-2 border-slate-300 hover:border-[#465b2d] hover:bg-white transition-all duration-300 flex-1 text-center">
                  VIEW ITINERARIES
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Narrower Video Card */}
          <div className="flex-1 w-full lg:max-w-md"> {/* Right side limited to max-w-md */}
            <div className="bg-gradient-to-br from-[#465b2d] to-[#8B5A4A] rounded-2xl overflow-hidden relative h-[400px] shadow-lg w-[450px] group">
              {/* Video Player */}
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  onEnded={handleVideoEnd}
                  muted
                  loop
                  playsInline
                >
                  <source src="https://videos.pexels.com/video-files/5214229/5214229-hd_1920_1080_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Play/Pause Button */}
                <button
                  onClick={toggleVideoPlay}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
                >
                  {isVideoPlaying ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Video Controls Info */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {isVideoPlaying ? 'Click to pause' : 'Click to play'}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Experience Tanzania
                    </h3>
                    <p className="text-white/80 text-xs">
                      Unforgettable safari adventures with personalized service
                    </p>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs">🏆 2025</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-white text-xs">⭐ Experts</span>
                </div>
              </div>
            </div>

            {/* Stats Below Video */}
            <div className="grid grid-cols-3 gap-3 mt-9">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-slate-200 shadow-lg ">
                <div className="text-xl font-bold text-slate-800">15+</div>
                <div className="text-slate-600 text-xs">Years Exp</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-slate-200 shadow-lg">
                <div className="text-xl font-bold text-slate-800">2K+</div>
                <div className="text-slate-600 text-xs">Travelers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-slate-200 shadow-lg">
                <div className="text-xl font-bold text-slate-800">4.9★</div>
                <div className="text-slate-600 text-xs">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;