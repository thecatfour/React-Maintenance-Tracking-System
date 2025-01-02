import { z } from "zod";
import { MaintenanceRecordType, MaintenanceRecordStatus, MaintenanceRecordPriority, MaintenanceRecord } from "./MaintenanceRecordInterface";

export const M_RECORD_ERROR_MSG = {
    equipmentId: {required: "Equipment for the record is required"},
    date: {future: "Date cannot be a day in the future"},
    technician: {required: "Technician is required", minLength: "Must be 2 or more characters", trailingWhiteSpace: "Technician cannot only be whitespace"},
    hoursSpent: {required: "Hours spent is required", positive: "Must be a positive number", maxValue: "Max is 24 hours"},
    description: {required: "Description is required", minLength: "Must be 10 or more characters", trailingWhitespace: "Description cannot be made up of whitespace only"},
    partsReplaced: {required: "Added parts need a name", trailingWhitespace: "A part cannot only be whitespace"},
}

export const mRecordSchema = z.object({
    equipmentId: z.string()
        .min(1, {message: M_RECORD_ERROR_MSG.equipmentId.required}),
    date: z.string().date()
        .refine(s => s <= new Date().toISOString().substring(0, 10), {message: M_RECORD_ERROR_MSG.date.future}),
    type: z.enum(MaintenanceRecordType),
    technician: z.string()
        .nonempty({message: M_RECORD_ERROR_MSG.technician.required})
        .min(2, {message: M_RECORD_ERROR_MSG.technician.minLength})
        .refine(s => s.toString().trim().length >= 1, {message: M_RECORD_ERROR_MSG.technician.trailingWhiteSpace}),
    hoursSpent: z.string()
        .nonempty({message: M_RECORD_ERROR_MSG.hoursSpent.required})
        .pipe(z.coerce.number()
        .nonnegative({message: M_RECORD_ERROR_MSG.hoursSpent.positive})
        .max(24, {message: M_RECORD_ERROR_MSG.hoursSpent.maxValue})),
    description: z.string()
        .min(1, {message: M_RECORD_ERROR_MSG.description.required})
        .min(10, {message: M_RECORD_ERROR_MSG.description.minLength})
        .refine(s => s.trim().length >= 1, {message: M_RECORD_ERROR_MSG.description.trailingWhitespace}),
    partsReplaced: z.array(z.string()
        .nonempty({message: M_RECORD_ERROR_MSG.partsReplaced.required})
        .refine(s => s.trim().length >= 1, {message: M_RECORD_ERROR_MSG.partsReplaced.trailingWhitespace})
        ).optional(),
    priority: z.enum(MaintenanceRecordPriority),
    completionStatus: z.enum(MaintenanceRecordStatus),
})

export type MaintenanceRecordSchemaType = z.infer<typeof mRecordSchema>;
