interface Equipment {
    id: string;
    name: string;
    location: string;
    department: 'Machining' | 'Assembly' | 'Packaging' | 'Shipping';
    model: string;
    serialNumber: string;
    installDate: Date;
    status: 'Operational' | 'Down' | 'Maintenance' | 'Retired';
}

interface MaintenanceRecord {
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
