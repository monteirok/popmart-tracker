import { Order, OrderStatus, OrderStatusLabels } from '@/types/order';

interface OrderCardProps {
  order: Order;
  onEdit?: (order: Order) => void;
  onDelete?: (orderId: string) => void;
}

export default function OrderCard({ order, onEdit, onDelete }: OrderCardProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case OrderStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case OrderStatus.PROCESSING:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case OrderStatus.SHIPPING:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case OrderStatus.OUT_FOR_DELIVERY:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800 border-green-200';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{order.productName}</h3>
          <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
          {OrderStatusLabels[order.status]}
        </span>
      </div>
      
      {order.productImage && (
        <div className="mb-4">
          <img 
            src={order.productImage} 
            alt={order.productName}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Order Date:</span>
          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-semibold">CAD {order.price.toFixed(2)}</span>
        </div>
        
        {order.trackingNumber && (
          <div className="flex justify-between">
            <span>Tracking:</span>
            <a
              href={`https://www.aftership.com/track/${order.trackingNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
            >
              {order.trackingNumber}
            </a>
          </div>
        )}
        
        {order.estimatedDelivery && (
          <div className="flex justify-between">
            <span>Est. Delivery:</span>
            <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={() => onEdit(order)}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(order.id)}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}