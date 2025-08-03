import { useState } from "react";
import axios from "axios";

export default function AddPropertyForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    type: "Plot",
    price: "",
    location: "",
    description: "",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    lat: "",
    lng: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getImageForType = (type) => {
    switch (type) {
      case 'Plot':
        return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop';
      case 'Shed':
        return 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop';
      case 'Retail Store':
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
      case 'Apartment':
        return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop';
      case 'House':
        return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop';
      case 'Office':
        return 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop';
      case 'Warehouse':
        return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop';
      case 'Restaurant':
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop';
      case 'Hotel':
        return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
      case 'Factory':
        return 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop';
      case 'Land':
        return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop';
      case 'Shop':
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updatedForm = { ...prev, [name]: value };
      
      // Auto-update image when property type changes
      if (name === 'type') {
        updatedForm.image = getImageForType(value);
      }
      
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    try {
      await axios.post("https://property-dashboard-api-4ywm.onrender.com/properties", {
        ...form,
        price: parseFloat(form.price),
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng)
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onAdded();
      }, 1500);
      
      setForm({
        name: "",
        type: "Plot",
        price: "",
        location: "",
        description: "",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
        lat: "",
        lng: ""
      });
    } catch (error) {
      console.error("Error adding property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                Property added successfully! Redirecting to home page...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h2>
        <p className="text-gray-600">Fill in the details below to add a new property listing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Name *</label>
              <input
                name="name"
                placeholder="Enter property name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Plot">Plot</option>
                <option value="Land">Land</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Shed">Shed</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Factory">Factory</option>
              </select>
            </div>
          </div>
          
          {/* Image Preview */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Image Preview</label>
            <div className="relative rounded-xl overflow-hidden border border-blue-200">
              <img
                src={form.image}
                alt={`${form.type} preview`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">{form.type} Property</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Pricing
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (USD) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-medium">$</span>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                name="location"
                placeholder="Enter location"
                value={form.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude</label>
              <input
                name="lat"
                type="number"
                placeholder="0.000000"
                value={form.lat}
                onChange={handleChange}
                step="any"
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude</label>
              <input
                name="lng"
                type="number"
                placeholder="0.000000"
                value={form.lng}
                onChange={handleChange}
                step="any"
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Enter property description..."
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Adding Property...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
