import React from 'react';

type FullScreenText = {
    children: React.ReactNode;
};

export const FullScreen = ({ children }: FullScreenText) => {
    return (
        <div className="p-4 flex flex-col w-full min-h-screen justify-center items-center">
            {children}
        </div>
    );
};
