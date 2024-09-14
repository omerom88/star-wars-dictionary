import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
import { CategoryData, CategoryDataResponse } from '@/types/category-types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function enhanceDataWithId(
    data: CategoryDataResponse[] | undefined
): CategoryDataResponse[] {
    if (!data) {
        return [];
    }
    return data.map((value) => {
        return {
            ...value,
            results: (value?.results
                ? value.results?.map((result) => {
                      return {
                          ...result,
                          id: uuid(), //add unique id to each item
                      };
                  })
                : []) as CategoryData[],
        };
    });
}
