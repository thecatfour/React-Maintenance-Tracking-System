"use client";

import { EXAMPLE_EQUIPMENT, EXAMPLE_MAINTENANCE_RECORD } from "@/lib/ExampleObjects";
import EquipmentTableManager from "@/components/equipment/visuals/EquipmentTableManager";
import Navbar from "@/components/generics/visuals/Navbar";
import { useState } from "react";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { RowSelectionState } from "@tanstack/react-table";
import MaintenanceRecordTableManager from "@/components/maintenance-records/visuals/MaintenanceRecordTableManager";

export default function Home() {
    const [equipment, setEquipment] = useState<Equipment[]>(EXAMPLE_EQUIPMENT);
    const [mRecords, setMRecords] = useState<MaintenanceRecord[]>(EXAMPLE_MAINTENANCE_RECORD);

    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
    const [isMaintenananceRecordsOpen, setIsMaintenanceRecordsOpen] = useState(false);

    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    function focusDashboard() {
        setIsEquipmentOpen(false);
        setIsMaintenanceRecordsOpen(false);
        setIsDashboardOpen(true);
    }

    function focusEquipment() {
        setIsDashboardOpen(false);
        setIsMaintenanceRecordsOpen(false);
        setIsEquipmentOpen(true);
    }

    function focusMaintenanceRecords() {
        setIsDashboardOpen(false);
        setIsEquipmentOpen(false);
        setIsMaintenanceRecordsOpen(true);
    }

    return (
        <div>
            <Navbar
                clickDashboard={focusDashboard}
                clickEquipment={focusEquipment}
                clickMRecords={focusMaintenanceRecords}
            />
            {isEquipmentOpen &&
                <EquipmentTableManager 
                    data={equipment}
                    setData={setEquipment}
                />  
            }
            {isMaintenananceRecordsOpen &&
                <MaintenanceRecordTableManager
                    equipment={equipment}
                    data={mRecords}
                    setData={setMRecords}
                />
            }
        </div>  
    );
}
