import React from 'react';

export const StatsBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col border-2 border-white br-4 p-4 rounded-2xl w-40 text-center justify-center items-center">
            {children}
        </div>
    );
};
