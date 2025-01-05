"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { Dispatch, useState } from "react";
import MaintenanceRecordTable from "./MaintenanceRecordTable";
import { RowSelectionState } from "@tanstack/react-table";
import MaintenanceRecordCreateButton from "../buttons/MaintenanceRecordCreateButton";
import MaintenanceRecordEditButton from "../buttons/MaintenanceRecordEditButton";

interface ComponentProps {
    equipmentArray: Equipment[];
    data: MaintenanceRecord[];
    setData: Dispatch<MaintenanceRecord[]>;
}

/**
 * This component renders buttons to modify the maintenance record array as well as a table of the maintenance record array
 * @param data The maintenance record array that is meant to be displayed and changed
 * @param setData The dispatch function used to change the maintenance record array
 * @param equipmentArray The equipment objects that give context to the equipmentId field in maintenance records
 */
const MaintenanceRecordTableManager: React.FC<ComponentProps> = ({ equipmentArray, data, setData }) => {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 mt-2 ml-2">
                <MaintenanceRecordCreateButton
                    className="bg-zinc-600 hover:bg-zinc-500 p-1 rounded-lg text-white"
                    allRows={data}
                    setRows={setData}
                    equipmentArray={equipmentArray}
                />

                <MaintenanceRecordEditButton
                    className="bg-zinc-600 hover:bg-zinc-500 p-1 rounded-lg text-white"
                    allRows={data}
                    setRows={setData}
                    equipmentArray={equipmentArray} 
                    selectedRows={selectedRows}                
                />
            </div>

            <MaintenanceRecordTable
                equipmentArray={equipmentArray}
                mRecordsArray={data}
                setSelectedRows={setSelectedRows}
            />
        </div>
    )
}

export default MaintenanceRecordTableManager;
