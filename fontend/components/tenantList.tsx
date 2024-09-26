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
import { ITenant } from "@/types/tenant";
import { setTenantId, TenantID } from "@/lib/currentUser";
import { Mock_TenantList } from "@/app/mocks/tenantlist";

export function TenantList() {
  const [businessUnit, setBusinessUnit] = useState("");
  const [list, SetList] = useState<ITenant[]>([]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // fetch(`${ApiDomain}/api/tenants`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     SetList(data);
    //   });

    SetList(Mock_TenantList);

    let tenantid = TenantID;

    if (tenantid || tenantid == "") {
      tenantid = list[0] ? list[0].id : "";
      setTenantId(tenantid);
    }

    setBusinessUnit(tenantid);
  }, []);

  return (
    <>
      <Select
        value={businessUnit}
        onValueChange={(businessUnit) => {
          console.log(businessUnit);
          setTenantId(businessUnit);
          setBusinessUnit(businessUnit);
        }}
      >
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
