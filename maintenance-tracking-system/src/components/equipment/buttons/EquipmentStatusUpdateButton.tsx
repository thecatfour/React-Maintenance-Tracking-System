"use client";

import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch, useState } from "react";
import EquipmentStatusForm from "../forms/EquipmentStatusForm";
import DialogModal from "@/components/generics/visuals/DialogModal";

interface ComponentProps {
    className: string;
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    selectedRows: RowSelectionState;
}

/**
 * This component renders a button that will open a modal to edit the status of multiple equipment objects
 * @param className The className for the button
 * @param allRows The entire array of equipment objects
 * @param setRows The state update function for allRows
 * @param selectedRows The rows that are selected to be updated. There can be any amount selected
 */
const EquipmentStatusUpdateButton: React.FC<ComponentProps> = ({ className, allRows, setRows, selectedRows }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={className}
            >
                Update Status
            </button>

            <DialogModal
                open={isOpen}
                onClose={setIsOpen}
            >
                <EquipmentStatusForm
                    allRows={allRows}
                    setRows={setRows}
                    selectedRows={selectedRows}
                    onClose={setIsOpen}
                />
            </DialogModal>
        </>
    );
}

export default EquipmentStatusUpdateButton;
