// app/admin/packages/new/page.js
'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Custom Hooks
const useFormState = (initialState) => {
  const [state, setState] = useState(initialState);
  
  const updateField = useCallback((path, value) => {
    setState(prev => {
      const keys = path.split('.');
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  }, []);

  const updateArrayField = useCallback((path, operation, ...args) => {
    setState(prev => {
      const keys = path.split('.');
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      const array = current[lastKey] || [];
      
      switch (operation) {
        case 'add':
          current[lastKey] = [...array, args[0]];
          break;
        case 'remove':
          current[lastKey] = array.filter((_, i) => i !== args[0]);
          break;
        case 'update':
          current[lastKey] = array.map((item, i) => 
            i === args[0] ? args[1] : item
          );
          break;
        case 'toggle':
          current[lastKey] = array.includes(args[0])
            ? array.filter(item => item !== args[0])
            : [...array, args[0]];
          break;
        default:
          break;
      }
      
      return newState;
    });
  }, []);

  return { state, updateField, updateArrayField };
};

const useImageManager = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Simulate API call - replace with your actual upload endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock URL for demo purposes
      return {
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }, []);

  const uploadMultipleImages = useCallback(async (files) => {
    setUploading(true);
    const uploadedImages = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          try {
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: { progress: 0, status: 'uploading' }
            }));
            
            // Simulate progress
            for (let progress = 0; progress <= 100; progress += 20) {
              await new Promise(resolve => setTimeout(resolve, 100));
              setUploadProgress(prev => ({
                ...prev,
                [file.name]: { progress, status: 'uploading' }
              }));
            }
            
            const imageData = await uploadImage(file);
            uploadedImages.push(imageData);
            
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[file.name];
              return newProgress;
            });
            
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: { progress: 0, status: 'error', error: error.message }
            }));
          }
        }
      }
      
      return uploadedImages;
    } finally {
      setUploading(false);
    }
  }, [uploadImage]);

  return { uploading, uploadProgress, uploadMultipleImages };
};

// Professional Image Components
const ImageUploadProgress = ({ file, progress, status, error }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'uploading': return 'bg-blue-500';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return (
          <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'success':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
            {getStatusIcon()}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">
            {status === 'uploading' && `${Math.round(progress)}% uploading...`}
            {status === 'success' && 'Upload completed'}
            {status === 'error' && `Error: ${error}`}
          </p>
          {progress === 100 && (
            <span className="text-xs text-green-600 font-medium">Ready</span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfessionalImageCard = ({ 
  image, 
  isSelected, 
  isMain, 
  onSelect, 
  onSetMain, 
  onRemove, 
  showActions = true,
  size = 'medium'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  return (
    <div 
      className={`relative group rounded-lg border-2 transition-all duration-200 ${
        isSelected 
          ? 'border-green-500 ring-2 ring-green-200 ring-opacity-50' 
          : isMain
            ? 'border-blue-500 ring-2 ring-blue-200 ring-opacity-50'
            : 'border-gray-200 hover:border-gray-300'
      } ${sizeClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full h-full rounded-md overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={image.url || image}
            alt={image.name || 'Gallery image'}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
            <div className="bg-green-500 text-white rounded-full p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}

        {/* Hover Actions */}
        {showActions && (isHovered || isSelected) && (
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSetMain(image.url || image);
              }}
              className={`p-1 rounded-full shadow-lg transition-colors ${
                isMain 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
              title={isMain ? 'Main Image' : 'Set as Main'}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 bg-white text-red-600 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
              title="Remove Image"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Main Image Badge */}
        {isMain && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
            Main
          </div>
        )}
      </div>

      {/* Image Info */}
      {showActions && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="truncate font-medium">{image.name || 'Image'}</p>
          {image.size && (
            <p className="text-gray-300">
              {image.size > 1024 * 1024 
                ? `${(image.size / (1024 * 1024)).toFixed(1)} MB` 
                : `${Math.round(image.size / 1024)} KB`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const ProfessionalImageGallery = ({ 
  images, 
  selectedImages = [], 
  onImageSelect, 
  onSetMainImage, 
  onRemoveImage,
  selectionMode = 'multiple',
  mainImage = null
}) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-sm font-medium text-gray-900">No images</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by uploading some images.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-900">
          Image Gallery ({images.length})
        </h4>
        {selectedImages.length > 0 && (
          <span className="text-sm text-gray-600">
            {selectedImages.length} selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {images.map((image, index) => (
          <div 
            key={image.id || index}
            className="cursor-pointer"
            onClick={() => onImageSelect(image)}
          >
            <ProfessionalImageCard
              image={image}
              isSelected={selectedImages.includes(image.url || image)}
              isMain={mainImage === (image.url || image)}
              onSelect={() => onImageSelect(image)}
              onSetMain={onSetMainImage}
              onRemove={() => onRemoveImage(index)}
              showActions={true}
              size="medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfessionalImageUploadArea = ({ 
  onUpload, 
  uploading, 
  uploadProgress, 
  gallery, 
  selectedImage, 
  onSetMainImage, 
  onRemoveImage,
  onImageSelect
}) => {
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFiles(files);
    }
  }, [onUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    if (!dropAreaRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select image files only.');
      return;
    }

    // Check file sizes
    const oversizedFiles = imageFiles.filter(file => file.size > 10 * 1024 * 1024); // 10MB limit
    if (oversizedFiles.length > 0) {
      alert('Some files are too large. Maximum file size is 10MB.');
      return;
    }

    await onUpload(imageFiles);
  };

  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      await handleFiles(files);
    }
    e.target.value = '';
  };

  const uploadProgressEntries = Object.entries(uploadProgress);

  return (
    <div className="space-y-6">
      {/* Upload Progress */}
      {uploadProgressEntries.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Uploading Images</h4>
          {uploadProgressEntries.map(([fileName, progressData]) => (
            <ImageUploadProgress 
              key={fileName} 
              file={{ name: fileName, size: 0 }}
              progress={progressData.progress}
              status={progressData.status}
              error={progressData.error}
            />
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        ref={dropAreaRef}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver 
            ? 'border-green-500 bg-green-50 border-solid' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isDragOver && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <div className="bg-green-500 text-white rounded-full p-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-1 text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 transition-colors px-3 py-2 border border-gray-300 hover:border-green-500">
                <span>Choose images</span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="sr-only" 
                  multiple 
                  onChange={handleFileInput}
                  disabled={uploading}
                  accept="image/*"
                />
              </label>
              <p className="text-gray-500">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, WebP, HEIC up to 10MB each
            </p>
            <p className="text-xs text-gray-500">
              Recommended: 1200x800px or larger, landscape orientation
            </p>
          </div>

          {uploading && uploadProgressEntries.length === 0 && (
            <div className="flex items-center justify-center text-sm text-gray-600">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Preparing upload...
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <ProfessionalImageGallery
        images={gallery}
        selectedImages={[]}
        onImageSelect={onImageSelect}
        onSetMainImage={onSetMainImage}
        onRemoveImage={onRemoveImage}
        mainImage={selectedImage}
      />
    </div>
  );
};

const ProfessionalImageSelectorModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  gallery, 
  multiple = true,
  title = "Select Images",
  description = "Choose images from your gallery"
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name'

  useEffect(() => {
    if (!isOpen) {
      setSelectedImages([]);
    }
  }, [isOpen]);

  const sortedGallery = useMemo(() => {
    const sorted = [...gallery];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.uploadedAt || 0) - new Date(b.uploadedAt || 0));
      case 'name':
        return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      default:
        return sorted;
    }
  }, [gallery, sortBy]);

  const handleSelect = (image) => {
    if (multiple) {
      setSelectedImages(prev => 
        prev.includes(image) 
          ? prev.filter(img => img !== image)
          : [...prev, image]
      );
    } else {
      onSelect([image]);
      onClose();
    }
  };

  const handleConfirm = () => {
    onSelect(selectedImages);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>

              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {gallery.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No images available</h3>
              <p className="mt-2 text-sm text-gray-500">Upload some images first to select from your gallery.</p>
            </div>
          ) : (
            <div className={`p-6 overflow-y-auto h-full ${
              viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4' 
                : 'space-y-2'
            }`}>
              {sortedGallery.map((image, index) => (
                <div
                  key={image.id || index}
                  className={`cursor-pointer transition-all ${
                    viewMode === 'list' ? 'flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg' : ''
                  }`}
                  onClick={() => handleSelect(image.url || image)}
                >
                  <ProfessionalImageCard
                    image={image}
                    isSelected={selectedImages.includes(image.url || image)}
                    isMain={false}
                    onSelect={() => handleSelect(image.url || image)}
                    onSetMain={() => {}}
                    onRemove={() => {}}
                    showActions={false}
                    size={viewMode === 'list' ? 'small' : 'medium'}
                  />
                  {viewMode === 'list' && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {image.name || `Image ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {image.size ? `${(image.size / (1024 * 1024)).toFixed(1)} MB` : 'Unknown size'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {image.uploadedAt ? new Date(image.uploadedAt).toLocaleDateString() : 'Unknown date'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {multiple ? (
                <>
                  <span className="font-semibold text-gray-900">{selectedImages.length}</span> image{selectedImages.length !== 1 ? 's' : ''} selected
                  {selectedImages.length > 0 && ` of ${gallery.length} total`}
                </>
              ) : (
                'Select one image for the main package photo'
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              {multiple && (
                <button
                  onClick={handleConfirm}
                  disabled={selectedImages.length === 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Select {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoized Form Components
const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false, 
  className = '', 
  helpText, 
  min, 
  max, 
  step 
}) => (
  <div className="space-y-2">
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
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
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

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  rows = 4, 
  required = false, 
  helpText, 
  maxLength 
}) => (
  <div className="space-y-2">
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
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
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

const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  options, 
  required = false, 
  helpText 
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
        error ? 'border-red-300' : 'border-gray-300'
      }`}
      required={required}
    >
      <option value="">Select {label}</option>
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

const CheckboxGroup = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  helpText, 
  columns = 2 
}) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-3`}>
      {options.map(option => (
        <label key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900 block">{option.label}</span>
            {option.description && (
              <span className="text-xs text-gray-500 mt-1 block">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
  </div>
);

const ArrayInputField = ({ 
  label, 
  items, 
  onAdd, 
  onRemove, 
  onUpdate, 
  placeholder, 
  error, 
  minItems = 0, 
  helpText 
}) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label} {minItems > 0 && <span className="text-red-500">*</span>}
      </label>
      
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center group">
          <input
            value={item}
            onChange={e => onUpdate(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="px-3 py-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            Remove
          </button>
        </div>
      ))}
      
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      {minItems > 0 && items.length < minItems && (
        <p className="text-sm text-amber-600">
          Minimum {minItems} {label.toLowerCase()} required ({items.length}/{minItems})
        </p>
      )}
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};

// Main Component
export default function AddPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');
  const [imageSelector, setImageSelector] = useState({ 
    isOpen: false, 
    onSelect: null, 
    multiple: true,
    context: null 
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Image Manager Hook
  const { uploading, uploadProgress, uploadMultipleImages } = useImageManager();

  // Form State Management
  const initialFormData = {
    // Basic Information
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
    image: null,

    // Enhanced Details
    groupSizeMin: 1,
    groupSizeMax: 6,
    bestTimeToVisit: '',
    worstTimeToVisit: '',
    physicalDifficulty: 'easy',
    ageMin: 6,
    ageMax: '',
    
    // Lists & Arrays
    specializedTours: [],
    features: [],
    highlights: [],
    destinations: [],
    gallery: [],
    tourFeatures: [],
    tags: [],

    // Detailed Information
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
    
    // Policies & Safety
    cancellationPolicy: {
      description: '',
      deadlines: []
    },
    healthSafety: {
      requirements: [],
      precautions: [],
      insurance: 'Travel insurance is mandatory'
    },

    // SEO & Marketing
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    featured: false,
    popular: false,
    status: 'draft'
  };

  const { state: formData, updateField, updateArrayField } = useFormState(initialFormData);

  // Predefined options with enhanced data
  const comfortLevels = [
    { value: 'budget', label: 'Budget', description: 'Basic accommodations, shared facilities' },
    { value: 'mid-range', label: 'Mid-range', description: 'Comfortable lodges, private facilities' },
    { value: 'luxury', label: 'Luxury', description: 'Premium accommodations, exclusive experiences' },
    { value: 'ultra-luxury', label: 'Ultra Luxury', description: 'Five-star lodges, private guides, exclusive access' }
  ];

  const tourTypes = [
    { value: 'private', label: 'Private Tour', description: 'Exclusive vehicle and guide for your group' },
    { value: 'shared', label: 'Shared Tour', description: 'Join other travelers in a group' },
    { value: 'group', label: 'Group Tour', description: 'Fixed departure with larger group' },
    { value: 'custom', label: 'Custom Tour', description: 'Tailored itinerary to your preferences' }
  ];

  const safariTypes = [
    { value: 'lodge', label: 'Lodge Safari', description: 'Stay in comfortable lodges and hotels' },
    { value: 'camping', label: 'Camping Safari', description: 'Authentic camping experience' },
    { value: 'luxury-camping', label: 'Luxury Camping', description: 'High-end tented camps with amenities' },
    { value: 'tented', label: 'Tented Safari', description: 'Permanent tented camps' },
    { value: 'walking', label: 'Walking Safari', description: 'Explore on foot with expert guides' }
  ];

  const physicalDifficulties = [
    { value: 'very-easy', label: 'Very Easy', description: 'Minimal walking, mostly vehicle-based' },
    { value: 'easy', label: 'Easy', description: 'Light walking on flat surfaces' },
    { value: 'moderate', label: 'Moderate', description: 'Some walking on uneven terrain' },
    { value: 'challenging', label: 'Challenging', description: 'Long walks, hiking required' },
    { value: 'strenuous', label: 'Strenuous', description: 'Demanding hikes, high altitude' }
  ];

  const specializedTourOptions = [
    { value: 'safari', label: 'Safari', description: 'Classic wildlife viewing experience' },
    { value: 'wildlife', label: 'Wildlife', description: 'Focus on animal encounters and behavior' },
    { value: 'family', label: 'Family', description: 'Suitable for all ages with child-friendly activities' },
    { value: 'honeymoon', label: 'Honeymoon', description: 'Romantic experience with special touches' },
    { value: 'fly-in-safaris', label: 'Fly-in Safaris', description: 'Access remote areas by light aircraft' },
    { value: 'beach', label: 'Beach', description: 'Combine safari with coastal relaxation' },
    { value: 'cultural', label: 'Cultural', description: 'Focus on local communities and traditions' },
    { value: 'adventure', label: 'Adventure', description: 'Active experiences and challenges' },
    { value: 'photography', label: 'Photography', description: 'Guided photography opportunities' },
    { value: 'bird-watching', label: 'Bird Watching', description: 'Specialized birding experiences' }
  ];

  const featureOptions = [
    { value: 'can-start-any-day', label: 'Can Start Any Day', description: 'Flexible start dates' },
    { value: 'can-be-customized', label: 'Can Be Customized', description: 'Tailor the itinerary to your needs' },
    { value: 'suitable-for-solo-travelers', label: 'Suitable for Solo Travelers', description: 'Single traveler friendly' },
    { value: 'suitable-for-all-ages', label: 'Suitable for All Ages', description: 'All age groups welcome' },
    { value: 'airport-transfer-included', label: 'Airport Transfer Included', description: 'Complimentary airport transfers' },
    { value: 'itinerary-customizable', label: 'Itinerary Customizable', description: 'Personalize your journey' },
    { value: 'domestic-flight-included', label: 'Domestic Flight Included', description: 'Internal flights covered' },
    { value: 'great-migration', label: 'Great Migration', description: 'Witness the great migration' },
    { value: 'big-five-guaranteed', label: 'Big Five Guaranteed', description: 'See all Big Five animals' },
    { value: 'cultural-experience', label: 'Cultural Experience', description: 'Cultural interactions included' },
    { value: 'professional-guide', label: 'Professional Guide', description: 'Expert guide throughout' },
    { value: 'all-meals-included', label: 'All Meals Included', description: 'Full board accommodation' }
  ];

  const activityOptions = [
    { value: 'game-drives', label: 'Game Drives', description: 'Morning and evening wildlife drives' },
    { value: 'walking-safaris', label: 'Walking Safaris', description: 'Guided bush walks' },
    { value: 'bird-watching', label: 'Bird Watching', description: 'Specialized birding excursions' },
    { value: 'cultural-visits', label: 'Cultural Visits', description: 'Visit local communities' },
    { value: 'hot-air-balloon', label: 'Hot Air Balloon', description: 'Aerial safari experience' },
    { value: 'beach-activities', label: 'Beach Activities', description: 'Coastal and water activities' },
    { value: 'boat-safari', label: 'Boat Safari', description: 'Water-based wildlife viewing' },
    { value: 'night-game-drives', label: 'Night Game Drives', description: 'Nocturnal wildlife spotting' },
    { value: 'bush-dinners', label: 'Bush Dinners', description: 'Dining in the wilderness' },
    { value: 'photography-sessions', label: 'Photography Sessions', description: 'Guided photography' },
    { value: 'nature-walks', label: 'Nature Walks', description: 'Guided nature exploration' }
  ];

  // Navigation sections
  const sections = [
    { id: 'basic', title: 'Basic Info', icon: '📝', description: 'Core package details' },
    { id: 'details', title: 'Package Details', icon: '🔍', description: 'Specifications & requirements' },
    { id: 'itinerary', title: 'Itinerary', icon: '🗓️', description: 'Day-by-day schedule' },
    { id: 'activities', title: 'Activities', icon: '🎯', description: 'Included experiences' },
    { id: 'accommodation', title: 'Accommodation', icon: '🏨', description: 'Lodging & meals' },
    { id: 'pricing', title: 'Pricing', icon: '💰', description: 'Rates & costs' },
    { id: 'inclusions', title: 'Inclusions', icon: '✅', description: 'What\'s included/excluded' },
    { id: 'policies', title: 'Policies', icon: '📋', description: 'Terms & conditions' },
    { id: 'media', title: 'Media', icon: '🖼️', description: 'Images & gallery' },
    { id: 'seo', title: 'SEO', icon: '🔍', description: 'Search optimization' }
  ];

  // Auto-generators
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      updateField('slug', slug);
    }
  }, [formData.name, formData.slug, updateField]);

  useEffect(() => {
    if (formData.name && !formData.metaTitle) {
      updateField('metaTitle', `${formData.name} | Asili Explorer Safaris`);
    }
  }, [formData.name, formData.metaTitle, updateField]);

  useEffect(() => {
    if (formData.shortDescription && !formData.metaDescription) {
      const metaDesc = formData.shortDescription.length > 155 
        ? formData.shortDescription.substring(0, 155) + '...'
        : formData.shortDescription;
      updateField('metaDescription', metaDesc);
    }
  }, [formData.shortDescription, formData.metaDescription, updateField]);

  // Image handling
  const handleImageUpload = async (files) => {
    const uploadedImages = await uploadMultipleImages(files);
    if (uploadedImages.length > 0) {
      const newGallery = [...formData.gallery, ...uploadedImages];
      updateField('gallery', newGallery);
      
      if (!formData.image && uploadedImages.length > 0) {
        updateField('image', uploadedImages[0].url);
      }
    }
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = formData.gallery[index];
    if (formData.image === (imageToRemove.url || imageToRemove)) {
      updateField('image', '');
    }
    updateArrayField('gallery', 'remove', index);
  };

  const handleSetMainImage = (imageUrl) => {
    updateField('image', imageUrl);
  };

  const handleImageSelect = (image) => {
    // For main image selection
    updateField('image', image.url || image);
  };

  const addImagesToDay = async (dayIndex, files) => {
    const uploadedImages = await uploadMultipleImages(files);
    if (uploadedImages.length > 0) {
      const days = [...formData.route.days];
      if (!days[dayIndex].images) {
        days[dayIndex].images = [];
      }
      const newImages = uploadedImages.map(img => ({ url: img.url, id: img.id }));
      days[dayIndex].images = [...days[dayIndex].images, ...newImages];
      updateField('route.days', days);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    // Basic info validation
    if (!formData.name?.trim()) newErrors.name = 'Package name is required';
    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';
    if (!formData.shortDescription?.trim()) newErrors.shortDescription = 'Short description is required';
    if (formData.shortDescription?.length < 50) newErrors.shortDescription = 'Short description must be at least 50 characters';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'Valid duration is required';
    if (!formData.price || formData.price < 0) newErrors.price = 'Valid price is required';
    if (!formData.image) newErrors.image = 'Main image is required';
    
    // Media validation
    if (formData.gallery.length < 3) newErrors.gallery = 'Minimum 3 gallery images required';
    
    // Itinerary validation
    if (formData.route.days.length === 0) newErrors.route = 'At least one day is required';
    if (formData.route.days.some(day => !day.description?.trim())) {
      newErrors.route = 'All days must have descriptions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors before submitting');
      return;
    }

    setLoading(true);
    try {
      // Prepare form data for submission
      const submissionData = {
        ...formData,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        reviewCount: parseInt(formData.reviewCount),
        groupSizeMin: parseInt(formData.groupSizeMin),
        groupSizeMax: parseInt(formData.groupSizeMax),
        ageMin: parseInt(formData.ageMin),
        ageMax: formData.ageMax ? parseInt(formData.ageMax) : null,
        // Convert gallery to array of URLs
        gallery: formData.gallery.map(img => img.url || img),
        // Ensure image is a string URL
        image: typeof formData.image === 'string' ? formData.image : formData.image?.url,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, you would do:
      // const res = await fetch('/api/admin/packages', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submissionData),
      // });

      setSuccessMessage('Package created successfully!');
      setTimeout(() => {
        router.push('/admin/packages');
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error('Error creating package:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Inside your AddPackagePage component
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return; // Your existing validation

//   setLoading(true);
//   try {
//     // Prepare package data (your form state is already structured correctly)
//     const packageData = {
//       ...pkg,
//       // Ensure gallery is an array of URLs
//       gallery: pkg.gallery || [],
//       // Ensure image is a URL string
//       image: pkg.image || pkg.gallery?.[0] || ''
//     };

//     const res = await fetch('/admin/packages/api/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(packageData),
//     });

//     if (res.ok) {
//       alert('✅ Package created successfully!');
//       router.push('/admin/packages');
//     } else {
//       const errorData = await res.json();
//       throw new Error(errorData.error || 'Failed to create package');
//     }
//   } catch (error) {
//     alert(`❌ Error: ${error.message}`);
//   } finally {
//     setLoading(false);
//   }
// };
  

  // Helper functions
  const addRouteDay = () => {
    const newDay = {
      day: formData.route.days.length + 1,
      location: '',
      description: '',
      activities: [],
      accommodation: '',
      meals: '',
      images: []
    };
    updateArrayField('route.days', 'add', newDay);
  };

  const addPricingPeriod = () => {
    const newPricing = {
      period: '',
      solo: '',
      oneRoomTwoPeople: '',
      oneRoomThreePeople: '',
      oneRoomFourPeople: '',
      twoRoomsFivePeople: '',
      threeRoomsSixPeople: ''
    };
    updateArrayField('rates.pricing', 'add', newPricing);
  };

  const addAccommodationSchedule = () => {
    const newSchedule = {
      day: '',
      accommodation: '',
      accommodationType: '',
      meals: ''
    };
    updateArrayField('accommodationMeals.schedule', 'add', newSchedule);
  };

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    const requiredFields = [
      formData.name?.length >= 3,
      formData.slug?.length >= 3,
      formData.shortDescription?.length >= 50,
      formData.duration > 0,
      formData.price > 0,
      formData.image,
      formData.gallery.length >= 3,
      formData.route.days.length > 0,
      formData.route.days.every(day => day.description?.length >= 10)
    ];
    
    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formData]);

  // Section Header Component
  const SectionHeader = ({ title, description, icon, step, totalSteps }) => (
    <div className="border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {step && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  Step {step} of {totalSteps}
                </span>
              )}
            </div>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {completionPercentage}% complete
        </div>
      </div>
    </div>
  );

  // Success Message
  if (successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">{successMessage}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/admin/packages')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                View Packages
              </button>
              <button
                onClick={() => setSuccessMessage('')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Image Section Component
  const MainImageSection = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Package Image</h3>
      
      {errors.image && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-600">{errors.image}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Image Preview */}
        <div className="lg:w-1/3">
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
              {formData.image ? (
                <div className="relative w-full h-48">
                  <Image
                    src={formData.image}
                    alt="Main package image"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => updateField('image', '')}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-48 flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">No main image selected</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setImageSelector({ 
                  isOpen: true, 
                  onSelect: (urls) => {
                    if (urls.length > 0) {
                      updateField('image', urls[0]);
                    }
                  },
                  multiple: false,
                  context: 'main'
                })}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Choose from Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Main Image Info */}
        <div className="lg:w-2/3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Main Image Requirements</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• High-quality, professional photograph</li>
              <li>• Landscape orientation (16:9 ratio recommended)</li>
              <li>• Minimum resolution: 1200x800 pixels</li>
              <li>• File size: under 10MB</li>
              <li>• Formats: JPG, PNG, WebP</li>
              <li>• Should represent the package accurately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current section
  const renderSection = () => {
    const currentStep = sections.findIndex(s => s.id === activeSection) + 1;
    const totalSteps = sections.length;

    switch (activeSection) {
      case 'basic':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Basic Information" 
              description="Core details that identify your safari package"
              icon="📝"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Duration (Days)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={e => updateField('duration', parseInt(e.target.value) || 0)}
                error={errors.duration}
                required
                min="1"
                max="30"
                helpText="Total number of days including travel"
              />

              <div className="md:col-span-2">
                <InputField
                  label="Package Name"
                  name="name"
                  value={formData.name}
                  onChange={e => updateField('name', e.target.value)}
                  error={errors.name}
                  required
                  placeholder="e.g., Classic Serengeti & Ngorongoro Safari"
                  helpText="Clear, descriptive name for your package"
                />
              </div>

              <InputField
                label="URL Slug"
                name="slug"
                value={formData.slug}
                onChange={e => updateField('slug', e.target.value)}
                error={errors.slug}
                required
                helpText="URL-friendly version for SEO (auto-generated)"
              />

              <InputField
                label="Starting Price ($)"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={e => updateField('price', parseFloat(e.target.value) || 0)}
                error={errors.price}
                required
                min="0"
                helpText="Starting price per person in USD"
              />

              <InputField
                label="Starting From"
                name="startingFrom"
                value={formData.startingFrom}
                onChange={e => updateField('startingFrom', e.target.value)}
                placeholder="e.g., Arusha"
                helpText="City where the tour begins"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <SelectField
                label="Comfort Level"
                name="comfortLevel"
                value={formData.comfortLevel}
                onChange={e => updateField('comfortLevel', e.target.value)}
                options={comfortLevels}
                helpText="Quality of accommodations and services"
              />

              <SelectField
                label="Tour Type"
                name="tourType"
                value={formData.tourType}
                onChange={e => updateField('tourType', e.target.value)}
                options={tourTypes}
                helpText="How the tour is organized"
              />

              <SelectField
                label="Safari Type"
                name="safariType"
                value={formData.safariType}
                onChange={e => updateField('safariType', e.target.value)}
                options={safariTypes}
                helpText="Style of accommodation and experience"
              />
            </div>

            <div className="mt-6 space-y-4">
              <TextAreaField
                label="Short Description"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={e => updateField('shortDescription', e.target.value)}
                error={errors.shortDescription}
                required
                rows={3}
                maxLength={250}
                helpText="Brief overview for package listings (50-250 characters)"
              />

              <TextAreaField
                label="Full Description"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={e => updateField('fullDescription', e.target.value)}
                rows={6}
                helpText="Detailed description shown on the package page. Include highlights, unique experiences, and key selling points."
              />
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Package Details" 
              description="Detailed specifications and requirements"
              icon="🔍"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField
                label="Minimum Group Size"
                name="groupSizeMin"
                type="number"
                value={formData.groupSizeMin}
                onChange={e => updateField('groupSizeMin', parseInt(e.target.value) || 1)}
                min="1"
                max="100"
                helpText="Minimum number of people required"
              />

              <InputField
                label="Maximum Group Size"
                name="groupSizeMax"
                type="number"
                value={formData.groupSizeMax}
                onChange={e => updateField('groupSizeMax', parseInt(e.target.value) || 6)}
                min="1"
                max="100"
                helpText="Maximum number of people allowed"
              />

              <InputField
                label="Minimum Age"
                name="ageMin"
                type="number"
                value={formData.ageMin}
                onChange={e => updateField('ageMin', parseInt(e.target.value) || 6)}
                min="0"
                helpText="Minimum age requirement for participants"
              />

              <InputField
                label="Maximum Age"
                name="ageMax"
                type="number"
                value={formData.ageMax}
                onChange={e => updateField('ageMax', e.target.value ? parseInt(e.target.value) : '')}
                placeholder="Leave empty for no maximum"
                min="0"
                helpText="Maximum age limit (optional)"
              />

              <SelectField
                label="Physical Difficulty"
                name="physicalDifficulty"
                value={formData.physicalDifficulty}
                onChange={e => updateField('physicalDifficulty', e.target.value)}
                options={physicalDifficulties}
                helpText="Physical demands of the safari"
              />

              <InputField
                label="Best Time to Visit"
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={e => updateField('bestTimeToVisit', e.target.value)}
                placeholder="e.g., June to October"
                helpText="Optimal months for this safari"
              />

              <InputField
                label="Worst Time to Visit"
                name="worstTimeToVisit"
                value={formData.worstTimeToVisit}
                onChange={e => updateField('worstTimeToVisit', e.target.value)}
                placeholder="e.g., April to May (rainy season)"
                helpText="Months to avoid or challenging periods"
              />
            </div>

            <div className="mt-6">
              <CheckboxGroup
                label="Specialized Tour Types"
                options={specializedTourOptions}
                selected={formData.specializedTours}
                onChange={(option) => updateArrayField('specializedTours', 'toggle', option)}
                helpText="Select all categories that apply to this package"
                columns={3}
              />
            </div>

            <div className="mt-6">
              <CheckboxGroup
                label="Package Features"
                options={featureOptions}
                selected={formData.features}
                onChange={(option) => updateArrayField('features', 'toggle', option)}
                helpText="Key features and amenities included"
                columns={2}
              />
            </div>
          </div>
        );

      case 'itinerary':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Detailed Itinerary" 
              description="Day-by-day breakdown of the safari experience"
              icon="🗓️"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            {errors.route && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600">{errors.route}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <InputField
                label="Route Start"
                name="routeStart"
                value={formData.route.start}
                onChange={e => updateField('route.start', e.target.value)}
                placeholder="e.g., Arusha (Day 1)"
                helpText="Starting point of the tour"
              />
              <InputField
                label="Route End"
                name="routeEnd"
                value={formData.route.end}
                onChange={e => updateField('route.end', e.target.value)}
                placeholder="e.g., Arusha (Day 7)"
                helpText="Ending point of the tour"
              />
            </div>

            <div className="space-y-6">
              {formData.route.days.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Day {day.day}</h3>
                    <button
                      type="button"
                      onClick={() => updateArrayField('route.days', 'remove', index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Remove Day
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Day Number"
                      value={day.day}
                      onChange={e => {
                        updateArrayField('route.days', 'update', index, {
                          ...day,
                          day: e.target.value
                        });
                      }}
                      placeholder="e.g., 1 or 5-6"
                      className="md:col-span-1"
                      helpText="Day number or range"
                    />
                    
                    <InputField
                      label="Location"
                      value={day.location}
                      onChange={e => {
                        updateArrayField('route.days', 'update', index, {
                          ...day,
                          location: e.target.value
                        });
                      }}
                      placeholder="e.g., Serengeti National Park"
                      className="md:col-span-2"
                      helpText="Main location for this day"
                    />
                    
                    <TextAreaField
                      label="Description"
                      value={day.description}
                      onChange={e => {
                        updateArrayField('route.days', 'update', index, {
                          ...day,
                          description: e.target.value
                        });
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
                            <div key={image.id || imageIndex} className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 group">
                              <Image
                                src={image.url || image}
                                alt={`Day ${day.day} image ${imageIndex + 1}`}
                                fill
                                className="object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDay = {
                                    ...day,
                                    images: day.images.filter((_, i) => i !== imageIndex)
                                  };
                                  updateArrayField('route.days', 'update', index, updatedDay);
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
                          onClick={() => setImageSelector({ 
                            isOpen: true, 
                            onSelect: (urls) => {
                              const updatedDay = {
                                ...day,
                                images: [...(day.images || []), ...urls.map(url => ({ url, id: Math.random().toString(36).substr(2, 9) }))]
                              };
                              updateArrayField('route.days', 'update', index, updatedDay);
                            },
                            multiple: true
                          })}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Select from Gallery
                        </button>
                        
                        <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
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
          </div>
        );

      case 'activities':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Activities & Transportation" 
              description="What activities are included and transportation details"
              icon="🎯"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="space-y-6">
              <CheckboxGroup
                label="Activities Included"
                options={activityOptions}
                selected={formData.activitiesTransportation.activities}
                onChange={(option) => updateArrayField('activitiesTransportation.activities', 'toggle', option)}
                helpText="Select all activities included in this package"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InputField
                  label="Vehicle Type"
                  value={formData.activitiesTransportation.vehicle}
                  onChange={e => updateField('activitiesTransportation.vehicle', e.target.value)}
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
                      checked={formData.activitiesTransportation.flightIncluded}
                      onChange={e => updateField('activitiesTransportation.flightIncluded', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Domestic flights included</span>
                  </div>
                  {formData.activitiesTransportation.flightIncluded && (
                    <InputField
                      label="Flight Details"
                      value={formData.activitiesTransportation.flightDetails}
                      onChange={e => updateField('activitiesTransportation.flightDetails', e.target.value)}
                      placeholder="e.g., Nairobi to Maasai Mara"
                      helpText="Details about included flights"
                    />
                  )}
                </div>
              </div>

              <TextAreaField
                label="Transfer Information"
                value={formData.activitiesTransportation.transfer}
                onChange={e => updateField('activitiesTransportation.transfer', e.target.value)}
                placeholder="Details about airport transfers and transportation"
                rows={3}
                helpText="Information about pickups, dropoffs, and transfers"
              />
            </div>
          </div>
        );

      case 'accommodation':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Accommodation & Meals" 
              description="Lodging details and meal arrangements"
              icon="🏨"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <TextAreaField
              label="Accommodation Note"
              value={formData.accommodationMeals.note}
              onChange={e => updateField('accommodationMeals.note', e.target.value)}
              placeholder="Additional information about accommodation options, upgrades, or special arrangements"
              rows={3}
              helpText="This appears in the accommodation section of the package page"
            />

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Accommodation Schedule</label>
              {formData.accommodationMeals.schedule.map((schedule, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <InputField
                      label="Day"
                      value={schedule.day}
                      onChange={e => {
                        updateArrayField('accommodationMeals.schedule', 'update', index, {
                          ...schedule,
                          day: e.target.value
                        });
                      }}
                      placeholder="e.g., 1 or 5-6"
                      helpText="Day number or range"
                    />
                    <InputField
                      label="Accommodation Name"
                      value={schedule.accommodation}
                      onChange={e => {
                        updateArrayField('accommodationMeals.schedule', 'update', index, {
                          ...schedule,
                          accommodation: e.target.value
                        });
                      }}
                      placeholder="e.g., Serengeti Serena Lodge"
                      helpText="Name of the accommodation"
                    />
                    <InputField
                      label="Accommodation Type"
                      value={schedule.accommodationType}
                      onChange={e => {
                        updateArrayField('accommodationMeals.schedule', 'update', index, {
                          ...schedule,
                          accommodationType: e.target.value
                        });
                      }}
                      placeholder="e.g., Luxury Lodge"
                      helpText="Type or category of accommodation"
                    />
                    <InputField
                      label="Meals Included"
                      value={schedule.meals}
                      onChange={e => {
                        updateArrayField('accommodationMeals.schedule', 'update', index, {
                          ...schedule,
                          meals: e.target.value
                        });
                      }}
                      placeholder="e.g., Breakfast, Lunch & Dinner"
                      helpText="Meals included on this day"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => updateArrayField('accommodationMeals.schedule', 'remove', index)}
                    className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
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
          </div>
        );

      case 'pricing':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Pricing & Rates" 
              description="Set pricing for different periods and group sizes"
              icon="💰"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="space-y-4">
              <TextAreaField
                label="Pricing Disclaimer"
                value={formData.rates.disclaimer}
                onChange={e => updateField('rates.disclaimer', e.target.value)}
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
                    {formData.rates.pricing.map((rate, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            value={rate.period}
                            onChange={e => {
                              updateArrayField('rates.pricing', 'update', index, {
                                ...rate,
                                period: e.target.value
                              });
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
                                updateArrayField('rates.pricing', 'update', index, {
                                  ...rate,
                                  [field]: e.target.value
                                });
                              }}
                              placeholder="$0"
                              className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                          </td>
                        ))}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => updateArrayField('rates.pricing', 'remove', index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
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
          </div>
        );

      case 'inclusions':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Inclusions & Exclusions" 
              description="What's included and what's not in the package price"
              icon="✅"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Included in Price</h3>
                <ArrayInputField
                  label="Included Items"
                  items={formData.inclusions.included}
                  onAdd={(item) => updateArrayField('inclusions.included', 'add', item)}
                  onRemove={(index) => updateArrayField('inclusions.included', 'remove', index)}
                  onUpdate={(index, value) => updateArrayField('inclusions.included', 'update', index, value)}
                  placeholder="e.g., Park fees, accommodation, meals"
                  minItems={3}
                  helpText="Items included in the package price"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Excluded from Price</h3>
                <ArrayInputField
                  label="Excluded Items"
                  items={formData.inclusions.excluded}
                  onAdd={(item) => updateArrayField('inclusions.excluded', 'add', item)}
                  onRemove={(index) => updateArrayField('inclusions.excluded', 'remove', index)}
                  onUpdate={(index, value) => updateArrayField('inclusions.excluded', 'update', index, value)}
                  placeholder="e.g., International flights, travel insurance"
                  minItems={2}
                  helpText="Items not included in the package price"
                />
              </div>
            </div>
          </div>
        );

      case 'policies':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Policies & Safety" 
              description="Cancellation policy and health safety information"
              icon="📋"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="space-y-6">
              <TextAreaField
                label="Cancellation Policy"
                value={formData.cancellationPolicy.description}
                onChange={e => updateField('cancellationPolicy.description', e.target.value)}
                placeholder="Detailed cancellation policy including deadlines and refund rates"
                rows={4}
                helpText="Be clear about cancellation deadlines and refund percentages"
              />

              <TextAreaField
                label="Health & Safety Information"
                value={formData.healthSafety.insurance}
                onChange={e => updateField('healthSafety.insurance', e.target.value)}
                placeholder="Health requirements, safety precautions, and insurance information"
                rows={4}
                helpText="Important health and safety information for travelers"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ArrayInputField
                  label="Health Requirements"
                  items={formData.healthSafety.requirements}
                  onAdd={(item) => updateArrayField('healthSafety.requirements', 'add', item)}
                  onRemove={(index) => updateArrayField('healthSafety.requirements', 'remove', index)}
                  onUpdate={(index, value) => updateArrayField('healthSafety.requirements', 'update', index, value)}
                  placeholder="e.g., Yellow fever vaccination, COVID-19 test"
                  helpText="Health requirements for participants"
                />

                <ArrayInputField
                  label="Safety Precautions"
                  items={formData.healthSafety.precautions}
                  onAdd={(item) => updateArrayField('healthSafety.precautions', 'add', item)}
                  onRemove={(index) => updateArrayField('healthSafety.precautions', 'remove', index)}
                  onUpdate={(index, value) => updateArrayField('healthSafety.precautions', 'update', index, value)}
                  placeholder="e.g., Stay in vehicle during game drives"
                  helpText="Safety measures and precautions"
                />
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="p-6">
            <SectionHeader 
              title="Media Gallery" 
              description="Upload and manage images for your package"
              icon="🖼️"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            {errors.gallery && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600">{errors.gallery}</p>
                </div>
              </div>
            )}

            {/* Main Image Section */}
            <MainImageSection />

            {/* Gallery Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Gallery</h3>
              <ProfessionalImageUploadArea
                onUpload={handleImageUpload}
                uploading={uploading}
                uploadProgress={uploadProgress}
                gallery={formData.gallery}
                selectedImage={formData.image}
                onSetMainImage={handleSetMainImage}
                onRemoveImage={handleRemoveImage}
                onImageSelect={handleImageSelect}
              />
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="p-6">
            <SectionHeader 
              title="SEO & Marketing" 
              description="Optimize your package for search engines and marketing"
              icon="🔍"
              step={currentStep}
              totalSteps={totalSteps}
            />
            
            <div className="space-y-6">
              <InputField
                label="Meta Title"
                value={formData.metaTitle}
                onChange={e => updateField('metaTitle', e.target.value)}
                placeholder="e.g., 7-Day Classic Serengeti Safari | Asili Explorer Safaris"
                helpText="Title tag for search engines (50-60 characters recommended)"
                maxLength={60}
              />

              <TextAreaField
                label="Meta Description"
                value={formData.metaDescription}
                onChange={e => updateField('metaDescription', e.target.value)}
                placeholder="Brief description for search engine results"
                rows={3}
                helpText="Description for search engines (150-160 characters recommended)"
                maxLength={160}
              />

              <TextAreaField
                label="Keywords"
                value={formData.keywords}
                onChange={e => updateField('keywords', e.target.value)}
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
                      checked={formData.featured}
                      onChange={e => updateField('featured', e.target.checked)}
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
                      checked={formData.popular}
                      onChange={e => updateField('popular', e.target.checked)}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Show as popular package</span>
                  </div>
                  <p className="text-xs text-gray-500">Popular packages get special highlighting</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
                <p className="text-sm text-gray-600 mt-1">
                  Build a comprehensive safari package with all necessary details
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                ← Back to Packages
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Form Completion</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex overflow-x-auto space-x-1 pb-2 scrollbar-hide">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-green-100 text-green-800 border border-green-200 shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span className="text-base">{section.icon}</span>
                  <span>{section.title}</span>
                  {index < sections.findIndex(s => s.id === activeSection) && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {renderSection()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === 'basic'}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('safari-package-draft', JSON.stringify({
                      ...formData,
                      savedAt: new Date().toISOString()
                    }));
                    alert('Draft saved successfully! You can continue later.');
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Save Draft
                </button>

                {activeSection === 'seo' ? (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading || uploading}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Package...
                      </>
                    ) : (
                      'Create Safari Package'
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id);
                      }
                    }}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    Next: {sections[sections.findIndex(s => s.id === activeSection) + 1]?.title}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Form Status */}
            {activeSection === 'seo' && (
              <div className="px-6 pb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-800">Package Status</h4>
                      <div className="mt-1 text-sm text-blue-700">
                        {completionPercentage === 100 ? (
                          <p>✅ Your package is ready to publish! All required fields are completed.</p>
                        ) : (
                          <p>
                            <strong>Completion:</strong> {completionPercentage}% • 
                            {formData.gallery.length < 3 && ` • Need ${3 - formData.gallery.length} more image${formData.gallery.length < 2 ? 's' : ''}`}
                            {!formData.image && ' • Set a main image'}
                            {formData.route.days.length === 0 && ' • Add itinerary days'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Professional Image Selector Modal */}
      <ProfessionalImageSelectorModal
        isOpen={imageSelector.isOpen}
        onClose={() => setImageSelector({ isOpen: false, onSelect: null })}
        onSelect={imageSelector.onSelect}
        gallery={formData.gallery}
        multiple={imageSelector.multiple}
        title={imageSelector.context === 'main' ? "Select Main Image" : "Select Images"}
        description={imageSelector.context === 'main' 
          ? "Choose the main image that will represent your package" 
          : "Select images from your gallery"
        }
      />
    </div>
  );
}