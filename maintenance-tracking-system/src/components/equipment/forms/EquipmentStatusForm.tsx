"use client";

import { Equipment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface"
import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";

interface ComponentProps {
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    selectedRows: RowSelectionState;
}

const EquipmentStatusForm: React.FC<ComponentProps> = ({ allRows, setRows, selectedRows }) => {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (data: any) => {
        const rows = new Set<string>();

        for (let row in selectedRows) {
            rows.add(row);
        }

        // Would also make an API call to update the equipment in the rows set.
        setRows(allRows.map(a => (rows.has(a.id) ? {...a, status: data.status} : a)));
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <label>Updated Status: </label>
            <select
                {...register("status")}
                className="bg-white text-black"
            >
                {EquipmentStatus.map((option) => (
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>

            <button type="submit">
                Confirm
            </button>

        </form>
    );
}

export default EquipmentStatusForm;
