"use client";

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface ComponentProps {
    allOptions: any[];
    optionsKey: string;
    placeholder: string;
    name: string;
}

const InputCombobox: React.FC<ComponentProps> = ({ allOptions, placeholder, name, optionsKey }) => {
    const { register, setValue, formState: { errors, defaultValues } } = useFormContext();
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

    const query = useWatch({ name: name });

    // On mount, explicitly change the value to the default value specified
    useEffect(() => {
        if (defaultValues?.[name] != null) {
            setValue(name, defaultValues?.[name]);
        }
    }, [])

    // Change the options based on the query inputted in the input box
    useEffect(() => {
        if (query == null) {
            setFilteredOptions(allOptions);
        } else {
            setFilteredOptions(allOptions.filter((option) => option?.[optionsKey].toLowerCase().includes(query.toLowerCase())));
        }
    }, [query])

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

            <Combobox>
                <div className="relative">
                    <ComboboxInput
                        className="w-full pl-1 pr-8 text-black"
                        aria-label={name}
                        placeholder={`Enter ${placeholder}...`}
                        {...register(name)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 text-black">
                        v
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className="w-[var(--input-width)] bg-white empty:invisible"
                >
                    {filteredOptions.map((option) => (
                        <ComboboxOption
                            key={option?.[optionsKey]}
                            value={option?.[optionsKey]}
                            data-testid={option?.[optionsKey]}
                            className="group flex cursor-default pl-1 py-1 items-center select-none data-[focus]:bg-zinc-500"
                        >
                            <div className="text-black">{option?.[optionsKey]}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}

export default InputCombobox;
