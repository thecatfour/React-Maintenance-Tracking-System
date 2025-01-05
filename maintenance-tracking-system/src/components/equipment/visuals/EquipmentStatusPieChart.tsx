import { Equipment, EquipmentStatus } from "@/lib/equipment/EquipmentInterface";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

interface SingleCell {
    name: string;
    value: number;
}

interface DictCell {
    [key: string]: SingleCell;
}

interface DictFormat {
    [key: string]: string
}

interface ComponentProps {
    equipmentArray: Equipment[];
}

const EquipmentStatusPieColors: DictFormat = {
    "Operational":  "#1b700a",
    "Down":         "#b33212",
    "Maintenance":  "#b58107",
    "Retired":      "#848a87",
} as const;

const EquipmentStatusPieChart: React.FC<ComponentProps> = ({ equipmentArray }) => {
    const [data, setData] = useState(equipmentArray);
    const [cellValues, setCellValues] = useState<SingleCell[]>([]);
    
    useEffect(() => {
        setData(equipmentArray);
        createCells();
    }, [data])

    function createCells() {
        let preprocessedData: DictCell = {};

        for (let index in EquipmentStatus) {
            preprocessedData[EquipmentStatus[index]] = {name: EquipmentStatus[index], value: 0};
        }
        
        for (let index in data) {
            preprocessedData[data[index].status as string].value += 1;
        }

        let newCells = [];

        for (let index in EquipmentStatus) {
            newCells.push(preprocessedData[EquipmentStatus[index]]);
        }

        setCellValues(newCells);
    }

    return (
        <div className="bg-white w-fit h-fit">
            <div className="text-center text-2xl font-bold text-black">
                Equipment Status
            </div>
            <PieChart
                width={500}
                height={400}
            >
                <Pie
                    data={cellValues}
                    dataKey="value"
                    isAnimationActive={false}
                    label
                >
                    {cellValues.map((cell) => (
                        <Cell
                            key={`cell-${cell.name}`}
                            fill={EquipmentStatusPieColors?.[cell.name]}
                        >
                            {cell.name}
                        </Cell>
                    ))}
                </Pie>
                <Legend
                    layout="vertical"
                    align="left"
                    payload={
                        cellValues.map(
                            (cell) => ({
                                id: cell.name,
                                type: "square",
                                value: `${cell.name} - ${cell.value}`,
                                color: EquipmentStatusPieColors?.[cell.name],
                            })
                        )
                    }
                />
            </PieChart>
        </div>
    );
}

export default EquipmentStatusPieChart;
