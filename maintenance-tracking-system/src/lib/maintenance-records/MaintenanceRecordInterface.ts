export enum MaintenanceRecordType {
    Preventive = 'Preventive',
    Repair = 'Repair',
    Emergency = 'Emergency',
}

export enum MaintenanceRecordPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export enum MaintenanceRecordStatus {
    Complete = 'Complete',
    Incomplete = 'Incomplete',
    Pending_Parts = 'Pending Parts',
}

export interface MaintenanceRecord {
    id: string;
    equipmentId: string;
    date: Date;
    type: MaintenanceRecordType;
    technician: string;
    hoursSpent: number;
    description: string;
    partsReplaced?: string[];
    priority: MaintenanceRecordPriority;
    completionStatus: MaintenanceRecordStatus;
}
