import { create } from 'zustand';
import { CategoryData } from '@/types/category-types';
import { useEffect } from 'react';

export type CategoryStore = {
    peopleCategoryData: CategoryData[];
    setPeopleCategoryData: (
        newCategoryData: CategoryData[] | undefined
    ) => Promise<void>;
};

const useStore = create<CategoryStore>((set) => ({
    peopleCategoryData: [],
    setPeopleCategoryData: async (data) => set({ peopleCategoryData: data }),
}));

export const useCategoryStore = () => {
    const store = useStore();

    useEffect(() => {
        const init = async () => {
            const storedData = localStorage.getItem('peopleCategoryData');
            if (storedData) {
                await store.setPeopleCategoryData(JSON.parse(storedData));
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (store.peopleCategoryData.length === 0) {
            return;
        }
        localStorage.setItem(
            'peopleCategoryData',
            JSON.stringify(store.peopleCategoryData)
        );
    }, [store.peopleCategoryData]);

    return store;
};
