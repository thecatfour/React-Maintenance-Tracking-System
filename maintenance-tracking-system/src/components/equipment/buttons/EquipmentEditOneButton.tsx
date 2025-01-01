"use client";

import DialogModal from "@/components/generics/visuals/DialogModal";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch, useEffect, useState } from "react";
import EquipmentFullForm from "../forms/EquipmentFullForm";
import ConfirmAndCancel from "@/components/generics/buttons/ConfirmAndCancel";

interface ComponentProps {
    className: string;
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    selectedRows: RowSelectionState;
}

const EquipmentEditOneButton: React.FC<ComponentProps> = ({ className, allRows, setRows, selectedRows }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [canOpen, setCanOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Equipment>();

    const tryOpeningForm = () => {
        if (canOpen) {
            setIsOpen(true);
        } else {
            setIsWarningOpen(true);
        }
    }

    useEffect(() => {
        if (Object.keys(selectedRows).length === 1) {
            setCanOpen(true);
            const selectedId = Object.keys(selectedRows)[0];
            setSelectedRow(allRows.find((row) => row.id === selectedId))
        } else {
            setCanOpen(false);
            setSelectedRow(undefined);
        }
    }, [selectedRows]);
   
    return (
        <>
            <button
                onClick={tryOpeningForm}
                className={className}
                data-testid="edit-one-equipment"
            >
                Edit One Equipment
            </button>

            <DialogModal
                open={isWarningOpen}
                onClose={setIsWarningOpen}
            >
                <div className="flex flex-col gap-2">
                    There must be exactly one row selected for the "Edit One Equipment" function.
                    <ConfirmAndCancel
                        onConfirm={() => setIsWarningOpen(false)}
                        onClose={setIsWarningOpen}
                    />
                </div>
            </DialogModal>

            <DialogModal
                open={isOpen}
                onClose={setIsOpen}
            >
                <EquipmentFullForm
                    allRows={allRows}
                    setRows={setRows}
                    onClose={setIsOpen}
                    selectedRow={selectedRow}
                />
            </DialogModal>
        </>
    );
}

export default EquipmentEditOneButton;
