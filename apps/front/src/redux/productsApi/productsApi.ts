import type { ProductDepartment, ProductDto } from '@shared/products-contracts';

import { baseApi } from '../baseApi';

// if there is a department, filter the products by the department ( GET /products?department=men )
export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDto[], { department?: ProductDepartment } | void>({
      query: (args) => ({
        url: '/products',
        method: 'GET',
        params: args?.department ? { department: args.department } : undefined,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
