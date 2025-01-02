import { useFormContext } from "react-hook-form";

interface ComponentProps {
    display: string;
    name: string;
    choices: readonly any[];
}

const InputSelect: React.FC<ComponentProps> = ({ display, name, choices }) => {
    const { register } = useFormContext();
    
    return (
        <div className="flex gap-2">
            <div>
                {display}:
            </div>
            <select
                aria-label={name}
                {...register(name)}
                className="bg-white text-black hover:cursor-pointer"
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
