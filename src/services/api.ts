import { QueryClient, QueryFunction } from '@tanstack/react-query';

const BASE_URL = 'https://swapi.dev/api/';

export const queryClient = new QueryClient();

const fetchData: QueryFunction = async ({ queryKey }) => {
    const [endpoint] = queryKey;
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const api = {
    useGetEntities: () => ({
        queryKey: [''],
        queryFn: fetchData,
    }),
    useGetByEntities: (endpoints: string[]) =>
        endpoints.map((endpoint) => ({
            queryKey: [endpoint] as const,
            queryFn: fetchData,
        })),
};
