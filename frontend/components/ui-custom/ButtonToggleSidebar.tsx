"use client";

import React from 'react';
import { Button } from '../ui/button';
import { ListCollapse } from 'lucide-react';

interface ToggleSidebarButtonProps {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({ isSidebarVisible, toggleSidebar }) => {
    return (
        <Button
            variant="outline"
            onClick={toggleSidebar}
            className='bg-white rounded-full flex items-center justify-center w-14 h-14 shadow-lg border'
        >
            {isSidebarVisible ? (
                <>
                    <ListCollapse />
                </>
            ) : (
                <>
                    <ListCollapse />
                </>
            )}
        </Button>
    );
};

export default ToggleSidebarButton;
