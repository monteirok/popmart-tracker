'use client';

import { useState, useEffect } from 'react';
import { Order, OrderStatus, OrderStatusLabels } from '@/types/order';

interface OrderFormProps {
  order?: Order;
  onSave: (order: Omit<Order, 'id'>) => void;
  onCancel: () => void;
}

export default function OrderForm({ order, onSave, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState({
    orderNumber: '',
    productName: '',
    productImage: '',
    status: OrderStatus.PENDING,
    orderDate: new Date().toISOString().split('T')[0],
    trackingNumber: '',
    estimatedDelivery: '',
    price: 0
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderNumber: order.orderNumber,
        productName: order.productName,
        productImage: order.productImage || '',
        status: order.status,
        orderDate: order.orderDate,
        trackingNumber: order.trackingNumber || '',
        estimatedDelivery: order.estimatedDelivery || '',
        price: order.price
      });
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      productImage: formData.productImage || undefined,
      trackingNumber: formData.trackingNumber || undefined,
      estimatedDelivery: formData.estimatedDelivery || undefined
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {order ? 'Edit Order' : 'Add New Order'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Order Number *
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
                placeholder="PM2024001"
              />
            </div>

            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
                placeholder="LABUBU Series 1 - Mystery Box"
              />
            </div>

            <div>
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL
              </label>
              <input
                type="url"
                id="productImage"
                name="productImage"
                value={formData.productImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
              >
                {Object.values(OrderStatus).map(status => (
                  <option key={status} value={status}>
                    {OrderStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700 mb-1">
                Order Date *
              </label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
                placeholder="12.99"
              />
            </div>

            <div>
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
                placeholder="TN123456789"
              />
            </div>

            <div>
              <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Delivery
              </label>
              <input
                type="date"
                id="estimatedDelivery"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-black"
              />
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                type="submit"
                className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors font-medium"
              >
                {order ? 'Update Order' : 'Add Order'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}