import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  item: Item;
}

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/history');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch order history', error);
        toast.error('Could not load order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark mb-4"></div>
          <p className="text-gray-800 text-lg font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-16">
        <div className="bg-white rounded-xl shadow-2xl p-12 text-center border-t-4 border-orange">
          <div className="text-6xl mb-6">📦</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start ordering delicious food today!</p>
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-primary-dark to-orange text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-primary-dark my-6">📦 Order History</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gradient-to-r from-primary-light to-orange p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Order ID: {order.id.slice(0, 8)}</p>
                  <p className="text-lg font-semibold">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="text-2xl font-bold mt-2">${Number(order.totalAmount).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Items:</h3>
              <div className="space-y-3">
                {order.items.map((orderItem) => (
                  <div 
                    key={orderItem.id} 
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <img 
                        src={orderItem.item.imageUrl || 'https://placehold.co/80x80'} 
                        alt={orderItem.item.name} 
                        className="w-16 h-16 object-cover rounded-lg mr-4 shadow"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{orderItem.item.name}</h4>
                        <p className="text-gray-600 text-sm">
                          ${Number(orderItem.priceAtPurchase).toFixed(2)} × {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-orange">
                      ${(Number(orderItem.priceAtPurchase) * orderItem.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link 
          to="/" 
          className="inline-block bg-gradient-to-r from-primary-dark to-orange text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
