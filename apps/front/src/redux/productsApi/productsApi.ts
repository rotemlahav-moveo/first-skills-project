import type {
  DepartmentDetailsDto,
  ProductDto,
  ProductsListQueryArgs,
} from '@shared/products-contracts';

import { baseApi } from '../baseApi';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentDetailsDto[], void>({
      query: () => ({
        url: '/products/departments',
        method: 'GET',
      }),
    }),
    getProducts: builder.query<ProductDto[], ProductsListQueryArgs | void>({
      query: (args) => ({
        url: '/products',
        method: 'GET',
        params: args ?? undefined,
      }),
    }),
    getProductById: builder.query<ProductDto, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetProductsQuery, useGetProductByIdQuery } = productsApi;
