import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CategoryData } from '@/types/category-types';
import {
    TableEditDeleteButtons,
    TableSaveCancelButtons,
} from '@/components/ui/table-buttons';
import { TableInput } from '@/components/ui/table-input';
import { TableContainer } from '@/components/ui/table-container';

const tableColumnNames = [
    'name',
    'height',
    'mass',
    'birth_year',
    'gender',
    'created',
    'url',
];

type CategoryTableProps = {
    data: CategoryData[];
    editingId: number | undefined;
    editedData: CategoryData | null;
    handleEdit: (item: CategoryData) => void;
    handleDelete: (item: CategoryData) => void;
    handleSave: () => void;
    handleChange: (key: keyof CategoryData, value: string) => void;
    handleCancel: () => void;
};

export function CategoryTable({
    data,
    editingId,
    editedData,
    handleEdit,
    handleDelete,
    handleSave,
    handleChange,
    handleCancel,
}: CategoryTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableColumnNames.map((name) => (
                            <TableHead key={name}>
                                {name[0].toUpperCase() + name.slice(1)}
                            </TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item.id}>
                            {tableColumnNames.map((key) => (
                                <TableCell
                                    key={key}
                                    className="min-w-[188px] h-[72px]"
                                >
                                    <TableInput
                                        editedData={editedData}
                                        item={item}
                                        editedDataKey={key}
                                        editingId={editingId}
                                        handleChange={handleChange}
                                    />
                                </TableCell>
                            ))}
                            <TableCell>
                                {editingId === item.id ? (
                                    <TableSaveCancelButtons
                                        handleSave={handleSave}
                                        handleCancel={handleCancel}
                                    />
                                ) : (
                                    <TableEditDeleteButtons
                                        handleDelete={() => handleDelete(item)}
                                        handleEdit={() => handleEdit(item)}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
