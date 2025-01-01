"use client";

import { Radio, RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";

const options = [
    {name: "Dashboard", description: "View various important information."},
    {name: "Equipment", description: "View and change equipment."},
    {name: "Maintenance Records", description: "View and change maintenance records."},
];

interface ComponentProps {
    clickEquipment: () => void;
    clickMRecords: () => void;
    clickDashboard: () => void;
}

const Navbar: React.FC<ComponentProps> = ({ clickEquipment, clickMRecords, clickDashboard }) => {
    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        switch(selected.name) {
            case "Dashboard":
                clickDashboard();
                break;
            case "Equipment":
                clickEquipment();
                break;
            case "Maintenance Records":
                clickMRecords();
                break;
            default:
                alert("Unknown click for navbar.");
        }
    }, [selected])
    
    return (
        <div className="flex">
            <RadioGroup 
                value={selected} 
                onChange={setSelected} 
                data-testid="navbar" 
                className="fixed flex flex-cols p-2 gap-2.5 h-[60px] w-full bg-gray-500"
            >
                {options.map((option) => (
                    <Radio
                        data-testid={`navbar-${option.name}`}
                        key={option.name}
                        value={option}
                        className="cursor-pointer rounded-lg bg-stone-800 py-2 px-2 text-white transition data-[checked]:bg-stone-600"
                    >
                    <span className="flex" title={option.description}>
                        <p className="font-bold text-white text-lg">
                            {option.name}
                        </p>
                    </span>
                    </Radio>
                ))}
            </RadioGroup>
            <div className="mt-[60px]"/>
        </div>
    );
}

export default Navbar;
