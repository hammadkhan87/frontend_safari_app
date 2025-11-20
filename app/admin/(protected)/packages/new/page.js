// app/admin/packages/new/page.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Memoized input components to prevent unnecessary re-renders
const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder, required = false, className = '', helpText, min, max, step }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      } ${className}`}
      required={required}
      min={min}
      max={max}
      step={step}
    />
    {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error, placeholder, rows = 4, required = false, helpText, maxLength }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      required={required}
      maxLength={maxLength}
    />
    {maxLength && (
      <p className="text-xs text-gray-500">
        {value?.length || 0}/{maxLength} characters
      </p>
    )}
    {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, error, options, required = false, helpText }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      required={required}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange, path, helpText, columns = 2 }) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-3`}>
      {options.map(option => (
        <label key={option} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 border border-gray-200">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(path, option)}
            className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="text-sm text-gray-700 capitalize flex-1">{option}</span>
        </label>
      ))}
    </div>
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
  </div>
);

const ArrayInputField = ({ label, items, onAdd, onRemove, onUpdate, placeholder, error, minItems = 0 }) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">
      {label} {minItems > 0 && <span className="text-red-500">*</span>}
    </label>
    {items.map((item, index) => (
      <div key={index} className="flex gap-2">
        <input
          value={item}
          onChange={e => onUpdate(index, e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="px-3 py-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-colors"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex items-center px-3 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
    >
      + Add {label}
    </button>
    {error && <p className="text-sm text-red-600">{error}</p>}
    {minItems > 0 && items.length < minItems && (
      <p className="text-sm text-amber-600">Minimum {minItems} {label.toLowerCase()} required</p>
    )}
  </div>
);

export default function AddPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');
  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  
  const [pkg, setPkg] = useState({
    // === BASIC INFORMATION ===
    name: '',
    slug: '',
    offeredBy: 'Asili Explorer Safaris',
    tourOperator: 'Asili Explorer Safaris',
    rating: 4.7,
    reviewCount: 0,
    shortDescription: '',
    fullDescription: '',
    duration: 4,
    price: 0,
    startingFrom: 'Arusha',
    comfortLevel: 'mid-range',
    tourType: 'private',
    safariType: 'lodge',
    image: '',

    // === ENHANCED DETAILS ===
    groupSizeMin: 1,
    groupSizeMax: 6,
    bestTimeToVisit: '',
    worstTimeToVisit: '',
    physicalDifficulty: 'easy',
    ageMin: 6,
    ageMax: '',
    
    // === LISTS & ARRAYS ===
    specializedTours: [],
    features: [],
    highlights: [],
    destinations: [],
    gallery: [],
    tourFeatures: [],
    tags: [],

    // === DETAILED INFORMATION ===
    route: {
      start: '',
      end: '',
      days: []
    },
    activitiesTransportation: {
      activities: [],
      vehicle: 'pop-up roof 4x4 vehicle',
      vehicleFeatures: [],
      transfer: 'A transfer from and back to the airport is included',
      flightIncluded: false,
      flightDetails: ''
    },
    accommodationMeals: {
      note: 'Additional accommodation before and at the end of the tour can be arranged for an extra cost',
      schedule: []
    },
    dayByDay: [],
    rates: {
      disclaimer: 'Rates are per person and exclude international flights from your home country. Prices may vary based on season and accommodation upgrades.',
      currency: 'USD',
      pricing: []
    },
    inclusions: {
      included: [],
      excluded: []
    },
    gettingThere: {
      description: '',
      details: []
    },
    
    // === POLICIES & SAFETY ===
    cancellationPolicy: {
      description: '',
      deadlines: []
    },
    healthSafety: {
      requirements: [],
      precautions: [],
      insurance: 'Travel insurance is mandatory'
    },

    // === SEO & MARKETING ===
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    featured: false,
    popular: false
  });

  // Predefined options
  const comfortLevels = [
    { value: 'budget', label: 'Budget', description: 'Basic accommodations, shared facilities' },
    { value: 'mid-range', label: 'Mid-range', description: 'Comfortable lodges, private facilities' },
    { value: 'luxury', label: 'Luxury', description: 'Premium accommodations, exclusive experiences' }
  ];

  const tourTypes = [
    { value: 'private', label: 'Private Tour', description: 'Exclusive vehicle and guide for your group' },
    { value: 'shared', label: 'Shared Tour', description: 'Join other travelers in a group' },
    { value: 'group', label: 'Group Tour', description: 'Fixed departure with larger group' }
  ];

  const safariTypes = [
    { value: 'lodge', label: 'Lodge Safari', description: 'Stay in comfortable lodges and hotels' },
    { value: 'camping', label: 'Camping Safari', description: 'Authentic camping experience' },
    { value: 'luxury-camping', label: 'Luxury Camping', description: 'High-end tented camps with amenities' },
    { value: 'tented', label: 'Tented Safari', description: 'Permanent tented camps' }
  ];

  const physicalDifficulties = [
    { value: 'very-easy', label: 'Very Easy', description: 'Minimal walking, mostly vehicle-based' },
    { value: 'easy', label: 'Easy', description: 'Light walking on flat surfaces' },
    { value: 'moderate', label: 'Moderate', description: 'Some walking on uneven terrain' },
    { value: 'challenging', label: 'Challenging', description: 'Long walks, hiking required' }
  ];

  const specializedTourOptions = [
    'safari', 'wildlife', 'family', 'honeymoon', 'fly-in safaris', 
    'beach', 'cultural', 'adventure', 'photography', 'bird watching'
  ];

  const featureOptions = [
    'can start any day', 'can be customized', 'suitable for solo travelers', 
    'suitable for all ages', 'airport transfer included', 'itinerary customizable', 
    'domestic flight included', 'great migration', 'big five guaranteed', 
    'cultural experience', 'professional guide', 'all meals included'
  ];

  const activityOptions = [
    'game drives', 'walking safaris', 'bird watching', 'cultural visits', 
    'hot air balloon', 'beach activities', 'boat safari', 'night game drives',
    'bush dinners', 'photography sessions', 'nature walks'
  ];

  // FIXED: Optimized state update function
  const update = useCallback((path, value) => {
    setPkg(prev => {
      const keys = path.split('.');
      
      // Check if the value is actually changing to avoid unnecessary updates
      let current = prev;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) break;
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      if (current && current[lastKey] === value) {
        return prev; // No change, return same object
      }
      
      // Deep clone and update only if value changed
      const result = JSON.parse(JSON.stringify(prev));
      current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return result;
    });
    
    if (errors[path]) {
      setErrors(prev => ({ ...prev, [path]: null }));
    }
  }, [errors]);

  // FIXED: Optimized array functions
  const addToArray = useCallback((path, item) => {
    const keys = path.split('.');
    setPkg(prev => {
      const result = JSON.parse(JSON.stringify(prev));
      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      current[lastKey] = [...(current[lastKey] || []), item];
      return result;
    });
  }, []);

  const removeFromArray = useCallback((path, index) => {
    const keys = path.split('.');
    setPkg(prev => {
      const result = JSON.parse(JSON.stringify(prev));
      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      current[lastKey] = current[lastKey].filter((_, i) => i !== index);
      return result;
    });
  }, []);

  const toggleArrayItem = useCallback((path, item) => {
    const keys = path.split('.');
    setPkg(prev => {
      const result = JSON.parse(JSON.stringify(prev));
      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      const currentArray = current[lastKey] || [];
      
      if (currentArray.includes(item)) {
        current[lastKey] = currentArray.filter(i => i !== item);
      } else {
        current[lastKey] = [...currentArray, item];
      }
      return result;
    });
  }, []);

  // FIXED: Name and slug generation logic - only runs when duration changes
  useEffect(() => {
    if (pkg.duration && pkg.name && !nameManuallyEdited) {
      const currentName = pkg.name;
      const durationPrefix = `${pkg.duration}-Day `;
      
      // Only auto-update if name doesn't start with current duration prefix
      if (!currentName.startsWith(durationPrefix)) {
        // Remove any existing duration prefix
        const cleanName = currentName.replace(/^\d+-Day\s/, '');
        const newName = durationPrefix + cleanName;
        update('name', newName);
      }
    }
  }, [pkg.duration]); // Only depend on duration

  // Auto-generate slug from name
  useEffect(() => {
    if (pkg.name && !pkg.slug) {
      const generatedSlug = pkg.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      update('slug', generatedSlug);
    }
  }, [pkg.name, pkg.slug]);

  // Auto-populate route start/end from days
  useEffect(() => {
    if (pkg.route.days.length > 0) {
      const firstDay = pkg.route.days[0];
      const lastDay = pkg.route.days[pkg.route.days.length - 1];
      
      if (firstDay && !pkg.route.start) {
        update('route.start', `${firstDay.location} (Day ${firstDay.day})`);
      }
      if (lastDay && !pkg.route.end) {
        update('route.end', `${lastDay.location} (Day ${lastDay.day})`);
      }
    }
  }, [pkg.route.days]);

  // Auto-populate dayByDay from route.days
  useEffect(() => {
    if (pkg.route.days.length > 0) {
      const dayByDay = pkg.route.days.map(day => ({
        day: day.day,
        location: day.location,
        description: day.description,
        images: day.images || [],
        accommodation: '',
        accommodationType: '',
        meals: '',
        drinks: '',
        bestTimeToVisit: '',
        highSeason: '',
        bestWeather: '',
        wildlife: []
      }));
      update('dayByDay', dayByDay);
    }
  }, [pkg.route.days]);

  // Auto-generate meta description
  useEffect(() => {
    if (pkg.shortDescription && !pkg.metaDescription) {
      const metaDesc = pkg.shortDescription.length > 155 
        ? pkg.shortDescription.substring(0, 155) + '...'
        : pkg.shortDescription;
      update('metaDescription', metaDesc);
    }
  }, [pkg.shortDescription, pkg.metaDescription]);

  // Auto-generate meta title
  useEffect(() => {
    if (pkg.name && !pkg.metaTitle) {
      update('metaTitle', `${pkg.name} | Asili Explorer Safaris`);
    }
  }, [pkg.name, pkg.metaTitle]);

  // FIXED: Optimized name change handler
  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    update('name', value);
    
    // Only set manual edit flag if user is actually typing (not empty)
    if (value && !nameManuallyEdited) {
      setNameManuallyEdited(true);
    }
  }, [nameManuallyEdited, update]);

  // Image upload function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  // Handle multiple image uploads
  const handleImageUpload = async (files) => {
    setUploading(true);
    const uploadedUrls = [];
    
    try {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          try {
            const url = await uploadImage(file);
            uploadedUrls.push(url);
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
          }
        }
      }
      
      if (uploadedUrls.length > 0) {
        const newGallery = [...pkg.gallery, ...uploadedUrls];
        update('gallery', newGallery);
        
        if (!pkg.image && uploadedUrls.length > 0) {
          update('image', uploadedUrls[0]);
        }
      }
      
      return uploadedUrls;
    } catch (error) {
      alert(`Error uploading images: ${error.message}`);
      return [];
    } finally {
      setUploading(false);
    }
  };

  // Handle drop event for image upload
  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleImageUpload(files);
    }
  }, [pkg.gallery, pkg.image]);

  // Handle file input change
  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      await handleImageUpload(files);
    }
    e.target.value = '';
  };

  // Function to add images to specific day
  const addImagesToDay = async (dayIndex, files) => {
    const uploadedUrls = await handleImageUpload(files);
    if (uploadedUrls.length > 0) {
      const days = [...pkg.route.days];
      if (!days[dayIndex].images) {
        days[dayIndex].images = [];
      }
      days[dayIndex].images = [...days[dayIndex].images, ...uploadedUrls];
      update('route.days', days);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!pkg.name?.trim()) newErrors.name = 'Package name is required';
    if (!pkg.slug?.trim()) newErrors.slug = 'Slug is required';
    if (!pkg.shortDescription?.trim()) newErrors.shortDescription = 'Short description is required';
    if (!pkg.duration || pkg.duration < 1) newErrors.duration = 'Valid duration is required';
    if (!pkg.price || pkg.price < 0) newErrors.price = 'Valid price is required';
    if (!pkg.image) newErrors.image = 'Main image is required';
    if (pkg.gallery.length < 8) newErrors.gallery = 'Minimum 8 gallery images required';
    if (pkg.route.days.length === 0) newErrors.route = 'At least one day is required';
    
    if (pkg.route.days.some(day => !day.description?.trim())) {
      newErrors.route = 'All days must have descriptions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!validateForm()) {
  //     alert('Please fix the errors before submitting');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch('/api/admin/packages', {
  //       method: 'POST',
  //       headers: { 
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...pkg,
  //         duration: parseInt(pkg.duration),
  //         price: parseFloat(pkg.price),
  //         rating: parseFloat(pkg.rating),
  //         reviewCount: parseInt(pkg.reviewCount),
  //         groupSizeMin: parseInt(pkg.groupSizeMin),
  //         groupSizeMax: parseInt(pkg.groupSizeMax),
  //         ageMin: parseInt(pkg.ageMin),
  //         ageMax: pkg.ageMax ? parseInt(pkg.ageMax) : null
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       alert('✅ Package created successfully!');
  //       router.push('/admin/packages');
  //       router.refresh();
  //     } else {
  //       throw new Error(data.error || 'Failed to create package');
  //     }
  //   } catch (error) {
  //     console.error('Error creating package:', error);
  //     alert(`❌ Error: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Navigation sections
  
  // Inside your AddPackagePage component
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch('/admin/packages/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pkg),
    });
    if (res.ok) {
      const data = await res.json();
      alert('✅ Package created successfully!');
      router.push('/admin/packages');
    } else {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create package');
    }
  } catch (error) {
    alert(`❌ ${error.message}`);
  } finally {
    setLoading(false);
  }
};
  
  const sections = [
    { id: 'basic', title: 'Basic Info', icon: '📝' },
    { id: 'details', title: 'Package Details', icon: '🔍' },
    { id: 'itinerary', title: 'Itinerary', icon: '🗓️' },
    { id: 'activities', title: 'Activities', icon: '🎯' },
    { id: 'accommodation', title: 'Accommodation', icon: '🏨' },
    { id: 'pricing', title: 'Pricing', icon: '💰' },
    { id: 'inclusions', title: 'Inclusions', icon: '✅' },
    { id: 'policies', title: 'Policies', icon: '📋' },
    { id: 'media', title: 'Media', icon: '🖼️' },
    { id: 'seo', title: 'SEO', icon: '🔍' }
  ];

  // Helper components
  const SectionHeader = ({ title, description, icon }) => (
    <div className="border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );

  // Component for image selection modal
  const ImageSelectorModal = ({ isOpen, onClose, onSelect, selectedImages = [], multiple = true }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Images from Gallery</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {pkg.gallery.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No images in gallery. Please upload images first.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pkg.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImages.includes(image) 
                        ? 'border-green-500' 
                        : 'border-transparent'
                    }`}
                    onClick={() => {
                      if (multiple) {
                        if (selectedImages.includes(image)) {
                          onSelect(selectedImages.filter(img => img !== image));
                        } else {
                          onSelect([...selectedImages, image]);
                        }
                      } else {
                        onSelect([image]);
                        onClose();
                      }
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedImages.includes(image) && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                {multiple && (
                  <button
                    onClick={() => {
                      onSelect(selectedImages);
                      onClose();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Select Images
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // State for modals
  const [dayImageModal, setDayImageModal] = useState({ isOpen: false, dayIndex: null });
  const [imageSelectorModal, setImageSelectorModal] = useState({ isOpen: false, onSelect: null, multiple: true });

  // Helper functions
  const addPricingPeriod = () => {
    const newPricing = [...pkg.rates.pricing, {
      period: '',
      solo: '',
      oneRoomTwoPeople: '',
      oneRoomThreePeople: '',
      oneRoomFourPeople: '',
      twoRoomsFivePeople: '',
      threeRoomsSixPeople: ''
    }];
    update('rates.pricing', newPricing);
  };

  const addRouteDay = () => {
    const newDay = {
      day: pkg.route.days.length + 1,
      location: '',
      description: '',
      images: []
    };
    const newDays = [...pkg.route.days, newDay];
    update('route.days', newDays);
  };

  const addAccommodationSchedule = () => {
    const newSchedule = [...pkg.accommodationMeals.schedule, {
      day: '',
      accommodation: '',
      accommodationType: '',
      meals: ''
    }];
    update('accommodationMeals.schedule', newSchedule);
  };

  const addGettingThereDetail = () => {
    addToArray('gettingThere.details', '');
  };

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const totalFields = [
      pkg.name, pkg.slug, pkg.shortDescription, pkg.fullDescription, 
      pkg.duration, pkg.price, pkg.image, pkg.gallery.length >= 8,
      pkg.route.days.length > 0
    ].filter(Boolean).length;
    
    return Math.round((totalFields / 9) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Safari Package</h1>
                <p className="text-sm text-gray-600 mt-1">Complete all sections to create a comprehensive package</p>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Back to Packages
              </button>
            </div>
          </div>
          
          {/* Section Navigation */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex overflow-x-auto space-x-1 pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Form Completion</span>
            <span>{calculateCompletion()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateCompletion()}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            
            {/* Basic Information Section */}
            {activeSection === 'basic' && (
              <div className="p-6">
                <SectionHeader 
                  title="Basic Information" 
                  description="Core details that identify your safari package"
                  icon="📝"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Duration (Days)"
                    name="duration"
                    type="number"
                    value={pkg.duration}
                    onChange={e => update('duration', parseInt(e.target.value) || 0)}
                    error={errors.duration}
                    placeholder="e.g., 7"
                    required
                    min="1"
                    max="365"
                    helpText="Total number of days including travel"
                  />

                  {/* FIXED: Name input with optimized handler */}
                  <div className="md:col-span-2">
                    <InputField
                      label="Package Name"
                      name="name"
                      value={pkg.name}
                      onChange={handleNameChange}
                      error={errors.name}
                      placeholder="e.g., Classic Serengeti & Ngorongoro Safari"
                      required
                      helpText="Name will be auto-prefixed with duration. You can customize it further."
                    />
                  </div>

                  <InputField
                    label="URL Slug"
                    name="slug"
                    value={pkg.slug}
                    onChange={e => update('slug', e.target.value)}
                    error={errors.slug}
                    placeholder="auto-generated-slug"
                    required
                    helpText="URL-friendly version for SEO"
                  />

                  <InputField
                    label="Starting Price ($)"
                    name="price"
                    type="number"
                    step="0.01"
                    value={pkg.price}
                    onChange={e => update('price', parseFloat(e.target.value) || 0)}
                    error={errors.price}
                    placeholder="0.00"
                    required
                    min="0"
                    helpText="Starting price per person in USD"
                  />

                  <InputField
                    label="Starting From"
                    name="startingFrom"
                    value={pkg.startingFrom}
                    onChange={e => update('startingFrom', e.target.value)}
                    placeholder="e.g., Arusha"
                    helpText="City where the tour begins"
                  />

                  <SelectField
                    label="Comfort Level"
                    name="comfortLevel"
                    value={pkg.comfortLevel}
                    onChange={e => update('comfortLevel', e.target.value)}
                    options={comfortLevels}
                    helpText="Quality of accommodations and services"
                  />

                  <SelectField
                    label="Tour Type"
                    name="tourType"
                    value={pkg.tourType}
                    onChange={e => update('tourType', e.target.value)}
                    options={tourTypes}
                    helpText="How the tour is organized"
                  />

                  <SelectField
                    label="Safari Type"
                    name="safariType"
                    value={pkg.safariType}
                    onChange={e => update('safariType', e.target.value)}
                    options={safariTypes}
                    helpText="Style of accommodation and experience"
                  />

                  <InputField
                    label="Rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={pkg.rating}
                    onChange={e => update('rating', parseFloat(e.target.value) || 0)}
                    helpText="Customer rating out of 5"
                  />

                  <InputField
                    label="Review Count"
                    name="reviewCount"
                    type="number"
                    value={pkg.reviewCount}
                    onChange={e => update('reviewCount', parseInt(e.target.value) || 0)}
                    helpText="Number of customer reviews"
                    min="0"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <TextAreaField
                    label="Short Description"
                    name="shortDescription"
                    value={pkg.shortDescription}
                    onChange={e => update('shortDescription', e.target.value)}
                    error={errors.shortDescription}
                    placeholder="Brief overview that appears in package listings and search results (150-250 characters)"
                    rows={3}
                    required
                    maxLength={250}
                    helpText="This appears in search results and package cards. Keep it engaging and informative."
                  />

                  <TextAreaField
                    label="Full Description"
                    name="fullDescription"
                    value={pkg.fullDescription}
                    onChange={e => update('fullDescription', e.target.value)}
                    placeholder="Detailed description of the safari experience, highlights, unique selling points, and what makes this package special."
                    rows={8}
                    helpText="Complete description shown on the package detail page. Use compelling language and include all key benefits."
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <div></div>
                  <button
                    type="button"
                    onClick={() => setActiveSection('details')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Package Details →
                  </button>
                </div>
              </div>
            )}

            {/* Package Details Section */}
            {activeSection === 'details' && (
              <div className="p-6">
                <SectionHeader 
                  title="Package Details" 
                  description="Detailed specifications and requirements"
                  icon="🔍"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="Minimum Group Size"
                    name="groupSizeMin"
                    type="number"
                    value={pkg.groupSizeMin}
                    onChange={e => update('groupSizeMin', parseInt(e.target.value) || 1)}
                    placeholder="1"
                    min="1"
                    max="100"
                    helpText="Minimum number of people required"
                  />

                  <InputField
                    label="Maximum Group Size"
                    name="groupSizeMax"
                    type="number"
                    value={pkg.groupSizeMax}
                    onChange={e => update('groupSizeMax', parseInt(e.target.value) || 6)}
                    placeholder="6"
                    min="1"
                    max="100"
                    helpText="Maximum number of people allowed"
                  />

                  <InputField
                    label="Minimum Age"
                    name="ageMin"
                    type="number"
                    value={pkg.ageMin}
                    onChange={e => update('ageMin', parseInt(e.target.value) || 6)}
                    placeholder="6"
                    min="0"
                    helpText="Minimum age requirement for participants"
                  />

                  <InputField
                    label="Maximum Age"
                    name="ageMax"
                    type="number"
                    value={pkg.ageMax}
                    onChange={e => update('ageMax', e.target.value ? parseInt(e.target.value) : '')}
                    placeholder="Leave empty for no maximum"
                    min="0"
                    helpText="Maximum age limit (optional)"
                  />

                  <SelectField
                    label="Physical Difficulty"
                    name="physicalDifficulty"
                    value={pkg.physicalDifficulty}
                    onChange={e => update('physicalDifficulty', e.target.value)}
                    options={physicalDifficulties}
                    helpText="Physical demands of the safari"
                  />

                  <InputField
                    label="Best Time to Visit"
                    name="bestTimeToVisit"
                    value={pkg.bestTimeToVisit}
                    onChange={e => update('bestTimeToVisit', e.target.value)}
                    placeholder="e.g., June to October"
                    helpText="Optimal months for this safari"
                  />

                  <InputField
                    label="Worst Time to Visit"
                    name="worstTimeToVisit"
                    value={pkg.worstTimeToVisit}
                    onChange={e => update('worstTimeToVisit', e.target.value)}
                    placeholder="e.g., April to May (rainy season)"
                    helpText="Months to avoid or challenging periods"
                  />
                </div>

                <div className="mt-6">
                  <CheckboxGroup
                    label="Specialized Tour Types"
                    options={specializedTourOptions}
                    selected={pkg.specializedTours}
                    onChange={toggleArrayItem}
                    path="specializedTours"
                    helpText="Select all categories that apply to this package"
                    columns={3}
                  />
                </div>

                <div className="mt-6">
                  <CheckboxGroup
                    label="Package Features"
                    options={featureOptions}
                    selected={pkg.features}
                    onChange={toggleArrayItem}
                    path="features"
                    helpText="Key features and amenities included"
                    columns={2}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('basic')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('itinerary')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Itinerary →
                  </button>
                </div>
              </div>
            )}

            {/* Itinerary Section */}
            {activeSection === 'itinerary' && (
              <div className="p-6">
                <SectionHeader 
                  title="Detailed Itinerary" 
                  description="Day-by-day breakdown of the safari experience"
                  icon="🗓️"
                />
                
                {errors.route && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.route}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <InputField
                    label="Route Start"
                    name="routeStart"
                    value={pkg.route.start}
                    onChange={e => update('route.start', e.target.value)}
                    placeholder="e.g., Arusha (Day 1)"
                    helpText="Starting point of the tour"
                  />
                  <InputField
                    label="Route End"
                    name="routeEnd"
                    value={pkg.route.end}
                    onChange={e => update('route.end', e.target.value)}
                    placeholder="e.g., Arusha (Day 7)"
                    helpText="Ending point of the tour"
                  />
                </div>

                <div className="space-y-6">
                  {pkg.route.days.map((day, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Day {day.day}</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const days = pkg.route.days.filter((_, i) => i !== index);
                            update('route.days', days);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove Day
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                          label="Day Number"
                          name={`day-${index}-number`}
                          value={day.day}
                          onChange={e => {
                            const days = [...pkg.route.days];
                            days[index].day = e.target.value;
                            update('route.days', days);
                          }}
                          placeholder="e.g., 1 or 5-6"
                          className="md:col-span-1"
                          helpText="Day number or range (e.g., 5-6)"
                        />
                        
                        <InputField
                          label="Location"
                          name={`day-${index}-location`}
                          value={day.location}
                          onChange={e => {
                            const days = [...pkg.route.days];
                            days[index].location = e.target.value;
                            update('route.days', days);
                          }}
                          placeholder="e.g., Serengeti National Park"
                          className="md:col-span-2"
                          helpText="Main location for this day"
                        />
                        
                        <TextAreaField
                          label="Description"
                          name={`day-${index}-description`}
                          value={day.description}
                          onChange={e => {
                            const days = [...pkg.route.days];
                            days[index].description = e.target.value;
                            update('route.days', days);
                          }}
                          placeholder="Detailed description of the day's activities, experiences, and highlights"
                          rows={4}
                          required
                          className="md:col-span-3"
                          helpText="What happens on this day? Include activities, travel time, and key experiences"
                        />

                        {/* Day Images */}
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Day Images
                          </label>
                          
                          {/* Selected Images */}
                          {day.images && day.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                              {day.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 group">
                                  <Image
                                    src={image}
                                    alt={`Day ${day.day} image ${imageIndex + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const days = [...pkg.route.days];
                                      days[index].images = days[index].images.filter((_, i) => i !== imageIndex);
                                      update('route.days', days);
                                    }}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setImageSelectorModal({ 
                                isOpen: true, 
                                onSelect: (urls) => {
                                  const days = [...pkg.route.days];
                                  if (!days[index].images) {
                                    days[index].images = [];
                                  }
                                  days[index].images = [...days[index].images, ...urls];
                                  update('route.days', days);
                                },
                                multiple: true
                              })}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              Select from Gallery
                            </button>
                            
                            <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                              Upload New
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files);
                                  await addImagesToDay(index, files);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addRouteDay}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-400 bg-white transition-colors"
                  >
                    + Add Day to Itinerary
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('details')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('activities')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Activities →
                  </button>
                </div>
              </div>
            )}

            {/* Activities Section */}
            {activeSection === 'activities' && (
              <div className="p-6">
                <SectionHeader 
                  title="Activities & Transportation" 
                  description="What activities are included and transportation details"
                  icon="🎯"
                />
                
                <div className="space-y-6">
                  <CheckboxGroup
                    label="Activities Included"
                    options={activityOptions}
                    selected={pkg.activitiesTransportation.activities}
                    onChange={toggleArrayItem}
                    path="activitiesTransportation.activities"
                    helpText="Select all activities included in this package"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <InputField
                      label="Vehicle Type"
                      name="vehicle"
                      value={pkg.activitiesTransportation.vehicle}
                      onChange={e => update('activitiesTransportation.vehicle', e.target.value)}
                      placeholder="e.g., pop-up roof 4x4 vehicle"
                      helpText="Type of vehicle used for game drives"
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Flight Included
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pkg.activitiesTransportation.flightIncluded}
                          onChange={e => update('activitiesTransportation.flightIncluded', e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Domestic flights included</span>
                      </div>
                      {pkg.activitiesTransportation.flightIncluded && (
                        <InputField
                          label="Flight Details"
                          name="flightDetails"
                          value={pkg.activitiesTransportation.flightDetails}
                          onChange={e => update('activitiesTransportation.flightDetails', e.target.value)}
                          placeholder="e.g., Nairobi to Maasai Mara"
                          helpText="Details about included flights"
                        />
                      )}
                    </div>
                  </div>

                  <TextAreaField
                    label="Transfer Information"
                    name="transfer"
                    value={pkg.activitiesTransportation.transfer}
                    onChange={e => update('activitiesTransportation.transfer', e.target.value)}
                    placeholder="Details about airport transfers and transportation"
                    rows={3}
                    helpText="Information about pickups, dropoffs, and transfers"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('itinerary')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('accommodation')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Accommodation →
                  </button>
                </div>
              </div>
            )}

            {/* Accommodation Section */}
            {activeSection === 'accommodation' && (
              <div className="p-6">
                <SectionHeader 
                  title="Accommodation & Meals" 
                  description="Lodging details and meal arrangements"
                  icon="🏨"
                />
                
                <TextAreaField
                  label="Accommodation Note"
                  name="accommodationNote"
                  value={pkg.accommodationMeals.note}
                  onChange={e => update('accommodationMeals.note', e.target.value)}
                  placeholder="Additional information about accommodation options, upgrades, or special arrangements"
                  rows={3}
                  helpText="This appears in the accommodation section of the package page"
                />

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Accommodation Schedule</label>
                  {pkg.accommodationMeals.schedule.map((schedule, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <InputField
                          label="Day"
                          name={`schedule-${index}-day`}
                          value={schedule.day}
                          onChange={e => {
                            const scheduleArr = [...pkg.accommodationMeals.schedule];
                            scheduleArr[index].day = e.target.value;
                            update('accommodationMeals.schedule', scheduleArr);
                          }}
                          placeholder="e.g., 1 or 5-6"
                          helpText="Day number or range"
                        />
                        <InputField
                          label="Accommodation Name"
                          name={`schedule-${index}-accommodation`}
                          value={schedule.accommodation}
                          onChange={e => {
                            const scheduleArr = [...pkg.accommodationMeals.schedule];
                            scheduleArr[index].accommodation = e.target.value;
                            update('accommodationMeals.schedule', scheduleArr);
                          }}
                          placeholder="e.g., Serengeti Serena Lodge"
                          helpText="Name of the accommodation"
                        />
                        <InputField
                          label="Accommodation Type"
                          name={`schedule-${index}-type`}
                          value={schedule.accommodationType}
                          onChange={e => {
                            const scheduleArr = [...pkg.accommodationMeals.schedule];
                            scheduleArr[index].accommodationType = e.target.value;
                            update('accommodationMeals.schedule', scheduleArr);
                          }}
                          placeholder="e.g., Luxury Lodge"
                          helpText="Type or category of accommodation"
                        />
                        <InputField
                          label="Meals Included"
                          name={`schedule-${index}-meals`}
                          value={schedule.meals}
                          onChange={e => {
                            const scheduleArr = [...pkg.accommodationMeals.schedule];
                            scheduleArr[index].meals = e.target.value;
                            update('accommodationMeals.schedule', scheduleArr);
                          }}
                          placeholder="e.g., Breakfast, Lunch & Dinner"
                          helpText="Meals included on this day"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromArray('accommodationMeals.schedule', index)}
                        className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove Schedule Entry
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAccommodationSchedule}
                    className="inline-flex items-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    + Add Accommodation Schedule
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('activities')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('pricing')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Pricing →
                  </button>
                </div>
              </div>
            )}

            {/* Pricing Section */}
            {activeSection === 'pricing' && (
              <div className="p-6">
                <SectionHeader 
                  title="Pricing & Rates" 
                  description="Set pricing for different periods and group sizes"
                  icon="💰"
                />
                
                <div className="space-y-4">
                  <TextAreaField
                    label="Pricing Disclaimer"
                    name="ratesDisclaimer"
                    value={pkg.rates.disclaimer}
                    onChange={e => update('rates.disclaimer', e.target.value)}
                    placeholder="Important information about what's included in the price, payment terms, cancellation policy, etc."
                    rows={4}
                    helpText="This appears below the pricing table to inform customers"
                  />

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solo Traveler</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2 People</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3 People</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4 People</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">5 People</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">6 People</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pkg.rates.pricing.map((rate, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input
                                value={rate.period}
                                onChange={e => {
                                  const pricing = [...pkg.rates.pricing];
                                  pricing[index].period = e.target.value;
                                  update('rates.pricing', pricing);
                                }}
                                placeholder="e.g., Jan 1, 2025 - Dec 31, 2025"
                                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              />
                            </td>
                            {['solo', 'oneRoomTwoPeople', 'oneRoomThreePeople', 'oneRoomFourPeople', 'twoRoomsFivePeople', 'threeRoomsSixPeople'].map((field) => (
                              <td key={field} className="px-4 py-3 whitespace-nowrap">
                                <input
                                  value={rate[field]}
                                  onChange={e => {
                                    const pricing = [...pkg.rates.pricing];
                                    pricing[index][field] = e.target.value;
                                    update('rates.pricing', pricing);
                                  }}
                                  placeholder="$0"
                                  className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                              </td>
                            ))}
                            <td className="px-4 py-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => {
                                  const pricing = pkg.rates.pricing.filter((_, i) => i !== index);
                                  update('rates.pricing', pricing);
                                }}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    onClick={addPricingPeriod}
                    className="inline-flex items-center px-4 py-2 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    + Add Pricing Period
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('accommodation')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('inclusions')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Inclusions →
                  </button>
                </div>
              </div>
            )}

            {/* Inclusions Section */}
            {activeSection === 'inclusions' && (
              <div className="p-6">
                <SectionHeader 
                  title="Inclusions & Exclusions" 
                  description="What's included and what's not in the package price"
                  icon="✅"
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Included in Price</h3>
                    <ArrayInputField
                      label="Included Items"
                      items={pkg.inclusions.included}
                      onAdd={() => addToArray('inclusions.included', '')}
                      onRemove={index => removeFromArray('inclusions.included', index)}
                      onUpdate={(index, value) => {
                        const included = [...pkg.inclusions.included];
                        included[index] = value;
                        update('inclusions.included', included);
                      }}
                      placeholder="e.g., Park fees, accommodation, meals"
                      minItems={5}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Excluded from Price</h3>
                    <ArrayInputField
                      label="Excluded Items"
                      items={pkg.inclusions.excluded}
                      onAdd={() => addToArray('inclusions.excluded', '')}
                      onRemove={index => removeFromArray('inclusions.excluded', index)}
                      onUpdate={(index, value) => {
                        const excluded = [...pkg.inclusions.excluded];
                        excluded[index] = value;
                        update('inclusions.excluded', excluded);
                      }}
                      placeholder="e.g., International flights, travel insurance"
                      minItems={3}
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('pricing')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('policies')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Policies →
                  </button>
                </div>
              </div>
            )}

            {/* Policies Section */}
            {activeSection === 'policies' && (
              <div className="p-6">
                <SectionHeader 
                  title="Policies & Safety" 
                  description="Cancellation policy and health safety information"
                  icon="📋"
                />
                
                <div className="space-y-6">
                  <TextAreaField
                    label="Cancellation Policy"
                    name="cancellationPolicy"
                    value={pkg.cancellationPolicy.description}
                    onChange={e => update('cancellationPolicy.description', e.target.value)}
                    placeholder="Detailed cancellation policy including deadlines and refund rates"
                    rows={4}
                    helpText="Be clear about cancellation deadlines and refund percentages"
                  />

                  <TextAreaField
                    label="Health & Safety Information"
                    name="healthSafety"
                    value={pkg.healthSafety.insurance}
                    onChange={e => update('healthSafety.insurance', e.target.value)}
                    placeholder="Health requirements, safety precautions, and insurance information"
                    rows={4}
                    helpText="Important health and safety information for travelers"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ArrayInputField
                      label="Health Requirements"
                      items={pkg.healthSafety.requirements}
                      onAdd={() => addToArray('healthSafety.requirements', '')}
                      onRemove={index => removeFromArray('healthSafety.requirements', index)}
                      onUpdate={(index, value) => {
                        const requirements = [...pkg.healthSafety.requirements];
                        requirements[index] = value;
                        update('healthSafety.requirements', requirements);
                      }}
                      placeholder="e.g., Yellow fever vaccination, COVID-19 test"
                    />

                    <ArrayInputField
                      label="Safety Precautions"
                      items={pkg.healthSafety.precautions}
                      onAdd={() => addToArray('healthSafety.precautions', '')}
                      onRemove={index => removeFromArray('healthSafety.precautions', index)}
                      onUpdate={(index, value) => {
                        const precautions = [...pkg.healthSafety.precautions];
                        precautions[index] = value;
                        update('healthSafety.precautions', precautions);
                      }}
                      placeholder="e.g., Stay in vehicle during game drives"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('inclusions')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('media')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: Media →
                  </button>
                </div>
              </div>
            )}

            {/* Media Section */}
            {activeSection === 'media' && (
              <div className="p-6">
                <SectionHeader 
                  title="Media Gallery" 
                  description="Upload and manage images for your package"
                  icon="🖼️"
                />
                
                {errors.gallery && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.gallery}</p>
                  </div>
                )}

                {errors.image && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.image}</p>
                  </div>
                )}

                {/* Main Image Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Package Image {!pkg.image && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={pkg.image}
                      onChange={e => update('image', e.target.value)}
                      placeholder="Select from gallery or enter URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setImageSelectorModal({ 
                        isOpen: true, 
                        onSelect: (urls) => {
                          if (urls.length > 0) {
                            update('image', urls[0]);
                          }
                        },
                        multiple: false
                      })}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Select from Gallery
                    </button>
                  </div>
                  {pkg.image && (
                    <div className="mt-2 w-32 h-32 relative rounded-lg overflow-hidden border border-gray-300">
                      <Image
                        src={pkg.image}
                        alt="Main package image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Image Upload Area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-gray-400 transition-colors"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="gallery-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                        <span>Upload images</span>
                        <input 
                          id="gallery-upload" 
                          name="gallery-upload" 
                          type="file" 
                          className="sr-only" 
                          multiple 
                          onChange={handleFileInput}
                          disabled={uploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP up to 10MB each</p>
                    <p className="text-xs text-gray-500">Minimum 8 images required for gallery</p>
                    {uploading && (
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </div>
                    )}
                  </div>
                </div>

                {/* Gallery Preview */}
                {pkg.gallery.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Gallery Images ({pkg.gallery.length}/8 minimum)
                      {pkg.gallery.length < 8 && (
                        <span className="text-amber-600 ml-2">• {8 - pkg.gallery.length} more required</span>
                      )}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {pkg.gallery.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-200">
                            <Image
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeFromArray('gallery', index)}
                                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-1 rounded-full transition-opacity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {pkg.image === image && (
                            <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1 rounded">
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => update('image', image)}
                            className="mt-1 w-full text-xs text-gray-600 hover:text-green-600 text-center"
                          >
                            {pkg.image === image ? 'Main Image' : 'Set as Main'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection('policies')}
                    className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection('seo')}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Next: SEO →
                  </button>
                </div>
              </div>
            )}

            {/* SEO Section */}
            {activeSection === 'seo' && (
              <div className="p-6">
                <SectionHeader 
                  title="SEO & Marketing" 
                  description="Optimize your package for search engines and marketing"
                  icon="🔍"
                />
                
                <div className="space-y-6">
                  <InputField
                    label="Meta Title"
                    name="metaTitle"
                    value={pkg.metaTitle}
                    onChange={e => update('metaTitle', e.target.value)}
                    placeholder="e.g., 7-Day Classic Serengeti Safari | Asili Explorer Safaris"
                    helpText="Title tag for search engines (50-60 characters recommended)"
                    maxLength={60}
                  />

                  <TextAreaField
                    label="Meta Description"
                    name="metaDescription"
                    value={pkg.metaDescription}
                    onChange={e => update('metaDescription', e.target.value)}
                    placeholder="Brief description for search engine results"
                    rows={3}
                    helpText="Description for search engines (150-160 characters recommended)"
                    maxLength={160}
                  />

                  <TextAreaField
                    label="Keywords"
                    name="keywords"
                    value={pkg.keywords}
                    onChange={e => update('keywords', e.target.value)}
                    placeholder="safari, serengeti, wildlife, tanzania, africa"
                    rows={2}
                    helpText="Comma-separated keywords for SEO"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Featured Package
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pkg.featured}
                          onChange={e => update('featured', e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Show as featured package</span>
                      </div>
                      <p className="text-xs text-gray-500">Featured packages appear prominently on the website</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Popular Package
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={pkg.popular}
                          onChange={e => update('popular', e.target.checked)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Show as popular package</span>
                      </div>
                      <p className="text-xs text-gray-500">Popular packages get special highlighting</p>
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setActiveSection('media')}
                      className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem('package-draft', JSON.stringify(pkg));
                          alert('Draft saved successfully!');
                        }}
                        className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Save Draft
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || uploading}
                        className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Package...
                          </>
                        ) : (
                          'Create Safari Package'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Form Status */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center text-sm text-blue-700">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong>Package Status:</strong> {pkg.gallery.length >= 8 ? 'Ready to publish' : 'Needs more images'}
                        {pkg.gallery.length < 8 && (
                          <span> • Add {8 - pkg.gallery.length} more image{pkg.gallery.length < 7 ? 's' : ''} to complete</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Image Selector Modal */}
      <ImageSelectorModal
        isOpen={imageSelectorModal.isOpen}
        onClose={() => setImageSelectorModal({ isOpen: false, onSelect: null })}
        onSelect={imageSelectorModal.onSelect}
        selectedImages={imageSelectorModal.onSelect ? [] : []}
        multiple={imageSelectorModal.multiple}
      />
    </div>
  );
}