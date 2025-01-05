export const EquipmentDepartment = [
    "Machining", 
    "Assembly", 
    "Packaging", 
    "Shipping",
] as const;

export const EquipmentStatus = [
    "Operational",
    "Down",
    "Maintenance",
    "Retired",
] as const;

export interface Equipment {
    id: string;
    name: string;
    location: string;
    department: 'Machining' | 'Assembly' | 'Packaging' | 'Shipping';
    model: string;
    serialNumber: string;
    installDate: Date;
    status: 'Operational' | 'Down' | 'Maintenance' | 'Retired';
}
