'use client';

import { Kalam } from 'next/font/google';
import { queryClient } from '@/services/api';
import { QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import { FullScreenText } from '@/components/ui/full-screen-text';
import React from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const kalam = Kalam({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={kalam.className}>
                <ErrorBoundary
                    errorComponent={({ error }) => (
                        <FullScreenText
                            text={`React encountered an error: ${error.message}.`}
                        />
                    )}
                >
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </ErrorBoundary>
            </body>
        </html>
    );
}
