"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { useState } from "react";
import EquipmentTable from "./EquipmentTable";
import { RowSelectionState } from "@tanstack/react-table";
import EquipmentStatusUpdateButton from "@/components/equipment/buttons/EquipmentStatusUpdateButton";
import EquipmentCreateForm from "../forms/EquipmentCreateForm";

interface ComponentProps {
    initialData: Equipment[];
}

const EquipmentTableManager: React.FC<ComponentProps> = ({ initialData }) => {
    const [data, setData] = useState<Equipment[]>(initialData);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    return (
        <div className="flex flex-col p-2 gap-2">
            <div>
                <EquipmentStatusUpdateButton
                    className="bg-white/50 p-1 rounded-lg"
                    allRows={data}
                    setRows={setData}
                    selectedRows={selectedRows}
                /> 
            </div>

            <EquipmentCreateForm
                allRows={data}
                setRows={setData}
                onClose={null}
            />
            
            <EquipmentTable
                equipmentArray={data}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );
}

export default EquipmentTableManager;
