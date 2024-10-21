import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
  productId: string;
  name: string;
  stockQuantity: number;
  price: number;
  rating?: number;
}

interface NewProduct {
  name: string;
  stockQuantity: number;
  price: number;
  rating?: number;
}

interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

interface PurchaseSummary {
  purshaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics', 'Products', 'Expenses', 'Users'],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: '/products',
        params: search ? { search } : {},
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => '/expenses',
      providesTags: ['Expenses'],
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetExpensesByCategoryQuery,
  useGetUsersQuery,
} = api;
