import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to FoodOrder
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Browse our delicious menu and order your favorite items!
      </p>
      
      {/* Items will be displayed here later */}
      <div className="text-center text-gray-500">
        <p>Items coming soon...</p>
      </div>
    </div>
  );
};

export default HomePage;
