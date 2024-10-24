import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useRouter } from '@/lib/i18n';
import { ArrowLeft, CheckSquare, Edit, Printer, Save, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoodsReceiveNoteType } from '../type/procurementType';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from '../type/type';
import { submitForm } from '../lib/action';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ToggleSidebarButton from '@/components/ui-custom/ButtonToggleSidebar';
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import ConfirmDialog from '@/components/ui-custom/ConfirmDialog';

interface Props {
    id?: string;
    grnMode?: GoodsReceiveNoteType;
}

const GoodsReceiveNoteComponent: React.FC<Props> = ({ id, grnMode = GoodsReceiveNoteType.VIEW }) => {
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [mode, setMode] = useState(grnMode);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formDataToSubmit, setFormDataToSubmit] = useState<FormValues | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ref: '',
        },
    });

    const isEditMode = mode !== GoodsReceiveNoteType.VIEW;

    const onBack = () => {
        if (form.formState.isDirty && isEditMode) {
            setIsDialogOpen(true);
            return;
        }
        router.push("/procurement/goods-received-note");
    };

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    const handleSaveClick = (data: FormValues) => {
        setFormDataToSubmit(data);
        setIsSaveDialogOpen(true);
    };

    const handleConfirmSave = async () => {
        if (!formDataToSubmit) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await submitForm(formDataToSubmit);

            if (result.error) {
                setError(result.error);
                return;
            }
            console.log('result', result);
            form.reset()
            router.push("/procurement/goods-received-note");
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
            setIsSaveDialogOpen(false);
            setFormDataToSubmit(null);
        }
    };

    const handleCancel = () => {
        if (form.formState.isDirty) {
            setIsDialogOpen(true);
            return;
        }
        resetForm();
    };

    const handleEdit = () => {
        if (id) {
            setMode(GoodsReceiveNoteType.EDIT);
            router.push(`/procurement/goods-received-note/${id}/edit`);
        }
    };

    const resetForm = () => {
        form.reset();
        setMode(GoodsReceiveNoteType.VIEW);
        setError(null);
        router.push("/procurement/goods-received-note");
    };

    const handleConfirmCancel = () => {
        resetForm();
        setIsDialogOpen(false);
    };

    return (
        <>
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-end'>
                    <ToggleSidebarButton
                        isSidebarVisible={isSidebarVisible}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                    <div className={`flex-grow space-y-4 ${isSidebarVisible ? 'lg:w-3/4' : 'w-full'}`}>
                        <Card>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSaveClick)} className="space-y-4">
                                    <CardHeader className="flex flex-col space-y-4 pb-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={onBack}
                                                    disabled={isSubmitting}
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                    <span className="sr-only">Go back</span>
                                                </Button>
                                                <CardTitle className="text-xl font-bold">
                                                    Goods Receive Note
                                                </CardTitle>
                                            </div>
                                            <StatusBadge status="Pending" />
                                            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                                                {!isEditMode ? (
                                                    <>
                                                        <Button
                                                            type="button"
                                                            variant="default"
                                                            size="sm"
                                                            onClick={handleEdit}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            type="submit"
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={!form.formState.isValid || isSubmitting}
                                                        >
                                                            <Save className="mr-2 h-4 w-4" />
                                                            {isSubmitting ? 'Saving...' : 'Save'}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleCancel}
                                                            disabled={isSubmitting}
                                                        >
                                                            <X className="mr-2 h-4 w-4" />
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isSubmitting}
                                                >
                                                    <Printer className="mr-2 h-4 w-4" />
                                                    Print
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={isSubmitting}
                                                >
                                                    <CheckSquare className="mr-2 h-4 w-4" />
                                                    Commit
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {error && (
                                            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                                                {error}
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                                            <FormField
                                                control={form.control}
                                                name="ref"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>GRN #</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                disabled={!isEditMode || isSubmitting}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </form>
                            </Form>
                        </Card>
                    </div>
                    <div className={`space-y-4 ${isSidebarVisible ? 'lg:w-1/4' : 'w-0 opacity-0 overflow-hidden'} transition-all duration-300`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Comments & Attachments</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity Log</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            {/* Cancel Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Unsaved Changes"
                description="You have unsaved changes. Are you sure you want to discard them?"
                onConfirm={handleConfirmCancel}
                isLoading={isSubmitting}
                confirmText="Discard"
                cancelText="Continue Editing"
                confirmVariant="destructive"
            />
            {/* Save Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isSaveDialogOpen}
                onOpenChange={setIsSaveDialogOpen}
                title="Save Changes"
                description="Are you sure you want to save these changes?"
                onConfirm={handleConfirmSave}
                isLoading={isSubmitting}
                confirmText="Save"
                cancelText="Cancel"
                confirmVariant="default"
            />
        </>
    );
};

export default GoodsReceiveNoteComponent;