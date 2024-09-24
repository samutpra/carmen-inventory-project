"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@/lib/i18n";
import { useRouter } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, User, Settings, LogOut, Globe } from "lucide-react";
import LanguageSwitcher from "@/components/languageSwitcher";
import { TenantList } from "@/components/tenantList";

export interface HeaderProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Header({
  onSidebarToggle,
  isSidebarOpen,
}: HeaderProps) {
  const router = useRouter();

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
  };

  const handleEditProfile = () => {
    console.log("Navigating to edit profile");
    router.push("/edit-profile");
  };

  return (
    <header className="bg-background backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-40">
      <div className="px-4 py-2 sm:px-6">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center">
            {/* move to sidebar */}

            <Button
              variant="ghost"
              size="icon"
              className="block lg:hidden"
              onClick={onSidebarToggle}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <Link
              href="/dashboard"
              className="text-2xl md:text-3xl font-bold text-blue-900"
            >
              CARMEN
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <TenantList />

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <Bell size={20} />
            </Button>
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="@johndoe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleEditProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
