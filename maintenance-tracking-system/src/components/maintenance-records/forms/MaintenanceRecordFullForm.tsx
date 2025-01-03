import ConfirmAndCancel from "@/components/generics/buttons/ConfirmAndCancel";
import InputCombobox from "@/components/generics/input/InputCombobox";
import InputSelect from "@/components/generics/input/InputSelect";
import InputWithErrorMessage from "@/components/generics/input/InputWithErrorMessage";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord, MaintenanceRecordPriority, MaintenanceRecordStatus, MaintenanceRecordType } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { MaintenanceRecordSchemaType, mRecordSchema } from "@/lib/maintenance-records/MaintenanceRecordValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

interface ComponentProps {
    allEquipment: Equipment[];
    allRows: MaintenanceRecord[];
    setRows: Dispatch<MaintenanceRecord[]>;
    onClose: (value: boolean) => void;
    selectedRow?: MaintenanceRecord;
}

const MaintenanceRecordFullForm: React.FC<ComponentProps> = ({ allEquipment, allRows, setRows, onClose, selectedRow }) => {
    const methods = useForm<MaintenanceRecordSchemaType>({
        resolver: zodResolver(mRecordSchema),
        defaultValues: {
            equipmentId: selectedRow?.equipmentId != null ? allEquipment.find((equipment) => equipment.id === selectedRow?.equipmentId)?.name : undefined,
            date: selectedRow?.date.toISOString().substring(0, 10),
            type: selectedRow?.type,
            technician: selectedRow?.technician,
            hoursSpent: selectedRow?.hoursSpent,
            description: selectedRow?.description,
            partsReplaced: selectedRow?.partsReplaced,
            priority: selectedRow?.priority,
            completionStatus: selectedRow?.completionStatus,
        }
    });

    const { control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "partsReplaced" as never,
    });

    const onSubmit = (data: MaintenanceRecordSchemaType) => {
        // If there was a database, the id would come from it rather than being created here
        const mRecordObject: MaintenanceRecord = {
            id: selectedRow == null ? allRows.length.toString() : selectedRow.id,
            equipmentId: (allEquipment.find(equip => equip.name === data.equipmentId))?.id as string,
            date: new Date(data.date),
            type: data.type,
            technician: data.technician,
            hoursSpent: data.hoursSpent,
            description: data.description,
            partsReplaced: data.partsReplaced?.length === 0 ? undefined : data.partsReplaced,
            priority: data.priority,
            completionStatus: data.completionStatus,
        }

        if (selectedRow == null) {
            // There is no selected row and we just add the new equipment to the array
            setRows([mRecordObject, ...allRows]);
        } else {
            // There is a selected row and we have to change it
            setRows(allRows.map((row) => row.id === mRecordObject.id ? mRecordObject : row));
        }

        onClose(false);
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 w-[70vw] min-w-[500px] max-w-[800px]"
            >
                <div className="text-2xl font-bold">
                    {selectedRow == null ? 
                    (
                        <>Add New Maintenance Record</>
                    ) 
                    : 
                    (
                        <>Edit Maintenance Record {selectedRow.id}</>
                    )}
                </div>

                <InputCombobox
                    placeholder="Equipment"
                    name="equipmentId"
                    allOptions={allEquipment}
                    optionsKey="name"
                />

                <InputWithErrorMessage
                    type="date"
                    placeholder="Date"
                    name="date"
                />

                <div className="flex justify-between mt-2">
                    <InputSelect
                        display="Type"
                        name="type"
                        choices={MaintenanceRecordType}
                    />

                    <InputSelect
                        display="Priority"
                        name="priority"
                        choices={MaintenanceRecordPriority}
                    />

                    <InputSelect
                        display="Status"
                        name="completionStatus"
                        choices={MaintenanceRecordStatus}
                    />
                </div>

                <InputWithErrorMessage
                    type="text"
                    placeholder="Technician"
                    name="technician"
                />

                <InputWithErrorMessage
                    type="number"
                    placeholder="Hours Spent"
                    name="hoursSpent"
                />

                <div className="flex flex-col gap-2 w-full">
                    <div>
                        Parts Replaced (Optional)
                    </div>
                    {fields?.length > 0 &&
                    <div className="flex flex-col gap-2 w-full mt-[-5px]">
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex gap-2">
                                {methods.formState.errors?.partsReplaced?.[index] != null &&
                                    <div className="text-red-400 min-w-fit">
                                        {`${methods.formState.errors?.partsReplaced?.[index].message}`}
                                    </div>
                                } 
                                <input
                                    key={item.id}
                                    aria-label={`partsReplaced-${index}`}
                                    {...methods.register(`partsReplaced.${index}`, {required: false})}
                                    className="pl-1 text-black w-full"
                                    placeholder="Enter Part Replaced..."
                                />
                                <button 
                                    type="button"
                                    data-testid={`partsReplaced-${index}-delete`}
                                    onClick={() => remove(index)}
                                    className="bg-red-800 hover:bg-red-800/75 px-1 rounded-lg w-fit"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    }
                    <div>
                        <button
                            type="button"
                            data-testid="partsReplaced-add"
                            onClick={() =>{
                                append("");
                            }}
                            className="bg-green-800 hover:bg-green-800/75 px-1 rounded-lg"
                        >
                            Add New Part
                        </button>
                    </div>
                </div>

                <InputWithErrorMessage
                    type="text"
                    placeholder="Description"
                    name="description"
                />

                <ConfirmAndCancel
                    onConfirm={methods.handleSubmit(onSubmit)}
                    onClose={onClose}
                />
            </form>
        </FormProvider>
    )
}

export default MaintenanceRecordFullForm;
