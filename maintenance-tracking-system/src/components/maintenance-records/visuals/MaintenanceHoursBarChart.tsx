"use client";

import { Equipment, EquipmentDepartment } from "@/lib/equipment/EquipmentInterface";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface SingleCell {
    name: string;
    hours: number;
}

interface DictCell {
    [key: string]: SingleCell;
}

interface ComponentProps {
    mRecordsArray: MaintenanceRecord[];
    equipmentArray: Equipment[];
}

const MaintenanceHoursBarChart: React.FC<ComponentProps> = ({ mRecordsArray, equipmentArray }) => {
    const [data, setData] = useState<MaintenanceRecord[]>(mRecordsArray);
    const [cellValues, setCellValues] = useState<SingleCell[]>([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        setData(mRecordsArray);
        createCells();
    }, [mRecordsArray])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        createCells();
    }, [equipmentArray])

    function createCells() {
        let preprocessedData: DictCell = {};

        for (let index in EquipmentDepartment) {
            preprocessedData[EquipmentDepartment[index]] = {name: EquipmentDepartment[index], hours: 0};
        }

        for (let index in data) {
            let equipment = equipmentArray.find((equip) => equip.id === data[index].equipmentId);
            preprocessedData[equipment?.department as string].hours += data[index].hoursSpent;
        }

        let newCells = [];

        for (let index in EquipmentDepartment) {
            newCells.push(preprocessedData[EquipmentDepartment[index]]);
        }

        setCellValues(newCells);
    }

    return (
        <div className="bg-white w-fit h-fit">
            <div className="text-center text-2xl font-bold text-black">
                Maintenance Hours by Department
            </div>
            <BarChart
                width={500}
                height={400}
                data={cellValues}
            >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis stroke="#000000" dataKey="name" />
                <YAxis stroke="#000000" />
                <Tooltip labelClassName="text-black"/>
                <Bar
                    dataKey="hours"
                    fill="#8884d8"
                    isAnimationActive={false}
                />
            </BarChart>
        </div>
    );
}

export default MaintenanceHoursBarChart;
