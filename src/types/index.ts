// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status?: 'active' | 'inactive';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive';
}

// Authentication types
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface UsersResponse extends PaginatedResponse<User> {}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userGrowthData: ChartDataPoint[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

// Query parameters
export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  sortBy?: 'name' | 'email' | 'created_at';
  sortOrder?: 'asc' | 'desc';
  role?: 'admin' | 'user' | 'all';
}

// Form types
// Removed unused LoginFormData
export interface UserFormData {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

export interface ProfileFormData {
  name: string;
  email: string;
}

// Application state types
// Removed unused AuthState interface

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Order Management Types
export interface Order {
  id: string;
  account: string;
  operation: 'Buy' | 'Sell';
  symbol: string;
  description: string;
  qty: number;
  filledQty: number;
  price: number;
  status: 'Waiting' | 'Filled' | 'Cancelled' | 'Rejected' | 'Accepted';
  date: string;
  expiration: string;
  noRef: string;
  extRef: string;
  netAmount: string;
  referenceNumber: string;
  exchangeRate: string;
  telephone: string;
  qisLimit: string;
  userId: string;
  warnings: string[];
}

export interface SearchFilters {
  startDate: string;
  endDate: string;
  period: 'Transmission';
  status: Order['status'] | 'all';
}

export interface OrderSearchResponse {
  orders: Order[];
  total: number;
  page: number;
}

export interface OrderSearchRequest {
  startDate: string;
  endDate: string;
  period?: string;
  status?: string;
  page?: number;
  limit?: number;
  // Enable server-side sorting across the full dataset
  sortBy?: keyof Order;
  sortOrder?: 'asc' | 'desc';
}

// UI State Types
export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  selectedOrder: Order | null;
  total: number;
  page: number;
}

// Form Types
export interface DateRangeForm {
  startDate: string;
  endDate: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  quantity: number;
  description: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'quantity';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsResponse extends PaginatedResponse<Product> {}

export interface CreateProductRequest {
  name: string;
  quantity: number;
  description: string;
}

export interface UpdateProductRequest {
  name?: string;
  quantity?: number;
  description?: string;
}
