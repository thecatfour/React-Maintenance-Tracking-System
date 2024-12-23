export enum EquipmentDepartment {
    Machining = 'Machining',
    Assembly = 'Assembly',
    Packaging = 'Packaging',
    Shipping = 'Shipping',
}

export enum EquipmentStatus {
    Operational = 'Operational',
    Down = 'Down',
    Maintenance = 'Maintenance',
    Retired = 'Retired',
}

export interface Equipment {
    id: string;
    name: string;
    location: string;
    department: EquipmentDepartment;
    model: string;
    serialNumber: string;
    installDate: Date;
    status: EquipmentStatus;
}
