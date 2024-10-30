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