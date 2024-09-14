import { CommandEmpty } from '@/components/ui/command';
import React from 'react';
import { Loader } from '@/components/ui/loader';

type CommandStatusCheckProps = {
    isLoading: boolean;
    error: string | null;
    children: React.ReactNode;
};

export function CommandStatusCheck({
    isLoading,
    error,
    children,
}: CommandStatusCheckProps) {
    return (
        <>
            {isLoading && (
                <CommandEmpty className="flex flex-col w-full min-h-[500px] justify-center items-center">
                    <Loader />
                </CommandEmpty>
            )}
            {error && (
                <CommandEmpty>
                    An error occurred, please reload the page.
                </CommandEmpty>
            )}
            {children}
        </>
    );
}
