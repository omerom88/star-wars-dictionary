'use client';

import { CategoryTable } from '@/components/category/category-table';
import React from 'react';
import { FullScreen } from '@/components/ui/full-screen';
import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTable } from '@/hooks/use-table';

export function CategoryComponent() {
    const {
        handleAdd,
        tableData,
        editingId,
        editedData,
        handleEdit,
        handleDelete,
        handleSave,
        handleChange,
        handleCancel,
    } = useTable();

    return (
        <FullScreen>
            <Button
                onClick={handleAdd}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 mb-4"
            >
                <PlusCircleIcon className="h-4 w-4 text-blue-700" />
            </Button>
            <CategoryTable
                data={tableData}
                editingId={editingId}
                editedData={editedData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSave={handleSave}
                handleChange={handleChange}
                handleCancel={handleCancel}
            />
        </FullScreen>
    );
}
