"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { useState } from "react";
import EquipmentTable from "./EquipmentTable";
import { RowSelectionState } from "@tanstack/react-table";
import EquipmentStatusForm from "../forms/EquipmentStatusForm";

interface ComponentProps {
    initialData: Equipment[];
}

const EquipmentTableManager: React.FC<ComponentProps> = ({ initialData }) => {
    const [data, setData] = useState<Equipment[]>(initialData);
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

    return (
        <div>
            <EquipmentStatusForm
                allRows={data}
                setRows={setData}
                selectedRows={selectedRows}
            />
            <EquipmentTable
                equipmentArray={data}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );
}

export default EquipmentTableManager;
