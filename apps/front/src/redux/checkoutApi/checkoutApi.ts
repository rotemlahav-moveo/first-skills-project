import type { CheckoutRequestDto, CheckoutResponseDto } from '@shared/checkout-contracts';

import { baseApi } from '../baseApi';

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponseDto, CheckoutRequestDto>({
      query: (body) => ({
        url: '/cart/checkout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCheckoutMutation } = checkoutApi;
