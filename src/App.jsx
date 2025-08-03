import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./components/PropertyCard";
import AddPropertyForm from "./components/AddPropertyForm";
import PropertyModal from "./components/PropertyModal";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://property-dashboard-api-4ywm.onrender.com/properties");
      setProperties(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError("Failed to fetch properties. Please make sure the server is running.");
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let data = properties;
    if (typeFilter) {
      data = data.filter((p) => p.type.toLowerCase() === typeFilter.toLowerCase());
    }
    if (search) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(data);
  }, [typeFilter, search, properties]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-blue-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={fetchProperties}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-6">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Property Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Discover and manage your property listings</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {showAddForm ? 'Hide Form' : 'Add Property'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Properties</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">All Types</option>
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
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing <span className="text-blue-600 font-bold">{filtered.length}</span> of <span className="text-gray-800 font-bold">{properties.length}</span> properties
          </p>
        </div>

        {/* Add Property Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
            <AddPropertyForm 
              onAdded={() => {
                fetchProperties();
                setShowAddForm(false);
              }} 
            />
          </div>
        )}

        {/* Property Cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onView={() => setSelected(property)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-blue-100">
            <div className="text-blue-400 text-8xl mb-6">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No properties found</h3>
            <p className="text-gray-600 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
          </div>
        )}

        {/* Modal */}
        {selected && (
          <PropertyModal property={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}
