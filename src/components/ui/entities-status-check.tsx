import React from 'react';
import { EntityData } from '@/types/entitiy-types';
import { FullScreenText } from '@/components/ui/full-screen-text';
import { FullScreen } from '@/components/ui/full-screen';
import { Loader } from '@/components/ui/loader';

type EntitiesStatusCheckProps = {
    isLoading: boolean;
    error: Error | null;
    children: React.ReactNode;
    data: EntityData | null;
};

export function EntitiesStatusCheck({
    isLoading,
    error,
    data,
    children,
}: EntitiesStatusCheckProps) {
    if (isLoading)
        return (
            <FullScreen>
                <Loader />
            </FullScreen>
        );
    if (error)
        return <FullScreenText text={`An error occurred: ${error.message}`} />;
    if (!data) return <FullScreenText text={'Missing data'} />;

    return children;
}
