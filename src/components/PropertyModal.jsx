import React, { useState } from "react";

export default function PropertyModal({ property, onClose }) {
  const [imageError, setImageError] = useState(false);
  
  const mapUrl = property.lat && property.lng
    ? `https://www.google.com/maps?q=${property.lat},${property.lng}&hl=en&z=14&output=embed`
    : null;

  const handleImageError = () => {
    setImageError(true);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Plot':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Land':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'House':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Apartment':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Office':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Shop':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Retail Store':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Restaurant':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Hotel':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Shed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Warehouse':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Factory':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-blue-600 text-3xl font-bold z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          ×
        </button>
        
        <div className="p-8">
          {/* Image Section */}
          <div className="mb-8">
            {!imageError ? (
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-80 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-blue-500 font-medium">Image not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-0">{property.name}</h2>
              <span className={`px-4 py-2 text-sm font-bold rounded-full border ${getTypeColor(property.type)}`}>
                {property.type}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-900 font-semibold">{property.location}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Price</p>
                  <p className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </div>
          </div>

          {/* Map Section */}
          {mapUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                Location on Map
              </h3>
              <div className="rounded-2xl overflow-hidden border-2 border-blue-200 shadow-lg">
                <iframe
                  title="Google Map"
                  src={mapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
