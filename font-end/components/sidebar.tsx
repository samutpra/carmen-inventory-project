"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/lib/i18n";
import { usePathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useRouter } from "@/lib/i18n";
import * as m from "@/paraglide/messages.js";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
    visible: true,
    enabled: true,
    subItems: [],
  },
  {
    title: "Procurement",
    path: "/procurement",
    icon: "ShoppingCart",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "My Approvals",
        path: "/procurement/my-approvals",
        visible: true,
        enabled: true,
      },
      {
        name: "Purchase Requests",
        path: "/procurement/purchase-requests",
        visible: true,
        enabled: true,
      },
      {
        name: "Purchase Orders",
        path: "/procurement/purchase-orders",
        visible: true,
        enabled: true,
      },
      {
        name: "Goods Received Note",
        path: "/procurement/goods-received-note",
        visible: true,
        enabled: true,
      },
      {
        name: "Credit Notes",
        path: "/procurement/credit-note",
        visible: true,
        enabled: true,
      },
      {
        name: "Purchase Request Templates",
        path: "/procurement/purchase-request-templates",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Product Management",
    path: "/product-management",
    icon: "Package",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Products",
        path: "/product-management/products",
        visible: true,
        enabled: true,
      },
      {
        name: "Categories",
        path: "/product-management/categories",
        visible: true,
        enabled: true,
      },
      {
        name: "Reports",
        path: "/product-management/reports",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Vendor Management",
    path: "/vendor-management",
    icon: "Users",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Manage Vendors",
        path: "/vendor-management/manage-vendors",
        visible: true,
        enabled: true,
      },
      {
        name: "Price Lists",
        path: "/vendor-management/price-lists",
        visible: true,
        enabled: true,
      },
      {
        name: "Price Comparisons",
        path: "/vendor-management/price-comparisons",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Store Operations",
    path: "/store-operations",
    icon: "Store",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Store Requisitions",
        path: "/store-operations/store-requisitions",
        visible: true,
        enabled: true,
      },
      {
        name: "Issues Management",
        path: "/store-operations/issues-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Stock Replenishment",
        path: "/store-operations/stock-replenishment",
        visible: true,
        enabled: true,
      },
      {
        name: "Wastage Reporting",
        path: "/store-operations/wastage-reporting",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Inventory Management",
    path: "/inventory-management",
    icon: "Package",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Stock Overview",
        path: "/inventory-management/stock-overview",
        visible: true,
        enabled: true,
      },
      {
        name: "Stock In",
        path: "/inventory-management/stock-in",
        visible: true,
        enabled: true,
      },
      {
        name: "Stock Out",
        path: "/inventory-management/stock-out",
        visible: true,
        enabled: true,
      },
      {
        name: "Transfer Between Locations",
        path: "/inventory-management/transfer-between-locations",
        visible: true,
        enabled: true,
      },
      {
        name: "Physical Count",
        path: "/inventory-management/physical-count",
        visible: true,
        enabled: true,
      },
      {
        name: "Stock Take",
        path: "/inventory-management/stock-take",
        visible: true,
        enabled: true,
      },
      {
        name: "Inventory Valuation",
        path: "/inventory-management/inventory-valuation",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Operational Planning",
    path: "/operational-planning",
    icon: "CalendarClock",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Recipes Management",
        path: "/operational-planning/recipes-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Menu Engineering",
        path: "/operational-planning/menu-engineering",
        visible: true,
        enabled: true,
      },
      {
        name: "Demand Forecasting",
        path: "/operational-planning/demand-forecasting",
        visible: true,
        enabled: true,
      },
      {
        name: "Inventory Planning",
        path: "/operational-planning/inventory-planning",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Production",
    path: "/production",
    icon: "Factory",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Recipe Execution",
        path: "/production/recipe-execution",
        visible: true,
        enabled: true,
      },
      {
        name: "Batch Production",
        path: "/production/batch-production",
        visible: true,
        enabled: true,
      },
      {
        name: "Wastage Tracking",
        path: "/production/wastage-tracking",
        visible: true,
        enabled: true,
      },
      {
        name: "Quality Control",
        path: "/production/quality-control",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Reporting & Analytics",
    path: "/reporting-analytics",
    icon: "BarChart2",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Operational Reports",
        path: "/reporting-analytics/operational-reports",
        visible: true,
        enabled: true,
      },
      {
        name: "Financial Reports",
        path: "/reporting-analytics/financial-reports",
        visible: true,
        enabled: true,
      },
      {
        name: "Inventory Reports",
        path: "/reporting-analytics/inventory-reports",
        visible: true,
        enabled: true,
      },
      {
        name: "Vendor Performance",
        path: "/reporting-analytics/vendor-performance",
        visible: true,
        enabled: true,
      },
      {
        name: "Cost Analysis",
        path: "/reporting-analytics/cost-analysis",
        visible: true,
        enabled: true,
      },
      {
        name: "Sales Analysis",
        path: "/reporting-analytics/sales-analysis",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Finance",
    path: "/finance",
    icon: "DollarSign",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "Account Code Mapping",
        path: "/finance/account-code-mapping",
        visible: true,
        enabled: true,
      },
      {
        name: "Currency Management",
        path: "/finance/currency-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Exchange Rates",
        path: "/finance/exchange-rates",
        visible: true,
        enabled: true,
      },
      {
        name: "Department and Cost Center",
        path: "/finance/department-list",
        visible: true,
        enabled: true,
      },
      {
        name: "Budget Planning and Control",
        path: "/finance/budget-planning-and-control",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "System Administration",
    path: "/system-administration",
    icon: "Settings",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "User Management",
        path: "/system-administration/user-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Location Management",
        path: "/system-administration/location-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Workflow Management",
        path: "/system-administration/workflow-management",
        visible: true,
        enabled: true,
      },
      {
        name: "General Settings",
        path: "/system-administration/general-settings",
        visible: true,
        enabled: true,
      },
      {
        name: "Notification Preferences",
        path: "/system-administration/notification-preferences",
        visible: true,
        enabled: true,
      },
      {
        name: "License Management",
        path: "/system-administration/license-management",
        visible: true,
        enabled: true,
      },
      {
        name: "Security Settings",
        path: "/system-administration/security-settings",
        visible: true,
        enabled: true,
      },
      {
        name: "Data Backup and Recovery",
        path: "/system-administration/data-backup-and-recovery",
        visible: true,
        enabled: true,
      },
      {
        name: "System Integrations",
        path: "/system-administration/system-integrations",
        visible: true,
        enabled: true,
      },
    ],
  },
  {
    title: "Help & Support",
    path: "/help-support",
    icon: "HelpCircle",
    visible: true,
    enabled: true,
    subItems: [
      {
        name: "User Manuals",
        path: "/help-support/user-manuals",
        visible: true,
        enabled: true,
      },
      {
        name: "Video Tutorials",
        path: "/help-support/video-tutorials",
        visible: true,
        enabled: true,
      },
      {
        name: "FAQs",
        path: "/help-support/faqs",
        visible: true,
        enabled: true,
      },
      {
        name: "Support Ticket System",
        path: "/help-support/support-ticket-system",
        visible: true,
        enabled: true,
      },
      {
        name: "System Updates and Release Notes",
        path: "/help-support/system-updates-and-release-notes",
        visible: true,
        enabled: true,
      },
    ],
  },
];

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIsOpen = () => {
    isOpen = !isOpen;
  };

  const toggleExpand = (title: string, path?: string) => {
    const menuItem = menuItems.find((item) => item.title === title);
    if (!menuItem?.subItems || menuItem.subItems.length === 0) {
      // If there are no subitems, navigate to the path
      router.push(path || "/");
    } else {
      // If there are subitems, toggle the expansion
      setExpandedItems((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    }
  };

  return (
    <>
      <div className="z-50 flex-col gap-4 relative">
        {isOpen && !isLargeScreen && (
          <div
            className="fixed md:sticky inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
        )}

        <aside
          className={cn(
            "fixed top-0 left-0 z-50 h-full max-w-[350px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 ease-in-out",
            isOpen || isLargeScreen
              ? "translate-x-0 md:sticky"
              : "-translate-x-full"
          )}
        >
          <div className="px-8 pt-6 w-fit">
            <Link
              href="/"
              className="text-2xl text-center font-bold text-blue-900"
            >
              {m.sidebar_carmen()}
            </Link>
          </div>

          <ScrollArea className="h-[95vh]">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const IconComponent =
                  (LucideIcons as any)[item.icon] || LucideIcons.Circle;
                return (
                  <div key={item.title} className="px-3 pt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-base font-semibold"
                      onClick={() => toggleExpand(item.title, item.path)}
                    >
                      <span className="flex items-center">
                        <IconComponent className="mr-2 h-5 w-5" />
                        {item.title}
                      </span>
                      {item.subItems &&
                        item.subItems.length > 0 &&
                        (expandedItems.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        ))}
                    </Button>

                    {item.subItems &&
                      item.subItems.length > 0 &&
                      expandedItems.includes(item.title) && (
                        <div className="ml-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Button
                              key={subItem.name}
                              variant="ghost"
                              asChild
                              className={cn(
                                "w-full justify-start text-base",
                                pathname === subItem.path
                                  ? "bg-muted hover:bg-muted"
                                  : "hover:bg-transparent hover:underline"
                              )}
                              onClick={() => !isLargeScreen && onClose()}
                            >
                              <Link href={subItem.path}>
                                {subItem.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
