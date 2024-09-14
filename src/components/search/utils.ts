import { CategoryData, CategoryDataResponse } from '@/types/category-types';

export function getDisplayResults(data: CategoryDataResponse[], index: number) {
    // return only the first 3 results
    const results = data[index].results;
    const displayResults = results.slice(0, 3);
    if (displayResults.length > 0) {
        displayResults.push({ name: 'View all' } as CategoryData);
    }
    return displayResults;
}

export function isViewAll(item?: string) {
    return typeof item === 'string' && item?.toLowerCase() === 'view all';
}

export function getPeopleSearchResults(
    selectedEntity: string,
    entities: string[],
    data?: CategoryDataResponse[]
) {
    // return only people data
    const peopleIndex = entities.findIndex((item) => item === 'people');
    if (
        selectedEntity === 'people' &&
        data &&
        peopleIndex > -1 &&
        peopleIndex < data.length
    ) {
        return data[peopleIndex]?.results;
    }
    return [];
}
