import type { ReplaceCartRequestDto, SavedCartItemDto } from '@shared/cart-contracts';

import { baseApi } from '../baseApi';

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<SavedCartItemDto[], void>({
      query: () => ({
        url: '/cart',
        method: 'GET',
      }),
    }),
    replaceCart: builder.mutation<void, ReplaceCartRequestDto>({
      query: (body) => ({
        url: '/cart',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useLazyGetCartQuery, useReplaceCartMutation } = cartApi;
