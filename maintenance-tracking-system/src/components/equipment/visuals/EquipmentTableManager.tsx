"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { Dispatch, useState } from "react";
import EquipmentTable from "./EquipmentTable";
import { RowSelectionState } from "@tanstack/react-table";
import EquipmentStatusUpdateButton from "@/components/equipment/buttons/EquipmentStatusUpdateButton";
import EquipmentCreateButton from "@/components/equipment/buttons/EquipmentCreateButton";
import EquipmentEditOneButton from "../buttons/EquipmentEditOneButton";

interface ComponentProps {
    data: Equipment[];
    setData: Dispatch<Equipment[]>;
}

const EquipmentTableManager: React.FC<ComponentProps> = ({ data, setData }) => {
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 mt-2 ml-2">
                <EquipmentStatusUpdateButton
                    className="bg-zinc-600 hover:bg-zinc-500 p-1 rounded-lg"
                    allRows={data}
                    setRows={setData}
                    selectedRows={selectedRows}
                />

                <EquipmentCreateButton
                    className="bg-zinc-600 hover:bg-zinc-500 p-1 rounded-lg"
                    allRows={data}
                    setRows={setData}
                />

                <EquipmentEditOneButton
                    className="bg-zinc-600 hover:bg-zinc-500 p-1 rounded-lg"
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
