import { useCallback, useEffect, useState } from 'react';
import { CategoryData } from '@/types/category-types';
import { generateMockEntry } from '@/mocks/mock-people';
import { useCategoryStore } from '@/hooks/use-store';

const findItemInTableData = (
    tableData: CategoryData[],
    searchedItem: CategoryData
) => {
    return tableData.findIndex((item) => item.id === searchedItem.id);
};

export function useTable() {
    const { peopleCategoryData } = useCategoryStore();

    const [tableData, setTableData] =
        useState<CategoryData[]>(peopleCategoryData);
    const [editingId, setEditingId] = useState<number>();
    const [editedData, setEditedData] = useState<CategoryData | null>(null);

    useEffect(() => {
        if (peopleCategoryData?.length > 0) {
            setTableData([...peopleCategoryData]);
        }
    }, [peopleCategoryData]);

    const handleEdit = useCallback((item: CategoryData) => {
        if (item.id) setEditingId(item.id);
        setEditedData({ ...item });
    }, []);

    const handleDelete = useCallback(
        (item: CategoryData) => {
            setEditedData(null);
            setEditingId(undefined);
            _onDelete(item);
        },
        [tableData]
    );

    const handleSave = useCallback(() => {
        if (editedData) {
            _onSave(editedData);
            setEditingId(undefined);
            setEditedData(null);
        }
    }, [editedData]);

    const handleCancel = useCallback(() => {
        setEditingId(undefined);
        setEditedData(null);
    }, []);

    const handleChange = useCallback(
        (key: keyof CategoryData, value: string) => {
            if (editedData) {
                setEditedData({ ...editedData, [key]: value });
            }
        },
        [editedData]
    );

    const handleAdd = useCallback(() => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData.push(generateMockEntry());
            return newData;
        });
    }, []);

    const _onSave = (editedData: CategoryData) => {
        const indexToUpdate = findItemInTableData(tableData, editedData);

        setTableData((prevData) => {
            const newData = [...prevData];
            newData[indexToUpdate] = editedData;
            return newData;
        });
    };

    const _onDelete = (deletedData: CategoryData) => {
        const indexToDelete = findItemInTableData(tableData, deletedData);

        setTableData((prevData) => {
            const newData = [...prevData];
            newData.splice(indexToDelete, 1);
            return newData;
        });
    };

    return {
        tableData,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSave,
        handleCancel,
        handleChange,
        editingId,
        editedData,
    };
}
