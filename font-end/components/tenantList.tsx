"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import { ApiDomain } from "@/lib/apiDomain";
import { ITenant } from "@/types/interfaces/tenant";
import { setTenantID, TenantID } from "@/lib/currentUser";

export function TenantList() {
  const [businessUnit, setBusinessUnit] = useState("");
  const [list, SetList] = useState<ITenant[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${ApiDomain}/api/tenants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        SetList(data);
      });

    let tenantid = TenantID;
    if (tenantid || tenantid == "") {
      tenantid = list[0] ? list[0].id : "";
      setTenantID(tenantid);
    }

    setBusinessUnit(tenantid);

  }, []);

  return (
    <>
      <Select value={businessUnit} onValueChange={(businessUnit) => {
        console.log(businessUnit)
        setTenantID(businessUnit);
        setBusinessUnit(businessUnit);
      }}>
        <SelectTrigger className="w-[140px] sm:w-[180px]">
          <SelectValue placeholder="Business Unit" />
        </SelectTrigger>
        <SelectContent>
          {list.map((tenant) => (
            <>
              <SelectItem key={tenant.id} value={tenant.id}>
                {tenant.name}
              </SelectItem>
            </>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
