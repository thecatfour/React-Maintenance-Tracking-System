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

/**
 * This component renders a button that will open a modal to create a maintenance record object
 * @param className The className for the button
 * @param allRows The entire array of maintenance record objects
 * @param setRows The state update function for allRows
 * @param equipmentArray The equipment that correspond to the records
 */
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
