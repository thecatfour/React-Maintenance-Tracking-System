"use client";

import DialogModal from "@/components/generics/visuals/DialogModal";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import MaintenanceRecordFullForm from "../forms/MaintenanceRecordFullForm";
import { Dispatch, useEffect, useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import ConfirmAndCancel from "@/components/generics/buttons/ConfirmAndCancel";

interface ComponentProps {
    className: string;
    equipmentArray: Equipment[];
    allRows: MaintenanceRecord[];
    setRows: Dispatch<MaintenanceRecord[]>;
    selectedRows: RowSelectionState;
}

/**
 * This component renders a button that will open a modal to edit one maintenance record object
 * @param className The className for the button
 * @param allRows The entire array of maintenance record objects
 * @param setRows The state update function for allRows
 * @param equipmentArray The equipment that correspond to the records
 * @param selectedRows The rows that are selected to be updated. There can only be one row selected for this button
 */
const MaintenanceRecordEditButton: React.FC<ComponentProps> = ({ className, equipmentArray, allRows, setRows, selectedRows }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [canOpen, setCanOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<MaintenanceRecord>();

    // If exactly one row is selected, open the edit form.
    // Else, open the warning
    const tryOpeningForm = () => {
        if (canOpen) {
            setIsOpen(true);
        } else {
            setIsWarningOpen(true);
        }
    }

    // Since the edit form can only be opened if a single row is selected,
    // we need to make sure that there is exactly one row selected
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
                className={className}
                onClick={tryOpeningForm}
                data-testid="edit-one-maintenance-record"
            >
                Edit One Record
            </button>

            <DialogModal
                open={isWarningOpen}
                onClose={setIsWarningOpen}
            >
                <div className="flex flex-col gap-2">
                    There must be exactly one row selected for the "Edit One Record" function.
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
                <MaintenanceRecordFullForm
                    allEquipment={equipmentArray}
                    allRows={allRows}
                    setRows={setRows}
                    onClose={setIsOpen}
                    selectedRow={selectedRow}
                />
            </DialogModal>
        </>
    )
}

export default MaintenanceRecordEditButton;
