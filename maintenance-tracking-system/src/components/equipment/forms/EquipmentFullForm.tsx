import InputWithErrorMessage from "@/components/generics/input/InputWithErrorMessage";
import { Equipment, EquipmentDepartment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ConfirmAndCancel from "@/components/generics/buttons/ConfirmAndCancel";
import InputSelect from "@/components/generics/input/InputSelect";
import { equipmentSchema, EquipmentSchemaType } from "@/lib/equipment/EquipmentValidation";

interface ComponentProps {
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    onClose: (value: boolean) => void;
    selectedRow?: Equipment;
}

const EquipmentFullForm: React.FC<ComponentProps> = ({ allRows, setRows, onClose, selectedRow }) => {
    const methods = useForm<EquipmentSchemaType>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: {
            name: selectedRow?.name,
            location: selectedRow?.location,
            department: selectedRow?.department,
            model: selectedRow?.model,
            serialNumber: selectedRow?.serialNumber,
            installDate: selectedRow?.installDate.toISOString().slice(0, 10),
            status: selectedRow?.status,
        },
    });

    const onSubmit = (data: EquipmentSchemaType) => {
        // If there was a database, the id would come from it rather than being created here
        const equipmentObject: Equipment = {
            id: selectedRow == null ? allRows.length.toString() : selectedRow.id,
            name: data.name,
            location: data.location,
            department: data.department,
            model: data.model,
            serialNumber: data.serialNumber,
            installDate: new Date(data.installDate),
            status: data.status,
        };

        if (selectedRow == null) {
            // There is no selected row and we just add the new equipment to the array
            setRows([equipmentObject, ...allRows]);
        } else {
            // There is a selected row and we have to change it
            setRows(allRows.map((row) => row.id === equipmentObject.id ? equipmentObject : row))
        }

        onClose(false);
    }
    
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 w-[50vw] min-w-[400px] max-w-[600px]"
            >
                <div className="text-2xl font-bold">
                    {selectedRow == null ? 
                    (
                        <>Add New Equipment</>
                    ) 
                    : 
                    (
                        <>Edit Equipment {selectedRow.id}</>
                    )}
                </div>

                <InputWithErrorMessage
                    type="text"
                    placeholder="Name"
                    name="name"
                />

                <InputWithErrorMessage
                    type="text"
                    placeholder="Location"
                    name="location"
                />

                <div className="flex justify-between mt-2">
                    <InputSelect
                        label="Department"
                        name="department"
                        choices={EquipmentDepartment}
                    />

                    <InputSelect
                        label="Status"
                        name="status"
                        choices={EquipmentStatus}
                    />
                </div>
                
                <InputWithErrorMessage
                    type="text"
                    placeholder="Model"
                    name="model"
                />

                <InputWithErrorMessage
                    type="text"
                    placeholder="Serial Number"
                    name="serialNumber"
                />

                <InputWithErrorMessage
                    type="date"
                    placeholder="Date"
                    name="installDate"
                />

                <ConfirmAndCancel
                    onConfirm={methods.handleSubmit(onSubmit)}
                    onClose={onClose}
                />
            </form>
        </FormProvider>
    );
}

export default EquipmentFullForm;
