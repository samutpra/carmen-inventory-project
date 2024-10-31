import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui-custom/TableCustom';
import { Button } from '../ui/button';
import { EyeIcon, Pen, Trash } from 'lucide-react';

interface Column {
    key: string;
    label: string;
}

interface Props<T> {
    data: T[];
    columns: Column[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({ data, columns, onEdit, onDelete, onView }: Props<T>) => {

    console.log(data);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell key={column.key} className="font-medium">
                            {column.label}
                        </TableCell>
                    ))}
                    {(onEdit || onDelete) && <TableCell className="font-medium">Actions</TableCell>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        {columns.map((column) => (
                            <TableCell key={column.key} className="whitespace-nowrap bg-white">
                                {String(item[column.key] ?? '')}
                            </TableCell>
                        ))}
                        {(onEdit || onDelete || onView) && (
                            <TableCell className="bg-white">
                                <div className="flex gap-2">
                                    {onView && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onView(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <EyeIcon />
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            className="hover:bg-blue-50"
                                        >
                                            <Pen />
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onDelete(item)}
                                        >
                                            <Trash />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;