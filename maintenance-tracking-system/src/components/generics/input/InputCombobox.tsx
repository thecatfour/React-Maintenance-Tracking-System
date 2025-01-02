import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface ComponentProps {
    allOptions: any[];
    display: string;
    name: string;
}

const InputCombobox: React.FC<ComponentProps> = ({ allOptions, display, name }) => {
    const { register, formState: { errors } } = useFormContext();

    const query = useWatch({ name: name });

    const filteredOptions =
        query == null
        ? allOptions
        : allOptions.filter((option) => {
            return option.name.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <div>
            <div className="flex justify-between">
                {display}
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
                        placeholder={`Enter ${display}...`}
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
                            key={option.name}
                            value={option.name}
                            className="group flex cursor-default pl-1 py-1 items-center select-none data-[focus]:bg-zinc-500"
                        >
                            <div className="text-black">{option.name}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}

export default InputCombobox;
