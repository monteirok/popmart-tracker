import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          order_number: string
          product_name: string
          product_image: string | null
          status: string
          order_date: string
          tracking_number: string | null
          estimated_delivery: string | null
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          product_name: string
          product_image?: string | null
          status: string
          order_date: string
          tracking_number?: string | null
          estimated_delivery?: string | null
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          product_name?: string
          product_image?: string | null
          status?: string
          order_date?: string
          tracking_number?: string | null
          estimated_delivery?: string | null
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper functions to convert between database format and app format
export const dbOrderToOrder = (dbOrder: Database['public']['Tables']['orders']['Row']): Order => ({
  id: dbOrder.id,
  orderNumber: dbOrder.order_number,
  productName: dbOrder.product_name,
  productImage: dbOrder.product_image || undefined,
  status: dbOrder.status as Order['status'],
  orderDate: dbOrder.order_date,
  trackingNumber: dbOrder.tracking_number || undefined,
  estimatedDelivery: dbOrder.estimated_delivery || undefined,
  price: dbOrder.price,
})

export const orderToDbOrder = (order: Omit<Order, 'id'>): Database['public']['Tables']['orders']['Insert'] => ({
  order_number: order.orderNumber,
  product_name: order.productName,
  product_image: order.productImage || null,
  status: order.status,
  order_date: order.orderDate,
  tracking_number: order.trackingNumber || null,
  estimated_delivery: order.estimatedDelivery || null,
  price: order.price,
})