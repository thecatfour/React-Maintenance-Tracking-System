"use client";

import { Equipment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface"
import { RowSelectionState } from "@tanstack/react-table";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";

interface ComponentProps {
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    onClose: (value: boolean) => void;
    selectedRows: RowSelectionState;
}

const EquipmentStatusForm: React.FC<ComponentProps> = ({ allRows, setRows, selectedRows, onClose }) => {
    const { register, handleSubmit } = useForm();

    const onCancel = (event: any) => {
        event.preventDefault();
        onClose(false);
    }
    
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5"
        >
            <div className="text-2xl font-bold">
                Update Equipment Status
            </div>

            <div className="flex gap-2">
                <label>
                    Updated Status: 
                </label>
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
            </div>

            <div>
                This will change {Object.keys(selectedRows).length} row/s.
            </div>
            
            <div className="flex justify-between">
                <button type="submit" className="bg-green-700 hover:bg-green-700/70 px-1 py-0.5 rounded-lg">
                    Confirm
                </button>
                <button onClick={onCancel} className="bg-red-700 hover:bg-red-700/70 px-1 py-0.5 rounded-lg">
                    Cancel
                </button>
            </div>  
        </form>
    );
}

export default EquipmentStatusForm;
