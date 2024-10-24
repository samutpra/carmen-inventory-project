"use client";

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ToggleSidebarButtonProps {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({ isSidebarVisible, toggleSidebar }) => {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleSidebar}
            className='bg-white'
        >
            {isSidebarVisible ? (
                <>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Hide Sidebar
                </>
            ) : (
                <>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Show Sidebar
                </>
            )}
        </Button>
    );
};

export default ToggleSidebarButton;
