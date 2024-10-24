import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from '@/lib/i18n';
import { ArrowLeft, CheckSquare, Edit, Printer, Save, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import ToggleSidebarButton from '@/components/ui-custom/ButtonToggleSidebar';
import { GoodsReceiveNoteType } from '../type/procurementType';
import ConfirmDialog from '@/components/ui-custom/ConfirmDialog';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormValues } from '../type/type';
import { submitForm } from '../lib/action';

type Props = {
    id?: string;
    grnMode?: GoodsReceiveNoteType;
};

const GoodsReceiveNoteComponent: React.FC<Props> = ({ id, grnMode }) => {
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [mode, setMode] = useState(grnMode);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string>('')


    const onBack = () => {
        router.push("/procurement/goods-received-note");
    };

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    const handleSave = () => {
        setIsDialogOpen(true)
    };

    const handleCancel = () => {
        console.log("cancel");
        setMode(GoodsReceiveNoteType.VIEW);
        router.push(`/procurement/goods-received-note/${id}`);
    };

    const handleEdit = () => {
        router.push(`/procurement/goods-received-note/${id}/edit`);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        router.push("/procurement/goods-received-note");
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        setServerError('')

        try {
            const result = await submitForm(data)

            if (result.error) {
                setServerError(result.error)
            } else {
                // Handle success
                console.log('Form submitted successfully:', result.data)
            }
        } catch (error) {
            console.log(error);
            setServerError('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }


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
                            <CardHeader className="flex flex-col space-y-4 pb-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="icon" onClick={onBack}>
                                            <ArrowLeft className="h-4 w-4" />
                                            <span className="sr-only">Go back</span>
                                        </Button>
                                        <CardTitle className="text-xl font-bold">Goods Receive Note</CardTitle>
                                    </div>
                                    <StatusBadge status="Pending" />
                                    <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                                        {mode === GoodsReceiveNoteType.VIEW ? (
                                            <>
                                                <Button variant="default" size="sm" onClick={handleEdit}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="outline" size="sm" onClick={handleSave}>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={handleCancel}>
                                                    <X className="mr-2 h-4 w-4" />
                                                    Cancel
                                                </Button>
                                            </>
                                        )}
                                        <Button variant="outline" size="sm">
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <CheckSquare className="mr-2 h-4 w-4" />
                                            Commit
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ref" className="text-sm font-medium">
                                            GRN #
                                        </Label>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            <div>
                                                <Input
                                                    id="ref"
                                                    {...register('ref')}
                                                    className="h-8 text-sm"
                                                    disabled={isSubmitting}
                                                />
                                                {errors.ref && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.ref.message}</p>
                                                )}
                                            </div>

                                            {serverError && (
                                                <p className="text-red-500 text-sm">{serverError}</p>
                                            )}

                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardContent>
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
            <ConfirmDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                triggerText="Open"
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default GoodsReceiveNoteComponent;
