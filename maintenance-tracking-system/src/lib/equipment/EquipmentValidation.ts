import { z } from "zod";
import { EquipmentDepartment, EquipmentStatus } from "./EquipmentInterface";

export const EQUIPMENT_ERROR_MSG = {
    name: {required: "Name is required", minLength: "Name must be 3 or more characters", trailingWhitespace: "Name length cannot be filled by trailing whitespace"},
    location: {required: "Location is required"},
    model: {required: "Model is required"},
    serialNumber: {required: "Serial Number is required", alphanumeric: "Serial Number must be alphanumeric"},
    installDate: {future: "Install Date cannot be a day in the future"}
} as const;

export const equipmentSchema = z.object({
    name: z.string()
        .min(1, {message: EQUIPMENT_ERROR_MSG.name.required})
        .min(3, {message: EQUIPMENT_ERROR_MSG.name.minLength})
        .refine(s => s.trim().length >= 3, {message: EQUIPMENT_ERROR_MSG.name.trailingWhitespace}),
    location: z.string()
        .refine(s => s.trim().length >= 1, {message: EQUIPMENT_ERROR_MSG.location.required}),
    department: z.enum(EquipmentDepartment),
    model: z.string()
        .refine(s => s.trim().length >= 1, {message: EQUIPMENT_ERROR_MSG.model.required}),
    serialNumber: z.string()
        .refine(s => s.trim().length >= 1, {message: EQUIPMENT_ERROR_MSG.serialNumber.required})  
        .refine(s => /^[a-zA-Z0-9]+$/.test(s), {message: EQUIPMENT_ERROR_MSG.serialNumber.alphanumeric}),
    installDate: z.string().date()
        .refine(s => s <= new Date().toISOString().substring(0, 10), {message: EQUIPMENT_ERROR_MSG.installDate.future}),
    status: z.enum(EquipmentStatus),
});

export type EquipmentSchemaType = z.infer<typeof equipmentSchema>;
