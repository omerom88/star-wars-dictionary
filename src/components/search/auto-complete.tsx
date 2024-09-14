import React, { Fragment, useCallback, useState } from 'react';
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useSearch } from '@/hooks/use-search';
import { CommandStatusCheck } from '@/components/ui/command-status-check';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/hooks/use-store';
import {
    getDisplayResults,
    getPeopleSearchResults,
    isViewAll,
} from '@/components/search/utils';
import { CategoryDataResponse } from '@/types/category-types';

type AutocompleteInputProps = {
    entities: string[];
};

export function AutocompleteInput({ entities }: AutocompleteInputProps) {
    const [value, setValue] = useState('');
    const { setPeopleCategoryData } = useCategoryStore();
    const { isLoading, error, data } = useSearch(value, entities);
    const router = useRouter();

    const handleSelect = useCallback(
        async (selectedValue: string) => {
            const [entity, selectedItem] = selectedValue.split(':');
            if (isViewAll(selectedItem)) {
                await setPeopleCategoryData(
                    getPeopleSearchResults(entity, entities, data)
                );
                router.push(`/category/${entity}`);
            }
        },
        [data, entities]
    );

    return (
        <Command shouldFilter={false}>
            <CommandInput
                placeholder="Search..."
                onValueChange={(value) => setValue(value)}
            />
            <CommandList>
                <CommandStatusCheck isLoading={isLoading} error={error}>
                    {entities.map((entity, index) => {
                        if (!data[index]?.results) return null;
                        const displayResults = getDisplayResults(data, index);
                        if (displayResults.length === 0) return null;

                        return (
                            <Fragment key={entity}>
                                <CommandGroup heading={entity}>
                                    {displayResults.map((item) => {
                                        const name = item.name || item.title;
                                        return (
                                            <CommandItem
                                                key={entity + ':' + name}
                                                value={entity + ':' + name}
                                                onSelect={handleSelect}
                                                className={
                                                    isViewAll(name)
                                                        ? 'cursor-pointer text-blue-800'
                                                        : 'cursor-default'
                                                }
                                            >
                                                {name}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                                <CommandSeparator />
                            </Fragment>
                        );
                    })}
                </CommandStatusCheck>
            </CommandList>
        </Command>
    );
}
