/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui-custom/TableCustom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';
import React from 'react';
import { FieldType } from './ListViewData';
import { Switch } from '@/components/ui/switch';
import EmptyData from '@/components/EmptyData';

interface Props<T> {
    data: T[];
    fields: Array<{
        key: keyof T;
        display: string;
        type?: FieldType;
    }>;
    titleField?: keyof T;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onSort?: (field: keyof T) => void;
    sortField?: keyof T | null;
    sortDirection?: 'asc' | 'desc';
}

const TableTemplate = <T,>({
    data,
    fields,
    titleField,
    onEdit,
    onDelete,
    onSort,
    sortField,
    sortDirection = 'asc'
}: Props<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCellValue = (field: Props<T>['fields'][0], value: any) => {
        switch (field.type) {
            case 'boolean':
                return (
                    <Switch
                        checked={value}
                        aria-label={field.display}
                    />
                );
            default:
                return String(value);
        }
    };

    const renderSortableHeader = (field: Props<T>['fields'][0]) => (
        <div
            className={`flex items-center gap-1 cursor-pointer select-none
                ${onSort ? 'hover:text-gray-700' : ''}`}
            onClick={() => onSort?.(field.key)}
        >
            {field.display}
            {/* {onSort && (
                <ArrowUpDown
                    className={`h-4 w-4 transition-transform
                        ${sortField === field.key ? 'text-blue-500' : 'text-gray-400'}
                        ${sortField === field.key && sortDirection === 'desc' ? 'rotate-180' : ''}`}
                />
            )} */}
        </div>
    );

    return (
        <div className="w-full overflow-x-auto rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {fields.map((field) => (
                            <TableCell
                                key={String(field.key)}
                            >
                                {renderSortableHeader(field)}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableCell>
                                Actions
                            </TableCell>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={fields.length + (onEdit || onDelete ? 1 : 0)}
                                className="text-center text-gray-500 py-8"
                            >
                                <EmptyData />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                {fields.map((field) => (
                                    <TableCell
                                        key={String(field.key)}
                                        className="whitespace-nowrap bg-white"
                                    >
                                        {renderCellValue(field, item[field.key])}
                                    </TableCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {onEdit && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="hover:bg-blue-50"
                                                >
                                                    <SquarePen />
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="hover:bg-red-600"
                                                >
                                                    <Trash />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableTemplate;