import { Input } from '@/components/ui/input';
import { CategoryData } from '@/types/category-types';
import React from 'react';

type TableInputProps = {
    item: CategoryData;
    editedDataKey: string;
    editingId: number | undefined;
    editedData: CategoryData | null;
    handleChange: (key: keyof CategoryData, value: string) => void;
};

export function TableInput({
    item,
    editedDataKey,
    editingId,
    editedData,
    handleChange,
}: TableInputProps) {
    return editingId === item.id ? (
        <Input
            type="text"
            value={editedData?.[editedDataKey as keyof CategoryData] || ''}
            onChange={(e) =>
                handleChange(
                    editedDataKey as keyof CategoryData,
                    e.target.value
                )
            }
            className="max-w-m"
        />
    ) : (
        item[editedDataKey as keyof CategoryData]
    );
}
