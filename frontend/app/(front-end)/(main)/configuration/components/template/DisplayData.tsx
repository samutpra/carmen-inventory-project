interface PaginationInfo {
    total: number;
    page: number;
    perPage: number;
    pages: number;
}

import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DisplayDataProps<T> {
    data: T[];
    columns: {
        key: keyof T;
        header: string;
    }[];
    isActive?: (item: T) => boolean;
    actions?: (item: T) => React.ReactNode;
    title?: string;
    pagination?: PaginationInfo;
    onPageChange?: (page: number) => void;
    onAdd?: () => void;
    addButtonLabel?: string;
}

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
    <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? 'Active' : 'Inactive'}
    </Badge>
);

export function DisplayData<T extends { id: string | number }>({
    data,
    columns,
    isActive,
    actions,
    title,
    pagination,
    onPageChange,
    onAdd,
    addButtonLabel = 'Add New'
}: DisplayDataProps<T>) {

    const renderPagination = () => {
        if (!pagination || pagination.pages <= 1) return null;
        const currentPage = pagination.page;
        const totalPages = pagination.pages;

        const getPageNumbers = () => {
            const pages = [];
            pages.push(1);

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (pages[pages.length - 1] !== i - 1) {
                    pages.push(-1);
                }
                pages.push(i);
            }
            if (totalPages > 1) {
                if (pages[pages.length - 1] !== totalPages - 1) {
                    pages.push(-1);
                }
                pages.push(totalPages);
            }

            return pages;
        };

        return (
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ChevronLeft />
                </Button>

                {getPageNumbers().map((pageNum, index) => (
                    pageNum === -1 ? (
                        <Button
                            key={`ellipsis-${index}`}
                            variant="outline"
                            size="sm"
                            disabled
                        >
                            ...
                        </Button>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange?.(pageNum)}
                        >
                            {pageNum}
                        </Button>
                    )
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    <ChevronRight />
                </Button>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className='text-2xl'>{title}</h1>
                {onAdd && (
                    <Button
                        onClick={onAdd}
                        className="mb-4"
                    >
                        {addButtonLabel}
                    </Button>
                )}
            </div>

            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} className="font-semibold">
                                    {column.header}
                                </TableCell>
                            ))}
                            {(isActive || actions) && <TableCell className="font-semibold">Status</TableCell>}
                            {actions && <TableCell className="font-semibold">Actions</TableCell>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={`${item.id}-${String(column.key)}`}>
                                        {String(item[column.key])}
                                    </TableCell>
                                ))}
                                {isActive && (
                                    <TableCell>
                                        <StatusBadge isActive={isActive(item)} />
                                    </TableCell>
                                )}
                                {actions && (
                                    <TableCell>
                                        {actions(item)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className='flex justify-end'>
                    {renderPagination()}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
                {data.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                    {String(item[columns[0].key])}
                                </CardTitle>
                                {isActive && <StatusBadge isActive={isActive(item)} />}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {columns.slice(1).map((column) => (
                                <div key={String(column.key)}>
                                    <p className="text-sm font-medium text-gray-500">
                                        {column.header}
                                    </p>
                                    <p className="text-sm">
                                        {String(item[column.key])}
                                    </p>
                                </div>
                            ))}
                            {actions && (
                                <div className="pt-2">
                                    {actions(item)}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {renderPagination()}
            </div>
        </div>
    );
}