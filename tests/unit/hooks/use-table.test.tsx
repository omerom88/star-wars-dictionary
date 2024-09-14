import { renderHook, act } from '@testing-library/react';
import { useCategoryStore } from '@/hooks/use-store';
import { generateMockEntry } from '@/app/mocks/mock-people';
import { CategoryData } from '@/types/category-types';
import { useTable } from '@/hooks/use-table';

jest.mock('@/hooks/use-store', () => ({
    useCategoryStore: jest.fn(),
}));

jest.mock('@/app/mocks/mock-people', () => ({
    generateMockEntry: jest.fn(),
}));

describe('useTable', () => {
    const mockPeopleCategoryData: CategoryData[] = [
        {
            id: 1,
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            gender: 'male',
            created: '2014-12-09T13:50:51.644000Z',
            url: 'https://swapi.dev/api/people/1/',
        },
        {
            id: 2,
            name: 'C-3PO',
            height: '167',
            mass: '75',
            birth_year: '112BBY',
            gender: 'n/a',
            created: '2014-12-10T15:10:51.357000Z',
            url: 'https://swapi.dev/api/people/2/',
        },
    ];

    beforeEach(() => {
        (useCategoryStore as jest.Mock).mockReturnValue({
            peopleCategoryData: mockPeopleCategoryData,
        });
        (generateMockEntry as jest.Mock).mockReturnValue({
            id: 3,
            name: 'Mock Person',
            height: '180',
            mass: '80',
            birth_year: '0BBY',
            gender: 'unknown',
            created: '2023-09-14T00:00:00.000000Z',
            url: 'https://swapi.dev/api/people/3/',
        });
    });

    it('should initialize with peopleCategoryData', () => {
        const { result } = renderHook(() => useTable());

        expect(result.current.tableData).toEqual(mockPeopleCategoryData);
    });

    it('should update tableData when peopleCategoryData changes', () => {
        const { result, rerender } = renderHook(() => useTable());
        const newPeopleCategoryData = [
            ...mockPeopleCategoryData,
            {
                id: 3,
                name: 'Leia Organa',
                height: '150',
                mass: '49',
                birth_year: '19BBY',
                gender: 'female',
                created: '2014-12-10T15:20:09.791000Z',
                url: 'https://swapi.dev/api/people/5/',
            },
        ];
        (useCategoryStore as jest.Mock).mockReturnValue({
            peopleCategoryData: newPeopleCategoryData,
        });

        rerender();

        expect(result.current.tableData).toEqual(newPeopleCategoryData);
    });

    it('should handle edit action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleEdit(mockPeopleCategoryData[0]);
        });

        expect(result.current.editingId).toBe(1);
        expect(result.current.editedData).toEqual(mockPeopleCategoryData[0]);
    });

    it('should handle delete action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleDelete(mockPeopleCategoryData[0]);
        });

        expect(result.current.tableData).toHaveLength(1);
        expect(result.current.tableData[0]).toEqual(mockPeopleCategoryData[1]);
    });

    it('should handle save action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleEdit(mockPeopleCategoryData[0]);
        });
        act(() => {
            result.current.handleChange('name', 'Luke Skywalker Jr.');
        });
        act(() => {
            result.current.handleSave();
        });

        expect(result.current.tableData[0].name).toBe('Luke Skywalker Jr.');
        expect(result.current.editingId).toBeUndefined();
        expect(result.current.editedData).toBeNull();
    });

    it('should handle cancel action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleEdit(mockPeopleCategoryData[0]);
        });
        act(() => {
            result.current.handleCancel();
        });

        expect(result.current.editingId).toBeUndefined();
        expect(result.current.editedData).toBeNull();
    });

    it('should handle change action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleEdit(mockPeopleCategoryData[0]);
        });
        act(() => {
            result.current.handleChange('name', 'Luke Skywalker Jr.');
        });

        expect(result.current.editedData?.name).toBe('Luke Skywalker Jr.');
    });

    it('should handle add action', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.tableData).toHaveLength(3);
        expect(result.current.tableData[2]).toEqual(generateMockEntry());
    });

    it('should not update when trying to save with null editedData', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleSave();
        });

        expect(result.current.tableData).toEqual(mockPeopleCategoryData);
    });

    it('should not update editedData when handleChange is called with null editedData', () => {
        const { result } = renderHook(() => useTable());

        act(() => {
            result.current.handleChange('name', 'New Name');
        });

        expect(result.current.editedData).toBeNull();
    });
});
