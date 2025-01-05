import { useFormContext } from "react-hook-form";

interface ComponentProps {
    type: string;
    placeholder: string;
    name: string;
}

/**
 * This input component can render different types of input as well as displaying
 * any error messages from the form
 * @param type The type of input such as date or number
 * @param placeholder The placeholder of the input component
 * @param name The name used to register the input to the form
 */
const InputWithErrorMessage: React.FC<ComponentProps> = ({ type, placeholder, name }) => {
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <div>
            <div className="flex justify-between">
                {placeholder}
                {errors?.[name] != null &&
                    <p className="text-red-400">
                        {`${errors?.[name]?.message}`}
                    </p>
                }    
            </div>

            <input
                aria-label={name}
                type={type}
                {...register(name)}
                placeholder={`Enter ${placeholder}...`}
                className="bg-white text-black w-full pl-1"
            />
        </div>
    );
}

export default InputWithErrorMessage;
