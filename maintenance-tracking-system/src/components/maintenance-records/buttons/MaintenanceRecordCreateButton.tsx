"use client";

import DialogModal from "@/components/generics/visuals/DialogModal";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import MaintenanceRecordFullForm from "../forms/MaintenanceRecordFullForm";
import { Dispatch, useState } from "react";

interface ComponentProps {
    className: string;
    equipmentArray: Equipment[];
    allRows: MaintenanceRecord[];
    setRows: Dispatch<MaintenanceRecord[]>;
}

const MaintenanceRecordCreateButton: React.FC<ComponentProps> = ({ className, equipmentArray, allRows, setRows }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className={className}
                onClick={() => setIsOpen(true)}
                data-testid="add-one-maintenance-record"
            >
                Add Record
            </button>

            <DialogModal
                open={isOpen}
                onClose={setIsOpen}
            >
                <MaintenanceRecordFullForm
                    allEquipment={equipmentArray}
                    allRows={allRows}
                    setRows={setRows}
                    onClose={setIsOpen}
                />
            </DialogModal>
        </>
    )
}

export default MaintenanceRecordCreateButton;
