/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui-custom/TableCustom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

interface Props<T> {
    data: T[];
    fields: Array<{
        key: keyof T;
        display: string;
        type?: 'text' | 'boolean' | 'select';
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
    // ฟังก์ชันสำหรับแสดงค่าตามประเภทของข้อมูล
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCellValue = (field: Props<T>['fields'][0], value: any) => {
        switch (field.type) {
            case 'boolean':
                return (
                    <Badge variant={value ? "default" : "secondary"}>
                        {value ? 'Yes' : 'No'}
                    </Badge>
                );
            case 'select':
                return (
                    <Badge variant="outline">
                        {String(value)}
                    </Badge>
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
                    <TableRow className="bg-gray-50">
                        {fields.map((field) => (
                            <TableCell
                                key={String(field.key)}
                                className="font-medium text-gray-600"
                            >
                                {renderSortableHeader(field)}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableCell className="font-medium text-gray-600">
                                การจัดการ
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
                                ไม่พบข้อมูล
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <TableRow
                                key={index}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {fields.map((field) => (
                                    <TableCell
                                        key={String(field.key)}
                                        className="whitespace-nowrap"
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
                                                    แก้ไข
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="hover:bg-red-600"
                                                >
                                                    ลบ
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