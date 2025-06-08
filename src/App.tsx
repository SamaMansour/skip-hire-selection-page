import React, { useState, useMemo } from 'react';
import { useSkips } from './hooks/useSkips';
import { SkipCard } from './components/SkipCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { FilterSort } from './components/FilterSort';
import { Skip } from './types';
import { MapPin, Truck, CheckCircle } from 'lucide-react';

function App() {
  const { skips, loading, error, refetch } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [sortBy, setSortBy] = useState<'size' | 'price'>('size');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showRoadOnly, setShowRoadOnly] = useState(false);
  const [showHeavyWasteOnly, setShowHeavyWasteOnly] = useState(false);

  const filteredAndSortedSkips = useMemo(() => {
    let filtered = [...skips];

    // Apply filters
    if (showRoadOnly) {
      filtered = filtered.filter(skip => skip.allowed_on_road);
    }
    if (showHeavyWasteOnly) {
      filtered = filtered.filter(skip => skip.allows_heavy_waste);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'size') {
        comparison = a.size - b.size;
      } else {
        const priceA = a.price_before_vat * (1 + a.vat / 100);
        const priceB = b.price_before_vat * (1 + b.vat / 100);
        comparison = priceA - priceB;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [skips, sortBy, sortOrder, showRoadOnly, showHeavyWasteOnly]);

  const handleSortChange = (by: 'size' | 'price', order: 'asc' | 'desc') => {
    setSortBy(by);
    setSortOrder(order);
  };

  const handleFilterChange = (road: boolean, heavyWaste: boolean) => {
    setShowRoadOnly(road);
    setShowHeavyWasteOnly(heavyWaste);
  };

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Truck className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Skip Hire Service</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect skip size for your project. All prices include delivery, collection, and disposal.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Serving NR32 Lowestoft area</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {!loading && !error && skips.length > 0 && (
          <>
            <FilterSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              showRoadOnly={showRoadOnly}
              showHeavyWasteOnly={showHeavyWasteOnly}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
            />

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedSkips.length} of {skips.length} available skip sizes
              </p>
            </div>

            {/* Skip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredAndSortedSkips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  onSelect={handleSkipSelect}
                  isSelected={selectedSkip?.id === skip.id}
                />
              ))}
            </div>

            {/* Selected Skip Summary */}
            {selectedSkip && (
              <div className="bg-white rounded-xl shadow-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Selected: {selectedSkip.size} Yard Skip
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      £{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Total Price</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedSkip.hire_period_days}
                    </div>
                    <div className="text-sm text-gray-600">Days Hire</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedSkip.size}Y
                    </div>
                    <div className="text-sm text-gray-600">Skip Size</div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
                  Continue with {selectedSkip.size} Yard Skip
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && skips.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Skips Available</h3>
            <p className="text-gray-600">No skip sizes are currently available for this area.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;