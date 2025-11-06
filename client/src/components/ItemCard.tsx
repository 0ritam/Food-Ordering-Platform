import React from 'react';
import { toast } from 'react-hot-toast';
import api from '../api/axiosConfig';

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const handleAddToCart = async () => {
    try {
      await api.post('/cart', {
        itemId: item.id,
        quantity: 1,
      });
      toast.success(`${item.name} added to cart!`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Please log in to add items.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={item.imageUrl || 'https://placehold.co/600x400'}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-800">
            ${Number(item.price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={item.stock === 0}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
