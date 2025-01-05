export const MaintenanceRecordType = [
    "Preventive",
    "Repair",
    "Emergency",
] as const;

export const MaintenanceRecordPriority = [
    "Low",
    "Medium",
    "High",
] as const;

export const MaintenanceRecordStatus = [
    "Complete",
    "Incomplete",
    "Pending Parts",
] as const;

export interface MaintenanceRecord {
    id: string;
    equipmentId: string;
    date: Date;
    type: 'Preventive' | 'Repair' | 'Emergency';
    technician: string;
    hoursSpent: number;
    description: string;
    partsReplaced?: string[];
    priority: 'Low' | 'Medium' | 'High';
    completionStatus: 'Complete' | 'Incomplete' | 'Pending Parts';
}
