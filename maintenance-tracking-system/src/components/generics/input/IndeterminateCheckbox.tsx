import { HTMLProps, useEffect, useRef } from "react";

interface ComponentProps {
    indeterminate?: boolean;
    className?: string;
    rest?: HTMLProps<HTMLInputElement>;
}

const IndeterminateCheckbox: React.FC<ComponentProps> = ({ indeterminate, className = '', rest }) => {
    const ref = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest?.checked && indeterminate;
        }
    }, [ref, indeterminate])
    
    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}

export default IndeterminateCheckbox;
