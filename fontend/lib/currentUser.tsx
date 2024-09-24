"use client";

export const getTenantID = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tenant-id") || "";
  }
  return ""; // Default value for server-side rendering
};

export const setTenantID = (tenantid: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tenant-id", tenantid);
  }
};

export const TenantID = typeof window !== "undefined" ? getTenantID() : "";
