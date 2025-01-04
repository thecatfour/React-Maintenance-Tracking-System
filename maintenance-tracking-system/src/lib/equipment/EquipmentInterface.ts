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

interface DictFormat {
    [key: string]: string
}

export const EquipmentStatusColors: DictFormat = {
    "Operational":  "bg-green-800",
    "Down":         "bg-red-800",
    "Maintenance":  "bg-yellow-700",
    "Retired":      "bg-gray-600",
} as const;

export const EquipmentStatusPieColors: DictFormat = {
    "Operational":  "#1b700a",
    "Down":         "#b33212",
    "Maintenance":  "#b58107",
    "Retired":      "#848a87",
} as const;

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
