import { CategoryData, CategoryDataResponse } from '@/types/category-types';
import {
    getDisplayResults,
    getPeopleSearchResults,
    isViewAll,
} from '@/components/search/utils';
import { getMockResults } from '@/mocks/mock-resutls';

describe('getDisplayResults', () => {
    const mockData = getMockResults();

    it('should return first 3 items plus "View all" when there are more than 3 items', () => {
        const result = getDisplayResults(mockData as CategoryDataResponse[], 0);
        expect(result).toHaveLength(4);
        expect(result[3]).toEqual({ name: 'View all' } as CategoryData);
        expect(result.map((item) => item.name)).toEqual([
            'Luke Skywalker',
            'C-3PO',
            'R2-D2',
            'View all',
        ]);
    });

    it('should return all items plus "View all" when there are 3 or fewer items', () => {
        const result = getDisplayResults(mockData as CategoryDataResponse[], 1);
        expect(result).toHaveLength(3);
        expect(result[2]).toEqual({ name: 'View all' } as CategoryData);
        expect(result.map((item) => item.name)).toEqual([
            'Owen Lars',
            'Beru Whitesun lars',
            'View all',
        ]);
    });

    it('should return an empty array when there are no items', () => {
        const result = getDisplayResults(mockData as CategoryDataResponse[], 2);
        expect(result).toHaveLength(0);
    });

    it('should handle undefined or null data gracefully', () => {
        expect(() =>
            getDisplayResults(undefined as unknown as CategoryDataResponse[], 0)
        ).toThrow();
        expect(() =>
            getDisplayResults(null as unknown as CategoryDataResponse[], 0)
        ).toThrow();
    });

    it('should handle out of bounds index gracefully', () => {
        expect(() =>
            getDisplayResults(mockData as CategoryDataResponse[], 3)
        ).toThrow();
        expect(() =>
            getDisplayResults(mockData as CategoryDataResponse[], -1)
        ).toThrow();
    });
});

describe('isViewAll', () => {
    it('should return true for "view all" (case insensitive)', () => {
        expect(isViewAll('view all')).toBe(true);
        expect(isViewAll('View All')).toBe(true);
        expect(isViewAll('VIEW ALL')).toBe(true);
    });

    it('should return false for other strings', () => {
        expect(isViewAll('view')).toBe(false);
        expect(isViewAll('all')).toBe(false);
        expect(isViewAll('Luke Skywalker')).toBe(false);
    });

    it('should handle undefined or null gracefully', () => {
        expect(isViewAll(undefined)).toBe(false);
        expect(isViewAll(null as any)).toBe(false);
    });

    it('should handle non-string inputs gracefully', () => {
        expect(isViewAll(123 as any)).toBe(false);
        expect(isViewAll({} as any)).toBe(false);
        expect(isViewAll([] as any)).toBe(false);
    });
});

describe('getPeopleSearchResults', () => {
    const mockEntities = ['films', 'people', 'planets'];
    const mockData = [
        {
            results: [
                { title: 'A New Hope', url: 'https://swapi.dev/api/films/1/' },
            ],
        },
        {
            results: [
                {
                    name: 'Luke Skywalker',
                    height: '172',
                    mass: '77',
                    birth_year: '19BBY',
                    gender: 'male',
                    url: 'https://swapi.dev/api/people/1/',
                },
                {
                    name: 'C-3PO',
                    height: '167',
                    mass: '75',
                    birth_year: '112BBY',
                    gender: 'n/a',
                    url: 'https://swapi.dev/api/people/2/',
                },
            ],
        },
        {
            results: [
                { name: 'Tatooine', url: 'https://swapi.dev/api/planets/1/' },
            ],
        },
    ];

    it('should return people results when selectedEntity is "people"', () => {
        const result = getPeopleSearchResults(
            'people',
            mockEntities,
            mockData as CategoryDataResponse[]
        );
        expect(result).toEqual([
            {
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                birth_year: '19BBY',
                gender: 'male',
                url: 'https://swapi.dev/api/people/1/',
            },
            {
                name: 'C-3PO',
                height: '167',
                mass: '75',
                birth_year: '112BBY',
                gender: 'n/a',
                url: 'https://swapi.dev/api/people/2/',
            },
        ]);
    });

    it('should return an empty array when selectedEntity is not "people"', () => {
        const result = getPeopleSearchResults(
            'films',
            mockEntities,
            mockData as CategoryDataResponse[]
        );
        expect(result).toEqual([]);
    });

    it('should return an empty array when "people" is not in entities', () => {
        const entitiesWithoutPeople = ['films', 'planets'];
        const result = getPeopleSearchResults(
            'people',
            entitiesWithoutPeople,
            mockData as CategoryDataResponse[]
        );
        expect(result).toEqual([]);
    });

    it('should handle case when data for people index is undefined', () => {
        const incompleteData = [
            {
                results: [
                    {
                        title: 'A New Hope',
                        url: 'https://swapi.dev/api/films/1/',
                    },
                ],
            },
        ];
        const result = getPeopleSearchResults(
            'people',
            mockEntities,
            incompleteData as CategoryDataResponse[]
        );
        expect(result).toEqual([]);
    });

    it('should handle empty data array', () => {
        const result = getPeopleSearchResults('people', mockEntities, []);
        expect(result).toEqual([]);
    });

    it('should handle undefined data', () => {
        const result = getPeopleSearchResults(
            'people',
            mockEntities,
            undefined as unknown as CategoryDataResponse[]
        );
        expect(result).toEqual([]);
    });

    it('should handle case sensitivity in selectedEntity and entities', () => {
        const result = getPeopleSearchResults(
            'People',
            ['films', 'People', 'planets'],
            mockData as CategoryDataResponse[]
        );
        expect(result).toEqual([]);
    });
});
