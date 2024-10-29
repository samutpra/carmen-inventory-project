export interface Vendor {
    id: string;
    companyName: string;
    businessType: { name: string };
    addresses: { addressLine: string; isPrimary: boolean }[];
    contacts: { name: string; phone: string; isPrimary: boolean }[];
}