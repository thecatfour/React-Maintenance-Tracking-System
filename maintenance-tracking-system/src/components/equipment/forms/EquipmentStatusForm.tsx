"use client";

import ConfirmAndCancel from "@/components/generics/buttons/ConfirmAndCancel";
import InputSelect from "@/components/generics/input/InputSelect";
import { Equipment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface"
import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ComponentProps {
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    onClose: (value: boolean) => void;
    selectedRows: RowSelectionState;
}

/**
 * This form changes the status of all selected rows.
 * @param allRows The entire array of equipment objects
 * @param setRows The state update function for allRows. This is used to add the updated equipment to the array
 * @param onClose The function that should be executed when the form is submitted or canceled
 * @param selectedRows The equipment objects that are being edited
 */
const EquipmentStatusForm: React.FC<ComponentProps> = ({ allRows, setRows, selectedRows, onClose }) => {
    const methods = useForm();

    const onSubmit = (data: any) => {
        const rows = new Set<string>();

        for (let row in selectedRows) {
            rows.add(row);
        }

        // Would also make an API call to update the equipment in the rows set.
        setRows(allRows.map(a => (rows.has(a.id) ? {...a, status: data.status} : a)));

        onClose(false);
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-2.5"
            >
                <div className="text-2xl font-bold">
                    Update Equipment Status
                </div>

                <InputSelect
                    display="Status"
                    name="status"
                    choices={EquipmentStatus}
                />

                <div>
                    This will change {Object.keys(selectedRows).length} row/s.
                </div>
                
                <ConfirmAndCancel
                    onConfirm={methods.handleSubmit(onSubmit)}
                    onClose={onClose}
                />
            </form>
        </FormProvider>
    );
}

export default EquipmentStatusForm;
