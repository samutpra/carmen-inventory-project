"use client"

import React, { useEffect, useState } from 'react'
import DataDisplayTemplate from '@/components/templates/DataDisplayTemplate'
import { CustomButton } from '@/components/ui-custom/CustomButton'
import { ArrowUpDown, Check, ChevronsUpDown, Command, Filter, Plus } from 'lucide-react'
import { UnitLabel, UnitSchema, UnitType } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FilterBuilder } from '../../procurement/goods-received-note/components/FilterBuilder'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import DataTable from '@/components/templates/DataTable'
import DataCard from '@/components/templates/DataCard'

const statusOptions = [
    {
        value: "all",
        label: "All Statuses",
    },
    {
        value: "draft",
        label: "Draft",
    },
    {
        value: "submitted",
        label: "Submitted",
    },
    {
        value: "approved",
        label: "Approved",
    },
    {
        value: "rejected",
        label: "Rejected",
    },
]

const unitData: UnitType[] = [
    { id: '1', name: 'AS', description: 'AS', isActive: true },
    { id: '2', name: 'BAG', description: 'BAG', isActive: true },
    { id: '3', name: 'BALL', description: 'BALL', isActive: true },
    { id: '4', name: 'BASIN', description: 'basin', isActive: true },
]


const UnitList = () => {
    const [units, setUnits] = useState<UnitType[]>([]);
    const title = 'Unit'

    useEffect(() => {
        const fetchUnit = async () => {
            const data = unitData.map((data) => {
                return UnitSchema.parse(data);
            })
            setUnits(data);
        }
        fetchUnit();
    }, [])

    const actionButtons = (
        <div className="flex flex-col gap-2 lg:flex-row">
            <CustomButton className="w-full sm:w-auto">
                <Plus className="h-4 w-4" /> Add
            </CustomButton>
            <div className="flex gap-2 w-full lg:w-auto">
                <CustomButton variant="outline" className="w-full sm:w-auto">Export</CustomButton>
                <CustomButton variant="outline" className="w-full sm:w-auto">Print</CustomButton>
            </div>
        </div>
    )

    const filter = (
        <div className="flex flex-col justify-start sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="w-full sm:w-auto flex-grow">
                <Input
                    placeholder="Search Units..."
                />
            </div>
            <div className='flex items-center space-x-4'>
                <Popover >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                        >
                            Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search status..." />
                            <CommandList>
                                <CommandEmpty>No status found.</CommandEmpty>
                                <CommandGroup>
                                    {statusOptions.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            <Check />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Filter className="h-4 w-4" />
                            More Filters
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:w-[70vw] max-w-[60vw] bg-white'>
                        <FilterBuilder
                            fields={[
                                { value: 'ref', label: 'Reference' },
                                { value: 'vendor', label: 'Vendor' },
                                { value: 'date', label: 'Date' },
                                { value: 'invoiceNumber', label: 'Invoice Number' },
                                { value: 'invoiceDate', label: 'Invoice Date' },
                                { value: 'status', label: 'Status' },
                            ]}
                            onFilterChange={(filters) => {
                                // Handle filter changes
                                console.log(filters)
                                // You'll need to implement the actual filtering logic
                            }}
                        />
                    </DialogContent>
                </Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <ArrowUpDown className="h-4 w-4" />
                            +                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Date</DropdownMenuItem>
                        <DropdownMenuItem>Vendor</DropdownMenuItem>
                        <DropdownMenuItem>Status</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )

    const handleEdit = (item: UnitType) => {
        console.log('Editing', item);
    };

    const handleDelete = (item: UnitType) => {
        console.log('Deleting', item);
    };

    const handleView = (item: UnitType) => {
        console.log('handleView', item);
    };

    const columns: UnitLabel[] = [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'isActive', label: 'Active' },
    ];

    const content = (
        <>
            <div className="block lg:hidden">
                <DataCard
                    data={units}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            </div>

            <div className="hidden lg:block">
                <DataTable
                    data={units}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            </div>
        </>
    )


    return (
        <>
            <DataDisplayTemplate
                title={title}
                actionButtons={actionButtons}
                filters={filter}
                content={content}
            />
        </>
    )
}

export default UnitList