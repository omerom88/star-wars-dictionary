import { api } from '@/services/api';
import { QueriesResults, useQueries } from '@tanstack/react-query';
import { enhanceDataWithId } from '@/lib/utils';
import { CategoryDataResponse } from '@/types/category-types';

export function useSearch(value: string, entities: string[]) {
    const endpoints = value
        ? entities.map((entity) => `${entity}?search=${value}`)
        : [];
    //@ts-ignore
    const response = useQueries({
        queries: api.useGetByEntities(endpoints),
    }) as QueriesResults<Array<{ isLoading: boolean }>>;

    const isLoading = response.some((result) => result.isLoading);
    const errors = response
        .map((result) => result.error)
        .filter(Boolean) as Error[];

    return {
        data: enhanceDataWithId(
            isLoading
                ? []
                : (response.map(
                      (result) => result.data
                  ) as CategoryDataResponse[])
        ),
        isLoading,
        errors: errors.length > 0 ? errors : null,
    };
}
