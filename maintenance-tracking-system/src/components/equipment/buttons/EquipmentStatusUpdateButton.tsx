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

const BulkStatusUpdateButton: React.FC<ComponentProps> = ({ className, allRows, setRows, selectedRows }) => {
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

export default BulkStatusUpdateButton;
