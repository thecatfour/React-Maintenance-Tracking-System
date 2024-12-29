import InputWithErrorMessage from "@/components/generics/input/InputWithErrorMessage";
import { Equipment, EquipmentDepartment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const equipmentSchema = z.object({
    name: z.string()
        .min(1, {message: "Name is required"})
        .min(3, {message: "Name must be 3 or more characters"})
        .refine(s => s.trim().length >= 3, {message: "Name length cannot be filled by trailing whitespace"}),
    location: z.string()
        .refine(s => s.trim().length >= 1, {message: "Location is required"}),
    department: z.enum(EquipmentDepartment),
    model: z.string()
        .refine(s => s.trim().length >= 1, {message: "Model is required"}),
    serialNumber: z.string()
        .refine(s => s.trim().length >= 1, {message: "Serial Number is required"})  
        .refine(s => /^[a-zA-Z0-9]+$/.test(s), {message: "Serial Number must be alphanumeric"}),
    installDate: z.string().date()
        .refine(s => s <= new Date().toISOString().substring(0, 10), {message: "Install Date cannot be a day in the future"}),
    status: z.enum(EquipmentStatus),
});

type EquipmentForm = z.infer<typeof equipmentSchema>;

interface ComponentProps {
    allRows: Equipment[];
    setRows: Dispatch<Equipment[]>;
    onClose: (value: boolean) => void;
}

const EquipmentCreateForm: React.FC<ComponentProps> = ({ allRows, setRows, onClose }) => {
    const methods = useForm<EquipmentForm>({
        resolver: zodResolver(equipmentSchema),
    });
    
    const onSubmit = (data: EquipmentForm) => {
        // If there was a database, the id would come from it rather than being created here
        const newEquipment: Equipment = {
            id: (allRows.length + 1).toString(),
            name: data.name,
            location: data.location,
            department: data.department,
            model: data.model,
            serialNumber: data.serialNumber,
            installDate: new Date(data.installDate),
            status: data.status,
        };

        setRows([newEquipment, ...allRows]);
    }
    
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="text-2xl font-bold">
                    Add New Equipment
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

                <div className="flex gap-2">
                    <label>
                        Department: 
                    </label>
                    <select
                        {...methods.register("department")}
                        className="bg-white text-black"
                    >
                        {EquipmentDepartment.map((option) => (
                            <option key={option}>
                                {option}
                            </option>
                        ))}
                    </select>
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

                <div className="flex gap-2">
                    <label>
                        Status: 
                    </label>
                    <select
                        {...methods.register("status")}
                        className="bg-white text-black"
                    >
                        {EquipmentStatus.map((option) => (
                            <option key={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">
                    Confirm
                </button>
            </form>
        </FormProvider>
    );
}

export default EquipmentCreateForm;
