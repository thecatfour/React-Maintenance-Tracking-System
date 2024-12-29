"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { useState } from "react";
import EquipmentTable from "./EquipmentTable";
import { RowSelectionState } from "@tanstack/react-table";
import BulkStatusUpdateButton from "../buttons/BulkStatusUpdateButton";

interface ComponentProps {
    initialData: Equipment[];
}

const EquipmentTableManager: React.FC<ComponentProps> = ({ initialData }) => {
    const [data, setData] = useState<Equipment[]>(initialData);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    return (
        <div className="flex flex-col p-2 gap-2">
            <div>
                <BulkStatusUpdateButton
                    className="bg-white/50 p-1 rounded-lg"
                    allRows={data}
                    setRows={setData}
                    selectedRows={selectedRows}
                /> 
            </div>
            
            <EquipmentTable
                equipmentArray={data}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );
}

export default EquipmentTableManager;
