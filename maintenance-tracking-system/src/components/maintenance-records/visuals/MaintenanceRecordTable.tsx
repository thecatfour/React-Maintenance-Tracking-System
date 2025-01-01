"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { RowSelectionState, SortingState } from "@tanstack/react-table";
import { Dispatch, useEffect, useState } from "react";

interface ComponentProps {
    equipmentArray: Equipment[];
    mRecordsArray: MaintenanceRecord[];
    setSelectedRows: Dispatch<RowSelectionState>;
}

const MaintenanceRecordTable: React.FC<ComponentProps> = ({ equipmentArray, mRecordsArray, setSelectedRows }) => {
    const [data, setData] = useState<MaintenanceRecord[]>(mRecordsArray);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    
    useEffect(() => {
        setSelectedRows(rowSelection);
    }, [rowSelection])

    useEffect(() => {
        setData(mRecordsArray);
    }, [mRecordsArray])

    return (
        <>
        
        </>
    );
}

export default MaintenanceRecordTable;
