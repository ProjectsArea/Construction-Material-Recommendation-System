import React from 'react';
import { Star, Heart } from 'lucide-react';

const MaterialCard = ({ material = {
  image: 'https://via.placeholder.com/300x200',
  name: 'Material Name',
  rating: 0,
  description: 'Material description goes here',
  price: 0
} }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{material.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{material.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{material.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${material.price}</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard; 