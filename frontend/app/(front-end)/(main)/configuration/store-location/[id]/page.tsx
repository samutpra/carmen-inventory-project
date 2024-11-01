"use client";
import React, { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import STLComponent from '../../components/template/STLComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { categoryData, itemCategory, itemGroup, subCategoryData } from '../../data/store';

const StoreLocationDetailPage = () => {
    const params = useParams();
    const id = params.id as string;

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("");
    const [selectedItemGroupId, setSelectedItemGroupId] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredData = useMemo(() => {
        const subCategories = selectedCategoryId !== ""
            ? subCategoryData.filter(sub => sub.categoryId === selectedCategoryId)
            : subCategoryData;

        const relevantItemGroups = selectedSubCategoryId !== ""
            ? itemGroup.filter(item => item.subCategoryId === selectedSubCategoryId)
            : itemGroup.filter(item =>
                subCategories.some(sub => sub.id === item.subCategoryId)
            );

        const items = selectedItemGroupId !== ""
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
        setSelectedSubCategoryId("");
        setSelectedItemGroupId("");
        setSelectedItems([]);
        console.log("Category changed:", value);
    };

    const handleSubCategoryChange = (value: string) => {
        setSelectedSubCategoryId(value);
        setSelectedItemGroupId("");
        setSelectedItems([]);
        console.log("SubCategory changed:", value);
    };

    const handleItemGroupChange = (value: string) => {
        setSelectedItemGroupId(value);
        setSelectedItems([]);
        console.log("Item Group changed:", value);
    };

    const handleItemSelect = (itemId: string) => {
        setSelectedItems(prev => {
            const updatedItems = prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId];
            console.log("Item selected:", itemId, "Selected items:", updatedItems);
            return updatedItems;
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === filteredData.items.length) {
            setSelectedItems([]);
            console.log(" items unselected");
        } else {
            const allItemIds = filteredData.items.map(item => item.id);
            setSelectedItems(allItemIds);
            console.log(" items selected:", allItemIds);
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
                        {/* Category Selection */}
                        <div>
                            <label className="text-sm font-medium mb-1 block">Category</label>
                            <div className="space-y-2">
                                {categoryData.map(category => (
                                    <div key={category.id} className="flex items-center">
                                        <Checkbox
                                            checked={selectedCategoryId === category.id}
                                            onCheckedChange={() => handleCategoryChange(category.id)}
                                        />
                                        <span className="ml-2">{category.categoryName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SubCategory Selection */}
                        <div>
                            <label className="text-sm font-medium mb-1 block">SubCategory</label>
                            <div className="space-y-2">
                                {filteredData.subCategories.map(sub => (
                                    <div key={sub.id} className="flex items-center">
                                        <Checkbox
                                            checked={selectedSubCategoryId === sub.id}
                                            onCheckedChange={() => handleSubCategoryChange(sub.id)}
                                            disabled={selectedCategoryId === ""}
                                        />
                                        <span className="ml-2">{sub.subCategoryName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Item Group Selection */}
                        <div>
                            <label className="text-sm font-medium mb-1 block">Item Group</label>
                            <div className="space-y-2">
                                {filteredData.itemGroups.map(group => (
                                    <div key={group.id} className="flex items-center">
                                        <Checkbox
                                            checked={selectedItemGroupId === group.id}
                                            onCheckedChange={() => handleItemGroupChange(group.id)}
                                            disabled={selectedSubCategoryId === ""}
                                        />
                                        <span className="ml-2">{group.itemGroup}</span>
                                    </div>
                                ))}
                            </div>
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
                                        ? 'Unselect '
                                        : 'Select '}
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
