import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";

import { Equipment } from "@/lib/equipment/EquipmentInterface";

export const EXAMPLE_EQUIPMENT: Equipment[] = [
    {
        id: "0",
        name: "Assembly machine",
        location: "Site 1",
        department: "Assembly",
        model: "Mk 2",
        serialNumber: "123",
        installDate: new Date("2024-12-01"),
        status: "Down",
    },
    {
        id: "1",
        name: "Machining machine",
        location: "Site 1",
        department: "Machining",
        model: "Mk 1",
        serialNumber: "234",
        installDate: new Date("2024-12-02"),
        status: "Operational",
    },
    {
        id: "2",
        name: "Packaging machine",
        location: "Site 2",
        department: "Packaging",
        model: "Mk 2",
        serialNumber: "345",
        installDate: new Date("2024-12-03"),
        status: "Maintenance",
    },
    {
        id: "3",
        name: "Shipping machine",
        location: "Site 2",
        department: "Shipping",
        model: "Mk 1",
        serialNumber: "456",
        installDate: new Date("2024-12-04"),
        status: "Retired",
    }
] as const;

export const EXAMPLE_MAINTENANCE_RECORD: MaintenanceRecord[] = [
    {
        id: "0",
        equipmentId: "1",
        date: new Date("2024-12-03"),
        type: "Preventive",
        technician: "Steve",
        hoursSpent: 1,
        description: "Check on arm 1 of machine.",
        priority: "Low",
        completionStatus: "Complete",
    },
    {
        id: "1",
        equipmentId: "0",
        date: new Date("2024-12-04"),
        type: "Emergency",
        technician: "Joe",
        hoursSpent: 4,
        description: "Malfunction on welding arm 3.",
        priority: "High",
        completionStatus: "Pending Parts",
    },
    {
        id: "2",
        equipmentId: "2",
        date: new Date("2024-12-05"),
        type: "Repair",
        technician: "Allen",
        hoursSpent: 2,
        description: "Repair on packing arm 2.",
        priority: "Medium",
        completionStatus: "Incomplete",
    }
]
