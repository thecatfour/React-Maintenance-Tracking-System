import { useFormContext } from "react-hook-form";

interface ComponentProps {
    label: string;
    name: string;
    choices: readonly any[];
}

const InputSelect: React.FC<ComponentProps> = ({ label, name, choices }) => {
    const { register } = useFormContext();
    
    return (
        <div className="flex gap-2">
            <label>
                {label}:
            </label>
            <select
                {...register(name)}
                className="bg-white text-black"
            >
                {choices.map((option) => (
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputSelect;
