"use client"
import React, { useMemo, useState } from 'react'
import { useRouter } from '@/lib/i18n';
import { sampleData } from '../data/sampleData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Edit, Eye, Filter, Plus, Printer, Search, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBadge from '@/components/ui-custom/custom-status-badge';
import ListPageTemplate from '@/components/templates/ListPageTemplate';


const PurchaseRequestList = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [selectedStatus, setSelectedStatus] = useState("All Statuses");
    const [sortField, setSortField] = useState<
        keyof (typeof sampleData)[0] | null
    >(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const itemsPerPage = 7;
    const [selectedPRs, setSelectedPRs] = useState<string[]>([]);

    const filteredData = useMemo(() => {
        return sampleData.filter((pr) => {
            const matchesSearch = Object.values(pr).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesType =
                selectedType === "All Types" || pr.type === selectedType;
            const matchesStatus =
                selectedStatus === "All Statuses" || pr.status === selectedStatus;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [searchTerm, selectedType, selectedStatus]);

    const sortedAndFilteredData = useMemo(() => {
        let result = filteredData;

        if (sortField) {
            result = [...result].sort((a, b) => {
                if (a[sortField] < b[sortField])
                    return sortDirection === "asc" ? -1 : 1;
                if (a[sortField] > b[sortField])
                    return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [filteredData, sortField, sortDirection]);


    const totalPages = Math.ceil(sortedAndFilteredData.length / itemsPerPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedAndFilteredData.slice(startIndex, endIndex);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setCurrentPage(1);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        setCurrentPage(1);
    };

    const handleSort = (field: keyof (typeof sampleData)[0]) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handleCreateNewPR = () => {
        router.push("/procurement/purchase-requests/new?mode=add");
    };

    const handleViewPR = (id: string) => {
        router.push(`/procurement/purchase-requests/${id}?mode=view`);
    };

    const handleEditPR = (id: string) => {
        router.push(`/procurement/purchase-requests/${id}?mode=edit`);
    };

    const handleSelectPR = (id: string) => {
        setSelectedPRs((prev) =>
            prev.includes(id) ? prev.filter((prId) => prId !== id) : [...prev, id]
        );
    };

    const handleSelectAllPRs = (checked: boolean) => {
        if (checked) {
            setSelectedPRs(getCurrentPageData().map((pr) => pr.id));
        } else {
            setSelectedPRs([]);
        }
    };

    const bulkActions =
        selectedPRs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
                <Button variant="outline">Delete Selected</Button>
                <Button variant="outline">Approve Selected</Button>
                <Button variant="outline">Reject Selected</Button>
            </div>
        ) : null;


    const filters = (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="w-full sm:w-1/2 flex space-x-2">
                    <Input
                        placeholder="Search PRs..."
                        className="w-full"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Button variant="secondary" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {selectedType}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => handleTypeChange("All Types")}>
                                All Types
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => handleTypeChange("General Purchase")}
                            >
                                General Purchase
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => handleTypeChange("Market List")}
                            >
                                Market List
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => handleTypeChange("Asset Purchase")}
                            >
                                Asset Purchase
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {selectedStatus}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onSelect={() => handleStatusChange("All Statuses")}
                            >
                                All Statuses
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleStatusChange("Draft")}>
                                <Badge variant="outline" className="mr-2">
                                    Draft
                                </Badge>{" "}
                                Draft
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => handleStatusChange("Submitted")}
                            >
                                <Badge className="mr-2">Submitted</Badge> Submitted
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleStatusChange("Approved")}>
                                <Badge variant="secondary" className="mr-2">
                                    Approved
                                </Badge>{" "}
                                Approved
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleStatusChange("Rejected")}>
                                <Badge variant="destructive" className="mr-2">
                                    Rejected
                                </Badge>{" "}
                                Rejected
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" /> More Filters
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem>Date Range</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Department</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Requestor</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Amount Range</DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Clear Filters</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );

    const actionButtons = (
        <>
            <div className="flex flex-wrap gap-2">
                <Button onClick={handleCreateNewPR} className="group">
                    <Plus className="mr-2 h-4 w-4" /> New Purchase Request
                </Button>
                <Button variant="outline" className="group">
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Button variant="outline" className="group">
                    <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
            </div>
        </>
    );

    const content = (
        <>
            <div className="space-y-2" >
                {getCurrentPageData().map((pr) => (
                    <Card key={pr.id} className="overflow-hidden p-2 hover:bg-secondary dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                        <div className="py-2 px-4">
                            <div className="flex justify-between items-center mb-0">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={selectedPRs.includes(pr.id)}
                                        onCheckedChange={() => handleSelectPR(pr.id)}
                                    />
                                    <StatusBadge status={pr.status} />
                                    <span className="text-lg text-muted-foreground">
                                        {pr.id}
                                    </span>
                                    <h3 className="text-lg md:text-lg font-semibold">
                                        {pr.description}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="View purchase request"
                                        onClick={() => handleViewPR(pr.id)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Edit purchase request"
                                        onClick={() => handleEditPR(pr.id)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Delete purchase request"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 md:gap-2">
                                {[
                                    { label: "Date", field: "date" },
                                    { label: "Type", field: "type" },
                                    { label: "Requestor", field: "requestor" },
                                    { label: "Department", field: "department" },
                                    { label: "Amount", field: "amount" },
                                    { label: "Workflow Stage", field: "currentStage" },
                                ].map(({ label, field }) => (
                                    <div key={field}>
                                        <p className="font-medium text-muted-foreground  text-sm">
                                            {label}
                                        </p>
                                        {field === 'currentStage' ?
                                            <p className="text-sm"><StatusBadge status={pr[field as keyof typeof pr] as string} /></p>
                                            :
                                            <p className="text-sm">{pr[field as keyof typeof pr]}</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, sortedAndFilteredData.length)}{" "}
                    of {sortedAndFilteredData.length} results
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="sr-only">First page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                    >
                        <span className="sr-only">Next page</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Last page</span>
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <ListPageTemplate
            title="Purchase Requests"
            actionButtons={actionButtons}
            filters={filters}
            content={content}
            bulkActions={bulkActions}
        />
    )
}

export default PurchaseRequestList