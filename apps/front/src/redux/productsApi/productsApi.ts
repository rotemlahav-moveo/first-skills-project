import type {
  DepartmentDetailsDto,
  ProductDto,
} from '@shared/products-contracts';

import { baseApi } from '../baseApi';

// if there is a department, filter the products by the department ( GET /products?department=men )
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentDetailsDto[], void>({
      query: () => ({
        url: '/products/departments',
        method: 'GET',
      }),
    }),
    getProducts: builder.query<ProductDto[], { department?: string } | void>({
      query: (args) => ({
        url: '/products',
        method: 'GET',
        params: args?.department ? { department: args.department } : undefined,
      }),
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetProductsQuery } = productsApi;
