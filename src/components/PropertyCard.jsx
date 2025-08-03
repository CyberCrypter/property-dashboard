import React, { useState } from "react";

export default function PropertyCard({ property, onView }) {
  const [imageError, setImageError] = useState(false);

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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 overflow-hidden group">
      <div className="h-56 bg-gray-200 relative overflow-hidden">
        {!imageError ? (
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
              <svg className="w-16 h-16 text-blue-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-blue-500 text-sm font-medium">Image not available</p>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${getTypeColor(property.type)}`}>
            {property.type}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {property.name}
        </h2>
        
        <div className="flex items-center mb-3">
          <svg className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-600 text-sm font-medium truncate">{property.location}</p>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Price</span>
            <p className="font-bold text-2xl text-blue-600">${property.price.toLocaleString()}</p>
          </div>
          <button
            onClick={onView}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
