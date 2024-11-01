"use client";
import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import STLComponent from '../../components/template/STLComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { categoryData, itemCategory, itemGroup, subCategoryData } from '../../data/store';

const StoreLocationDetailPage = () => {
    const params = useParams();
    const id = params.id as string;

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("all");
    const [selectedItemGroupId, setSelectedItemGroupId] = useState<string>("all");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredData = useMemo(() => {
        const subCategories = selectedCategoryId !== "all"
            ? subCategoryData.filter(sub => sub.categoryId === selectedCategoryId)
            : subCategoryData;

        const relevantItemGroups = selectedSubCategoryId !== "all"
            ? itemGroup.filter(item => item.subCategoryId === selectedSubCategoryId)
            : itemGroup.filter(item =>
                subCategories.some(sub => sub.id === item.subCategoryId)
            );

        const items = selectedItemGroupId !== "all"
            ? itemCategory.filter(item => item.itemGroupId === selectedItemGroupId)
            : itemCategory.filter(item =>
                relevantItemGroups.some(group => group.id === item.itemGroupId)
            );

        return {
            category: categoryData.find(cat => cat.id === selectedCategoryId),
            subCategories,
            itemGroups: relevantItemGroups,
            items
        };
    }, [selectedCategoryId, selectedSubCategoryId, selectedItemGroupId]);

    const handleCategoryChange = (value: string) => {
        setSelectedCategoryId(value);
        setSelectedSubCategoryId("all");
        setSelectedItemGroupId("all");
        setSelectedItems([]);
    };

    const handleSubCategoryChange = (value: string) => {
        setSelectedSubCategoryId(value);
        setSelectedItemGroupId("all");
        setSelectedItems([]);
    };

    const handleItemGroupChange = (value: string) => {
        setSelectedItemGroupId(value);
        setSelectedItems([]);
    };

    const handleItemSelect = (itemId: string) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === filteredData.items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredData.items.map(item => item.id));
        }
    };

    const details = (
        <div className="p-4">
            detail
        </div>
    );

    const content = (
        <>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Selected Items ({selectedItems.length})</h2>
                <div className="space-y-2">
                    {filteredData.items
                        .filter(item => selectedItems.includes(item.id))
                        .map(item => (
                            <div key={item.id} className="p-2 bg-gray-50 rounded">
                                <p className="font-medium">{item.itemName}</p>
                                <p className="text-sm text-gray-600">{item.sku}</p>
                            </div>
                        ))}
                </div>
            </div>
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Category</label>
                            <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categoryData.map(category => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">SubCategory</label>
                            <Select
                                value={selectedSubCategoryId}
                                onValueChange={handleSubCategoryChange}
                                disabled={selectedCategoryId === "all"}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All SubCategories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All SubCategories</SelectItem>
                                    {filteredData.subCategories.map(sub => (
                                        <SelectItem key={sub.id} value={sub.id}>
                                            {sub.subCategoryName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-1 block">Item Group</label>
                            <Select
                                value={selectedItemGroupId}
                                onValueChange={handleItemGroupChange}
                                disabled={selectedSubCategoryId === "all"}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Item Groups" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Item Groups</SelectItem>
                                    {filteredData.itemGroups.map(group => (
                                        <SelectItem key={group.id} value={group.id}>
                                            {group.itemGroup}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold">Items</h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                >
                                    {selectedItems.length === filteredData.items.length
                                        ? 'Unselect All'
                                        : 'Select All'}
                                </Button>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="w-8 p-2"></th>
                                        <th className="text-left p-2">Name</th>
                                        <th className="text-left p-2">SKU</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.items.map(item => (
                                        <tr key={item.id} className="border-t">
                                            <td className="p-2">
                                                <Checkbox
                                                    checked={selectedItems.includes(item.id)}
                                                    onCheckedChange={() => handleItemSelect(item.id)}
                                                />
                                            </td>
                                            <td className="p-2">{item.itemName}</td>
                                            <td className="p-2">{item.sku}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );

    return (
        <STLComponent
            detail={details}
            content={content}
        />
    );
};

export default StoreLocationDetailPage;
