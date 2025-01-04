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

const MaintenanceRecordEditButton: React.FC<ComponentProps> = ({ className, equipmentArray, allRows, setRows, selectedRows }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [canOpen, setCanOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<MaintenanceRecord>();

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
