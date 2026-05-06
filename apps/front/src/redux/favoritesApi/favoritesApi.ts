import type { FavoriteItemDto, ReplaceFavoritesRequestDto } from '@shared/favorites-contracts';

import { baseApi } from '../baseApi';

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<FavoriteItemDto[], void>({
      query: () => ({
        url: '/favorites',
        method: 'GET',
      }),
      providesTags: [{ type: 'Favorites', id: 'LIST' }],
    }),
    replaceFavorites: builder.mutation<void, ReplaceFavoritesRequestDto>({
      query: (body) => ({
        url: '/favorites',
        method: 'PUT',
        body,
      }),
      // Omit invalidatesTags: PUT would trigger an automatic GET refetch on the lazy
      // getFavorites subscription. Context owns UI state and drives GET when needed.
    }),
  }),
});

export const { useGetFavoritesQuery, useLazyGetFavoritesQuery, useReplaceFavoritesMutation } = favoritesApi;
