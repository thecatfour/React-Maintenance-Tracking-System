import { 
    MaintenanceRecord,
    MaintenanceRecordPriority,
    MaintenanceRecordStatus,
    MaintenanceRecordType,
} from "@/lib/maintenance-records/MaintenanceRecordInterface";

import {
    Equipment, 
    EquipmentDepartment, 
    EquipmentStatus,
} from "@/lib/equipment/EquipmentInterface";

export const exampleEquipment: Equipment[] = [
    {
        id: "1",
        name: "Assembly machine",
        location: "Site 1",
        department: EquipmentDepartment.Assembly,
        model: "Mk 2",
        serialNumber: "123",
        installDate: new Date("2024-12-01"),
        status: EquipmentStatus.Down,
    },
    {
        id: "2",
        name: "Machining machine",
        location: "Site 1",
        department: EquipmentDepartment.Machining,
        model: "Mk 1",
        serialNumber: "234",
        installDate: new Date("2024-12-02"),
        status: EquipmentStatus.Operational,
    },
    {
        id: "3",
        name: "Packacking machine",
        location: "Site 2",
        department: EquipmentDepartment.Packaging,
        model: "Mk 2",
        serialNumber: "345",
        installDate: new Date("2024-12-03"),
        status: EquipmentStatus.Maintenance,
    },
    {
        id: "4",
        name: "Shipping machine",
        location: "Site 2",
        department: EquipmentDepartment.Shipping,
        model: "Mk 1",
        serialNumber: "456",
        installDate: new Date("2024-12-04"),
        status: EquipmentStatus.Retired,
    }
]

export const exampleMaintenanceRecord: MaintenanceRecord[] = [
    {
        id: "1",
        equipmentId: "2",
        date: new Date("2024-12-03"),
        type: MaintenanceRecordType.Preventive,
        technician: "Steve",
        hoursSpent: 1,
        description: "Check on arm 1 of machine.",
        priority: MaintenanceRecordPriority.Low,
        completionStatus: MaintenanceRecordStatus.Complete,
    },
    {
        id: "2",
        equipmentId: "1",
        date: new Date("2024-12-04"),
        type: MaintenanceRecordType.Emergency,
        technician: "Joe",
        hoursSpent: 4,
        description: "Malfunction on welding arm 3.",
        priority: MaintenanceRecordPriority.High,
        completionStatus: MaintenanceRecordStatus.Pending_Parts,
    },
    {
        id: "3",
        equipmentId: "3",
        date: new Date("2024-12-05"),
        type: MaintenanceRecordType.Repair,
        technician: "Allen",
        hoursSpent: 2,
        description: "Repair on packing arm 2.",
        priority: MaintenanceRecordPriority.Medium,
        completionStatus: MaintenanceRecordStatus.Incomplete,
    }
]
