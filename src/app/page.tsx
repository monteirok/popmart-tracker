'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import OrderCard from '@/components/OrderCard';
import OrderForm from '@/components/OrderForm';
import { useOrders } from '@/hooks/useOrders';
import { Order, OrderStatus, OrderStatusLabels } from '@/types/order';

export default function Home() {
  const { orders, loading, addOrder, updateOrder, deleteOrder } = useOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowOrderForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setShowOrderForm(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId);
    }
  };

  const handleSaveOrder = (orderData: Omit<Order, 'id'>) => {
    if (editingOrder) {
      updateOrder(editingOrder.id, orderData);
    } else {
      addOrder(orderData);
    }
    setShowOrderForm(false);
    setEditingOrder(null);
  };

  const handleCancelForm = () => {
    setShowOrderForm(false);
    setEditingOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading orders...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
            <button
              onClick={handleAddOrder}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Add Order
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Orders ({orders.length})
            </button>
            
            {Object.values(OrderStatus).map(status => {
              const count = orders.filter(order => order.status === status).length;
              if (count === 0) return null;
              
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {OrderStatusLabels[status]} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {statusFilter === 'all' ? 'No orders found' : `No ${OrderStatusLabels[statusFilter as OrderStatus].toLowerCase()} orders`}
            </h3>
            <p className="text-gray-600">
              {statusFilter === 'all' 
                ? "You haven't placed any orders yet." 
                : `You don't have any ${OrderStatusLabels[statusFilter as OrderStatus].toLowerCase()} orders.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onEdit={handleEditOrder}
                onDelete={handleDeleteOrder}
              />
            ))}
          </div>
        )}
      </div>

      {showOrderForm && (
        <OrderForm
          order={editingOrder || undefined}
          onSave={handleSaveOrder}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}
