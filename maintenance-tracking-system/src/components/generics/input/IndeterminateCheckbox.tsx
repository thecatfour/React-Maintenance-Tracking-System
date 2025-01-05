import { HTMLProps, useEffect, useRef } from "react";

interface ComponentProps {
    indeterminate?: boolean;
    className?: string;
    rest?: HTMLProps<HTMLInputElement>;
}

/**
 * A checkbox to work with the table components
 * @param indeterminate Determine if the checkbox can display an indeterminate status
 * @param className Determines the className of the input
 * @param rest The HTML input elements for the checkbox
 */
const IndeterminateCheckbox: React.FC<ComponentProps> = ({ indeterminate, className = '', rest }) => {
    const ref = useRef<HTMLInputElement>(null!);

    // If indeterminant is true, then the checkbox can be indeterminant
    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest?.checked && indeterminate;
        }
    }, [ref, indeterminate])
    
    return (
        <div className="flex justify-center">
            <input
                type="checkbox"
                ref={ref}
                className={className + " cursor-pointer"}
                {...rest}
            /> 
        </div>
    );
}

export default IndeterminateCheckbox;
