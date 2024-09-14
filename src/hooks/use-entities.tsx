import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export function useEntities() {
    const { data, isLoading, error } = useQuery(api.useGetEntities());

    return { data, isLoading, error };
}
