'use client';

import React from 'react';
import { useEntities } from '@/hooks/use-entities';
import { AutocompleteInput } from '@/components/search/auto-complete';
import { Card } from '@/components/ui/card';
import { EntitiesStatusCheck } from '@/components/ui/entities-status-check';
import { EntityData } from '@/types/entitiy-types';
import { FullScreen } from '@/components/ui/full-screen';

export function SearchComponent() {
    const { data, isLoading, error } = useEntities();

    return (
        <EntitiesStatusCheck
            error={error}
            isLoading={isLoading}
            data={data as EntityData | null}
        >
            <div className="flex justify-center items-center min-h-screen">
                <Card className="min-w-[600px] h-[600px]">
                    {!!data && (
                        <AutocompleteInput entities={Object.keys(data as {})} />
                    )}
                </Card>
            </div>
        </EntitiesStatusCheck>
    );
}
