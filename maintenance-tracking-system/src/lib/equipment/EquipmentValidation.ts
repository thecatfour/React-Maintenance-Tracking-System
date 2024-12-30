import { z } from "zod";
import { EquipmentDepartment, EquipmentStatus } from "./EquipmentInterface";


export const equipmentSchema = z.object({
    name: z.string()
        .min(1, {message: "Name is required"})
        .min(3, {message: "Name must be 3 or more characters"})
        .refine(s => s.trim().length >= 3, {message: "Name length cannot be filled by trailing whitespace"}),
    location: z.string()
        .refine(s => s.trim().length >= 1, {message: "Location is required"}),
    department: z.enum(EquipmentDepartment),
    model: z.string()
        .refine(s => s.trim().length >= 1, {message: "Model is required"}),
    serialNumber: z.string()
        .refine(s => s.trim().length >= 1, {message: "Serial Number is required"})  
        .refine(s => /^[a-zA-Z0-9]+$/.test(s), {message: "Serial Number must be alphanumeric"}),
    installDate: z.string().date()
        .refine(s => s <= new Date().toISOString().substring(0, 10), {message: "Install Date cannot be a day in the future"}),
    status: z.enum(EquipmentStatus),
});

export type EquipmentSchemaType = z.infer<typeof equipmentSchema>;
