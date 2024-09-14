import React from 'react';

type TableContainerProps = {
    children: React.ReactNode;
};

export function TableContainer({ children }: TableContainerProps) {
    return (
        <div
            className="flex w-full rounded-lg overflow-hidden border border-gray-700"
            style={{ boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.3)' }}
        >
            {children}
        </div>
    );
}
