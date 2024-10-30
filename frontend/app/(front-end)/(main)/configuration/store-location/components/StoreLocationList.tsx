"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { storeLocationData } from '../../data/data';
import { storeLocationSchema, storeLocationType } from '../../type';
import ListViewData from './template/ListViewData';
import DialogDelete from '@/components/ui-custom/DialogDelete';

interface FieldConfig {
    key: keyof storeLocationType;
    display: string;
    type: "string" | "boolean";
}

const StoreLocationList = () => {
    const [storeLocations, setStoreLocations] = useState<storeLocationType[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchStoreLocations = async () => {
            const data = storeLocationData.map((data) => {
                return storeLocationSchema.parse(data);
            })
            setStoreLocations(data);
        }
        fetchStoreLocations();
    }, [])

    const handleAdd = async (item: storeLocationType) => {
        setStoreLocations((prev) => [...prev, item]);
    };

    const handleEdit = async (updatedItem: storeLocationType) => {
        setStoreLocations((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const handleDelete = (item: storeLocationType) => {
        setIdToDelete(item.id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        setStoreLocations((prev) => prev.filter((loc) => loc.id !== idToDelete));
        setIdToDelete(null);
    };

    const fieldConfigs: FieldConfig[] = useMemo(() => [
        { key: 'storeCode', display: 'Store Code', type: 'string' },
        { key: 'storeName', display: 'Store Name', type: 'string' },
        { key: 'departmentName', display: 'Department', type: 'string' },
        { key: 'type', display: 'Type', type: 'string' },
        { key: 'status', display: 'Status', type: 'string' },
        { key: 'isActive', display: 'Active Status', type: 'boolean' }
    ], []);

    return (
        <>
            <ListViewData
                data={storeLocations}
                title="Store Locations"
                titleField="storeName"
                fields={fieldConfigs}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <DialogDelete
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onConfirm={confirmDelete}
                idDelete={idToDelete}
            />
        </>
    )
}

export default StoreLocationList