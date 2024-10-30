import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface Props<T> {
    item: T;
    titleField: keyof T;
    fields: Array<{
        key: keyof T;
        display: string;
        type?: 'text' | 'boolean' | 'select';
    }>;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

const CardTemplate = <T,>({ item, titleField, fields, onEdit, onDelete }: Props<T>) => {
    // ฟังก์ชันสำหรับแสดงค่าตามประเภทของข้อมูล
    const renderFieldValue = (field: Props<T>['fields'][0], value: any) => {
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

    return (
        <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {String(item[titleField])}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {fields.map((field) => (
                        <div
                            key={String(field.key)}
                            className="flex justify-between items-center py-1 border-b last:border-0"
                        >
                            <span className="text-sm text-gray-600 font-medium">
                                {field.display}
                            </span>
                            <span className="text-sm">
                                {renderFieldValue(field, item[field.key])}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                    {onEdit && (
                        <Button
                            variant="outline"
                            onClick={() => onEdit(item)}
                            className="hover:bg-blue-50"
                        >
                            แก้ไข
                        </Button>
                    )}
                    {onDelete && (
                        <Button
                            variant="destructive"
                            onClick={() => onDelete(item)}
                            className="hover:bg-red-600"
                        >
                            ลบ
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default CardTemplate;