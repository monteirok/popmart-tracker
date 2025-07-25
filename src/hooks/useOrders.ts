import { useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { supabase, dbOrderToOrder, orderToDbOrder } from '@/lib/supabase';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const mappedOrders = data?.map(dbOrderToOrder) || [];
      setOrders(mappedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addOrder = async (order: Omit<Order, 'id'>) => {
    try {
      const dbOrder = orderToDbOrder(order);
      const { data, error } = await supabase
        .from('orders')
        .insert([dbOrder])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const newOrder = dbOrderToOrder(data);
      setOrders(prev => [newOrder, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add order');
      console.error('Error adding order:', err);
      throw err;
    }
  };

  const updateOrder = async (orderId: string, updatedOrder: Omit<Order, 'id'>) => {
    try {
      const dbOrder = orderToDbOrder(updatedOrder);
      const { data, error } = await supabase
        .from('orders')
        .update({ ...dbOrder, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const updated = dbOrderToOrder(data);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updated : order
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
      console.error('Error updating order:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      const updated = dbOrderToOrder(data);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updated : order
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      console.error('Error updating order status:', err);
      throw err;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) {
        throw error;
      }

      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
      console.error('Error deleting order:', err);
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    addOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    refetch: fetchOrders
  };
}