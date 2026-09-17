import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, RefreshCw } from 'lucide-react';

import { PageHeader, Input, Select, Button, EmptyState, LoadingSpinner } from '../../components/common';
import FoodCard from '../../components/food/FoodCard';
import { mockFoodItems, foodCategories } from '../../utils/mockFoodData';
import { foodService } from '../../services/foodService';

const FoodDirectoryPage = () => {
  const [apiFoodItems, setApiFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('All');
  const [priceSort, setPriceSort] = useState('default');

  // Fetch real API food listings on mount
  useEffect(() => {
    let isMounted = true;
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const res = await foodService.getFoods();
        const rawList = res?.foods || res?.food;
        if (isMounted && res?.success && Array.isArray(rawList)) {
          // Map backend schema to FoodCard format
          const formatted = rawList.map((item) => ({
            id: item._id || item.id,
            _id: item._id,
            name: item.name,
            description: item.description,
            businessName: item.businessId?.organizationName || item.businessId?.name || 'Commercial Kitchen',
            location: item.pickupLocation?.address || item.pickupLocation?.city || 'Noida',
            distanceText: '1.8 km away',
            distanceKm: 1.8,
            image: item.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
            quantityText: `${item.quantity} ${item.quantityUnit || 'servings'} available`,
            quantity: item.quantity,
            price: item.price,
            originalPrice: item.originalPrice || Math.round(item.price * 2.2),
            discountPercent: item.discountPercent || 50,
            expiryTime: item.expiryTime,
            pickupDeadline: typeof item.expiryTime === 'string' ? item.expiryTime : '8:30 PM',
            category: item.category || 'Prepared Meals',
            status: item.status || 'AVAILABLE',
            fssaiVerified: true,
          }));
          setApiFoodItems(formatted);
        }
      } catch (err) {
        console.warn('API Food fetch warning (using mock fallback):', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchListings();
    return () => {
      isMounted = false;
    };
  }, []);

  // Combine API listings with mock data if API list is empty
  const allListings = useMemo(() => {
    if (apiFoodItems.length > 0) {
      return [...apiFoodItems, ...mockFoodItems];
    }
    return mockFoodItems;
  }, [apiFoodItems]);

  // Filtered and Sorted Food List
  const filteredFoodItems = useMemo(() => {
    return allListings
      .filter((item) => {
        // Text Search Match
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.businessName && item.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category Filter Match
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        // Status Filter Match
        const matchesStatus =
          selectedStatus === 'All' || item.status === selectedStatus;

        // Distance Filter Match
        const matchesDistance =
          selectedDistance === 'All' ||
          (selectedDistance === '5' && (item.distanceKm || 2) <= 5) ||
          (selectedDistance === '10' && (item.distanceKm || 2) <= 10);

        return matchesSearch && matchesCategory && matchesStatus && matchesDistance;
      })
      .sort((a, b) => {
        if (priceSort === 'low-to-high') return a.price - b.price;
        if (priceSort === 'high-to-low') return b.price - a.price;
        return 0;
      });
  }, [allListings, searchQuery, selectedCategory, selectedStatus, selectedDistance, priceSort]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedDistance('All');
    setPriceSort('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Surplus Food Marketplace"
        subtitle="Discover fresh surplus meals, bakery items, and catering portions from verified commercial kitchens in Noida & Delhi NCR."
      />

      {/* Filter Control Bar Container */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-charcoal-100 shadow-soft-sm space-y-4">
        {/* Search Bar & Dropdown Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="lg:col-span-5">
            <Input
              iconLeft={Search}
              placeholder="Search by dish name, restaurant, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div className="lg:col-span-2">
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Available', label: 'Available' },
                { value: 'Expiring Soon', label: 'Expiring Soon' },
              ]}
            />
          </div>

          {/* Distance Dropdown */}
          <div className="lg:col-span-2">
            <Select
              iconLeft={MapPin}
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              options={[
                { value: 'All', label: 'Any Distance' },
                { value: '5', label: 'Within 5 km' },
                { value: '10', label: 'Within 10 km' },
              ]}
            />
          </div>

          {/* Price Sorting Dropdown */}
          <div className="lg:col-span-3">
            <Select
              iconLeft={SlidersHorizontal}
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              options={[
                { value: 'default', label: 'Sort by: Featured' },
                { value: 'low-to-high', label: 'Price: Low to High' },
                { value: 'high-to-low', label: 'Price: High to Low' },
              ]}
            />
          </div>
        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-charcoal-100">
          <span className="text-xs font-bold text-charcoal-500 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {foodCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all duration-150 min-h-[36px]
                ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-soft-xs'
                    : 'bg-surface-50 text-charcoal-700 hover:bg-surface-100 hover:text-charcoal-900 border border-charcoal-100'
                }
              `}
            >
              {cat}
            </button>
          ))}

          {(selectedCategory !== 'All' ||
            selectedStatus !== 'All' ||
            selectedDistance !== 'All' ||
            searchQuery ||
            priceSort !== 'default') && (
            <Button
              size="sm"
              variant="ghost"
              iconLeft={RefreshCw}
              onClick={handleResetFilters}
              className="text-xs shrink-0 text-rose-600 hover:text-rose-700 ml-auto"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Directory Grid Header */}
      <div className="flex items-center justify-between text-xs text-charcoal-500 font-semibold px-1">
        <span>
          Showing <strong>{filteredFoodItems.length}</strong> surplus items available in Noida / NCR
        </span>
      </div>

      {/* Loading Spinner or Responsive Food Directory Grid */}
      {isLoading ? (
        <LoadingSpinner message="Fetching live surplus food listings..." size="lg" className="my-16" />
      ) : filteredFoodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.map((food) => (
            <FoodCard key={food.id || food._id} food={food} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No surplus food available right now."
          message="No active food listings matched your selected filters or search terms. Try clearing filters or checking back soon."
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
          className="my-12"
        />
      )}
    </div>
  );
};

export default FoodDirectoryPage;
