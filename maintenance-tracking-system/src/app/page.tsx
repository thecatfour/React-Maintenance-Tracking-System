"use client";

import { EXAMPLE_EQUIPMENT, EXAMPLE_MAINTENANCE_RECORD } from "@/lib/ExampleObjects";
import EquipmentTableManager from "@/components/equipment/visuals/EquipmentTableManager";
import Navbar from "@/components/generics/visuals/Navbar";
import { useEffect, useState } from "react";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import MaintenanceRecordTableManager from "@/components/maintenance-records/visuals/MaintenanceRecordTableManager";
import EquipmentStatusPieChart from "@/components/equipment/visuals/EquipmentStatusPieChart";
import MaintenanceHoursBarChart from "@/components/maintenance-records/visuals/MaintenanceHoursBarChart";
import MaintenanceRecordTable from "@/components/maintenance-records/visuals/MaintenanceRecordTable";
import { RowSelectionState } from "@tanstack/react-table";
import createRandomEquipment from "@/lib/equipment/CreateEquipment";
import createRandomMaintenanceRecords from "@/lib/maintenance-records/CreateMaintenanceRecords";

export default function Home() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [recentMRecords, setRecentMRecords] = useState<MaintenanceRecord[]>([]);
    const [mRecords, setMRecords] = useState<MaintenanceRecord[]>([]);
    const [createRecords, setCreateRecords] = useState(true);
    
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
    const [isMaintenananceRecordsOpen, setIsMaintenanceRecordsOpen] = useState(false);

    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    useEffect(() => {
        setEquipment(createRandomEquipment(50));
    }, []);

    useEffect(() => {
        if (createRecords && equipment.length > 0) {
            setMRecords(createRandomMaintenanceRecords(200, equipment));
            setCreateRecords(false);
        }
    }, [equipment])

    useEffect(() => {
        let oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        setRecentMRecords(mRecords.filter(
            (record) => oneWeekAgo.getTime() <= record.date.getTime()
        ));

    }, [mRecords])

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
                    equipmentArray={equipment}
                    data={mRecords}
                    setData={setMRecords}
                />
            }
            {isDashboardOpen &&
                <div className="flex flex-col gap-2">
                    <div className="bg-white flex flex-row w-full">
                        <EquipmentStatusPieChart
                            equipmentArray={equipment}
                        />
                        <MaintenanceHoursBarChart
                            equipmentArray={equipment}
                            mRecordsArray={mRecords}
                        />
                    </div>
                    <div className="w-full overflow-x-auto">
                        <MaintenanceRecordTable
                            mRecordsArray={recentMRecords}
                            equipmentArray={equipment}
                            setSelectedRows={setSelectedRows}
                            title="Recent Maintenance Records"
                        />
                    </div>
                    
                </div>

            }
        </div>  
    );
}
