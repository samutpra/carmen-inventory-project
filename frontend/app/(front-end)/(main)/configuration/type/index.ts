/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod'

const StoreTypeEnum = z.enum(["Main"]);
const StoreStatusEnum = z.enum(["Default", "System"]);

export const storeLocationSchema = z.object({
    id: z.string(),
    storeCode: z.string(),
    storeName: z.string(),
    departmentName: z.string(),
    type: StoreTypeEnum,
    status: StoreStatusEnum,
    isActive: z.boolean(),
});

export type storeLocationType = z.infer<typeof storeLocationSchema>;

export interface StoreLocationLabel {
    key: keyof storeLocationType;
    display: string;
    type: "string" | "boolean";
}


export const currencySchema = z.object({
    id: z.string(),
    code: z.string(),
    description: z.string(),
    isActive: z.boolean(),
});

export type currencyType = z.infer<typeof currencySchema>;
export interface CurrencyLabel {
    key: keyof currencyType;
    display: string;
    type: "string" | "boolean";
}


