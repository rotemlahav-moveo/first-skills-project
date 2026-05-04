import type {
  DepartmentDetailsDto,
  ProductDto,
  ProductsListQueryArgs,
} from '@shared/products-contracts';

import { baseApi } from '../baseApi';
import { buildProductsListQueryString } from './buildProductsListQueryString';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentDetailsDto[], void>({
      query: () => ({
        url: '/products/departments',
        method: 'GET',
      }),
    }),
    getProducts: builder.query<ProductDto[], ProductsListQueryArgs | void>({
      query: (args) => {
        const qs = buildProductsListQueryString(args ?? undefined);
        return {
          url: qs ? `/products?${qs}` : '/products',
          method: 'GET',
        };
      },
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
