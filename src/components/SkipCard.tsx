import React from 'react';
import { Skip } from '../types';
import { Truck, Home, AlertTriangle, CheckCircle, Calendar, KeyRound as Pound } from 'lucide-react';

interface SkipCardProps {
  skip: Skip;
  onSelect: (skip: Skip) => void;
  isSelected?: boolean;
}

export const SkipCard: React.FC<SkipCardProps> = ({ skip, onSelect, isSelected = false }) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  const vatAmount = skip.price_before_vat * (skip.vat / 100);

  const handleSelect = () => {
    onSelect(skip);
  };

  return (
    <div 
      className={`
        relative bg-white rounded-xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}
      `}
      onClick={handleSelect}
    >
      {/* Skip Size Badge */}
      <div className="absolute -top-3 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
        {skip.size} Yards
      </div>

      <div className="p-6 pt-8">
        {/* Skip Image Placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-yellow-900 font-bold text-lg">
            {skip.size}Y SKIP
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Hire Period</span>
            </div>
            <span className="text-sm font-medium">{skip.hire_period_days} days</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {skip.allowed_on_road ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-sm text-gray-600">Road Placement</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              skip.allowed_on_road 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {skip.allowed_on_road ? 'Allowed' : 'Not Allowed'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {skip.allows_heavy_waste ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-sm text-gray-600">Heavy Waste</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              skip.allows_heavy_waste 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {skip.allows_heavy_waste ? 'Allowed' : 'Not Allowed'}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Price (ex. VAT)</span>
            <span className="text-sm">£{skip.price_before_vat.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">VAT ({skip.vat}%)</span>
            <span className="text-sm">£{vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <div className="flex items-center gap-1">
              <Pound className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900">Total Price</span>
            </div>
            <span className="text-xl font-bold text-blue-600">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Select Button */}
        <button 
          className={`
            w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-200
            ${isSelected 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }
          `}
        >
          {isSelected ? 'Selected' : 'Select This Skip'}
        </button>
      </div>
    </div>
  );
};