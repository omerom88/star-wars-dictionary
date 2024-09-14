import { renderHook, waitFor } from '@testing-library/react';
import { api } from '@/services/api';
import { useQueries } from '@tanstack/react-query';
import { useSearch } from '@/hooks/use-search';

jest.mock('@/services/api', () => ({
    api: {
        useGetByEntities: jest.fn(),
    },
}));

jest.mock('@tanstack/react-query', () => ({
    useQueries: jest.fn(),
}));

describe('useSearch', () => {
    const mockUseQueries = useQueries as jest.MockedFunction<typeof useQueries>;
    const mockUseGetByEntities = api.useGetByEntities as jest.MockedFunction<
        typeof api.useGetByEntities
    >;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return empty data when value is empty', () => {
        mockUseQueries.mockReturnValue([] as any);

        const { result } = renderHook(() => useSearch('', ['people', 'posts']));

        expect(result.current.data).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.errors).toBeNull();
    });

    it('should return loading state', () => {
        mockUseGetByEntities.mockReturnValue([
            { queryKey: ['people'], queryFn: jest.fn() },
        ]);
        mockUseQueries.mockReturnValue([
            { isLoading: true, data: undefined, error: null },
        ] as any);

        const { result } = renderHook(() => useSearch('john', ['people']));

        expect(result.current.isLoading).toBe(true);
        expect(result.current.data).toEqual([]);
        expect(result.current.errors).toBeNull();
    });

    it('should return data when loaded successfully', async () => {
        const mockData = { results: [{ name: 'John Doe' }] };
        mockUseGetByEntities.mockReturnValue([
            { queryKey: ['people'], queryFn: jest.fn() },
        ]);
        mockUseQueries.mockReturnValue([
            { isLoading: false, data: mockData, error: null },
        ] as any);

        const { result } = renderHook(() => useSearch('john', ['people']));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data[0].results[0].name).toEqual('John Doe');
            expect(result.current.errors).toBeNull();
        });
    });

    it('should return errors when query fails', async () => {
        const mockError = new Error('API error');
        mockUseGetByEntities.mockReturnValue([
            { queryKey: ['people'], queryFn: jest.fn() },
        ]);
        mockUseQueries.mockReturnValue([
            { isLoading: false, data: { results: [] }, error: mockError },
        ] as any);

        const { result } = renderHook(() => useSearch('john', ['people']));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data[0].results).toEqual([]);
            expect(result.current.errors).toEqual([mockError]);
        });
    });

    it('should handle multiple entities', async () => {
        const mockUserData = { results: [{ name: 'John Doe' }] };
        const mockPostData = { results: [{ title: "John's Post" }] };
        mockUseGetByEntities.mockReturnValue([
            { queryKey: ['people'], queryFn: jest.fn() },
            { queryKey: ['posts'], queryFn: jest.fn() },
        ]);
        mockUseQueries.mockReturnValue([
            { isLoading: false, data: mockUserData, error: null },
            { isLoading: false, data: mockPostData, error: null },
        ] as any);

        const { result } = renderHook(() =>
            useSearch('john', ['people', 'posts'])
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.data[0].results[0].name).toEqual('John Doe');
            expect(result.current.data[1].results[0].title).toEqual(
                "John's Post"
            );
            // expect(result.current.data).toEqual([mockUserData, mockPostData]);
            expect(result.current.errors).toBeNull();
        });
    });
});
