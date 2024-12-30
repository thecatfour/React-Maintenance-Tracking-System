"use client";

import DialogModal from "@/components/generics/visuals/DialogModal";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { Dispatch, useState } from "react";
import EquipmentFullForm from "@/components/equipment/forms/EquipmentFullForm";

interface ComponentProps {
    className: string;
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
}

const EquipmentCreateButton: React.FC<ComponentProps> = ({ className, allRows, setRows }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <button
                className={className}
                onClick={() => setIsOpen(true)}
            >
                Add Equipment
            </button>

            <DialogModal
                open={isOpen}
                onClose={setIsOpen}
            >
                <EquipmentFullForm
                    allRows={allRows}
                    setRows={setRows}
                    onClose={setIsOpen}
                />
            </DialogModal>
        </>
    );
}

export default EquipmentCreateButton;
