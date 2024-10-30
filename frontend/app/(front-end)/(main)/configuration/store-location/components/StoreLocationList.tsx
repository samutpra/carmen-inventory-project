"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { storeLocationData } from '../../data/data';
import { storeLocationSchema, storeLocationType } from '../../type';
import ListViewData from './template/ListViewData';

interface FieldConfig {
    key: keyof storeLocationType;
    display: string;
    type: string;
}

const StoreLocationList = () => {
    const [storeLocations, setStoreLocations] = useState<storeLocationType[]>([]);

    useEffect(() => {
        const fetchStoreLocations = async () => {
            const data = storeLocationData.map((data) => {
                return storeLocationSchema.parse(data);
            })
            setStoreLocations(data);
        }
        fetchStoreLocations();
    }, [])

    const handleAdd = (item: storeLocationType) => {
        setStoreLocations((prev) => [...prev, item]);
    };

    const handleEdit = (item: storeLocationType) => {
        alert(`Edit ${item.storeName}`);
    };

    const handleDelete = (item: storeLocationType) => {
        if (confirm(`Delete ${item.storeName}?`)) {
            setStoreLocations((prev) => prev.filter((loc) => loc.id !== item.id));
        }
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
        <ListViewData
            data={storeLocations}
            title="Store Locations"
            titleField="storeName"
            fields={fieldConfigs}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default StoreLocationList