import { Equipment } from "../equipment/EquipmentInterface";
import { MaintenanceRecord, MaintenanceRecordPriority, MaintenanceRecordStatus, MaintenanceRecordType } from "./MaintenanceRecordInterface";

const TECHNICIANS = [
    "James",
    "Emma",
    "Oliver",
    "Sophia",
    "Liam",
    "Ava",
    "Benjamin",
    "Mia",
    "Ethan",
    "Charlotte"
];

const DESCRIPTIONS = [
    "Inspect components for wear and tear",
    "Lubricate moving parts",
    "Check and replace filters",
    "Tighten loose bolts and screws",
    "Test electrical connections",
    "Calibrate sensors and gauges",
    "Clean the machine thoroughly",
    "Examine belts for damage",
    "Inspect and replace hoses",
    "Check for unusual noises",
    "Verify fluid levels and refill if necessary",
    "Inspect safety features for functionality",
    "Test the emergency stop system",
    "Monitor system temperature",
    "Replace worn-out bearings",
    "Examine gear assemblies for alignment",
    "Inspect seals for leaks",
    "Check for proper power supply voltage",
    "Update software or firmware if applicable",
    "Document all maintenance activities"
];

const PARTS = [
    "Small gears",
    "Medium gears",
    "Large gears",
    "Rotary arm",
    "Small screws",
    "Medium screws",
    "Large screws",
    "Bearings",
    "Belts",
    "Hoses",
    "Seals",
    "Filters",
    "Gaskets",
    "Bolts",
    "Screws",
    "O-Rings",
    "Springs",
    "Fuses",
    "Gear teeth",
    "Chains",
    "Pulleys",
    "Hydraulic cylinders",
    "Valves",
    "Cooling fans",
    "Clutches",
    "Circuit boards",
    "Wires",
];
  
export default function createRandomMaintenanceRecords(amount: number, equipmentArray: Equipment[]) {
    let mRecordArray: MaintenanceRecord[] = [];
    const today = new Date();

    for (let i = 0; i < amount; i++) {
        const theEquipment = getRandomInt(equipmentArray.length);

        const newMRecord: MaintenanceRecord = {
            id: i.toString(),
            equipmentId: theEquipment.toString(),
            date: getRecordDate(today, equipmentArray[theEquipment].installDate),
            type: getRandomSelect(MaintenanceRecordType) as MaintenanceRecord["type"],
            technician: TECHNICIANS[getRandomInt(TECHNICIANS.length)],
            hoursSpent: getRandomInt(25),
            description: DESCRIPTIONS[getRandomInt(DESCRIPTIONS.length)],
            partsReplaced: getParts(),
            priority: getRandomSelect(MaintenanceRecordPriority) as MaintenanceRecord["priority"],
            completionStatus: getRandomSelect(MaintenanceRecordStatus) as MaintenanceRecord["completionStatus"],
        }

        mRecordArray.push(newMRecord);
    }

    return mRecordArray;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getRecordDate(today: Date, equipmentDate: Date) {
    const start = equipmentDate.getTime();
    const end = today.getTime();

    return new Date(Math.floor(Math.random() * (end - start) + start));
}

function getRandomSelect(choices: readonly string[]) {
    return choices[getRandomInt(choices.length)];
}

function getParts() {
    const parts = getRandomInt(3);

    if (parts === 0) {
        return undefined;
    }

    let allParts: string[] = [];

    for (let i = 0; i < parts; i++) {
        allParts.push(PARTS[getRandomInt(PARTS.length)]);
    }

    return allParts;
}
