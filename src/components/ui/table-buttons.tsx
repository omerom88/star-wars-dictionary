import { Button } from '@/components/ui/button';
import { Check, Delete, Edit, X } from 'lucide-react';
import React from 'react';

type TableSaveCancelButtonsProps = {
    handleSave: () => void;
    handleCancel: () => void;
};

export function TableSaveCancelButtons({
    handleSave,
    handleCancel,
}: TableSaveCancelButtonsProps) {
    return (
        <>
            <div className="flex space-x-2">
                <Button
                    onClick={handleSave}
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0"
                >
                    <Check className="h-4 w-4 text-green-800" />
                </Button>
                <Button
                    onClick={handleCancel}
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0"
                >
                    <X className="h-4 w-4 text-red-800" />
                </Button>
            </div>
        </>
    );
}

type TableEditDeleteButtonsProps = {
    handleEdit: () => void;
    handleDelete: () => void;
};

export function TableEditDeleteButtons({
    handleEdit,
    handleDelete,
}: TableEditDeleteButtonsProps) {
    return (
        <div className="flex space-x-2">
            <Button
                onClick={handleEdit}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0"
            >
                <Edit className="h-4 w-4" />
            </Button>
            <Button
                onClick={handleDelete}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0"
            >
                <Delete className="h-4 w-4" />
            </Button>
        </div>
    );
}
