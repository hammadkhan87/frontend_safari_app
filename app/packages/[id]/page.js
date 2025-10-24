import Link from "next/link";
import { mockPackages } from "@/lib/mockData";

// ✅ Static paths for build-time generation
export async function generateStaticParams() {
  return mockPackages.map((pkg) => ({
    id: pkg.id.toString(),
  }));
}

export default async function PackageDetailPage({ params }) {
  const pkg = mockPackages.find((p) => p.id === parseInt(params.id));

  if (!pkg) {
    return <div className="text-center py-12">Package not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/packages"
          className="inline-flex items-center text-[#465b2d] hover:text-[#3a4a24] mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Back to All Packages
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="relative">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{pkg.name}</h1>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-4">${pkg.price}</span>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(pkg.rating) ? "fill-current" : ""
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm">({pkg.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Offered By */}
            <div className="mb-6">
              <p className="text-gray-600">
                Offered By: <span className="font-semibold">{pkg.offeredBy}</span>
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Highlights
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-[#465b2d] mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {pkg.fullDescription}
              </p>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerary</h2>
              <div className="space-y-4">
                {pkg.destinations.map((day, index) => (
                  <div key={index} className="border-l-4 border-[#465b2d] pl-4 py-2">
                    <div className="flex items-center mb-1">
                      <span className="font-bold text-[#465b2d] mr-3">
                        Day {day.day}:
                      </span>
                      <span className="font-semibold text-gray-800">
                        {day.location}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[#465b2d] mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pkg.gallery?.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={img}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <button className="bg-[#465b2d] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#3a4a24] transition-colors duration-300 shadow-md hover:shadow-lg">
                MAKE A REQUEST FOR THIS PACKAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
