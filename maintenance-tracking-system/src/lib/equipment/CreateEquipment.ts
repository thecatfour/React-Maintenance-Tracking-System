import { Equipment, EquipmentDepartment, EquipmentStatus } from "./EquipmentInterface";

let names = [
    { name: "Mechanical Arm", quantity: 0 },
    { name: "Hydraulic Piston", quantity: 0 },
    { name: "Servo Motor", quantity: 0 },
    { name: "Gear Assembly", quantity: 0 },
    { name: "Rotary Encoder", quantity: 0 },
    { name: "Control Panel", quantity: 0 },
    { name: "Conveyor Belt", quantity: 0 },
    { name: "Circuit Board", quantity: 0 },
    { name: "Cooling Fan", quantity: 0 },
    { name: "Pressure Valve", quantity: 0 },
    { name: "Electric Pump", quantity: 0 },
    { name: "Laser Cutter", quantity: 0 },
    { name: "Welding Torch", quantity: 0 },
    { name: "Power Supply Unit", quantity: 0 },
    { name: "Linear Actuator", quantity: 0 },
    { name: "Stepper Motor", quantity: 0 },
    { name: "Ball Bearing", quantity: 0 },
    { name: "Pulley System", quantity: 0 },
    { name: "Transmission Shaft", quantity: 0 },
    { name: "Optical Sensor", quantity: 0 },
    { name: "Pneumatic Cylinder", quantity: 0 },
    { name: "Industrial Spring", quantity: 0 },
    { name: "Hydraulic Pump", quantity: 0 },
    { name: "Magnetic Sensor", quantity: 0 },
    { name: "Control Switch", quantity: 0 },
    { name: "Temperature Gauge", quantity: 0 },
    { name: "Tension Spring", quantity: 0 },
    { name: "Bearing Block", quantity: 0 },
    { name: "Drive Belt", quantity: 0 },
    { name: "Torque Wrench", quantity: 0 },
    { name: "Power Converter", quantity: 0 },
    { name: "Laser Sensor", quantity: 0 },
    { name: "Oil Cooler", quantity: 0 },
    { name: "Gas Regulator", quantity: 0 },
    { name: "Pressure Sensor", quantity: 0 },
    { name: "Exhaust Fan", quantity: 0 },
    { name: "Voltage Regulator", quantity: 0 },
    { name: "Robot Movement Sensor", quantity: 0 },
    { name: "Fuel Injector", quantity: 0 },
    { name: "Rotary Valve", quantity: 0 },
    { name: "Clutch Plate", quantity: 0 },
    { name: "Chain Drive", quantity: 0 },
    { name: "Flow Meter", quantity: 0 },
    { name: "Vacuum Pump", quantity: 0 },
    { name: "Inverter Module", quantity: 0 },
    { name: "Electric Relay", quantity: 0 },
    { name: "Thermal Sensor", quantity: 0 },
    { name: "Friction Disc", quantity: 0 },
    { name: "Roller Bearing", quantity: 0 },
    { name: "Dynamic Seal", quantity: 0 },
];

const MODELS = [
    "Mk ",
    "v",
    "V-",
    "p.",
    "mod ",
]

/**
 * Function to create an array of equipment objects
 * @param amount The amount of objects to create
 * @returns Equipment[] 
 */
export default function createRandomEquipment(amount: number) {
    let equipmentArray: Equipment[] = [];
    const today = new Date();

    for (let i = 0; i < amount; i++) {
        const newEquipment: Equipment = {
            id: i.toString(),
            name: getRandomName(),
            location: getRandomLocation(),
            department: getRandomSelect(EquipmentDepartment) as Equipment["department"],
            model: getRandomModel(),
            serialNumber: getRandomSerialNumber(),
            installDate: getInstallDate(today),
            status: getRandomSelect(EquipmentStatus) as Equipment["status"],
        };

        equipmentArray.push(newEquipment);
    }

    return equipmentArray;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function getRandomName() {
    const rand = getRandomInt(names.length);
    names[rand].quantity += 1;
    return names[rand].name + ' ' + names[rand].quantity.toString();
}

function getRandomLocation() {
    return "Site " + getRandomInt(10).toString();
}

function getRandomSelect(choices: readonly string[]) {
    return choices[getRandomInt(choices.length)];
}

function getRandomModel() {
    return MODELS[getRandomInt(MODELS.length)] + getRandomInt(9).toString();
}

function getRandomSerialNumber() {
    return getRandomInt(10000000).toString(36)
}

function getInstallDate(today: Date) {
    let returnDate = new Date();
    returnDate.setDate(today.getDate() - getRandomInt(30) - 1);
    return returnDate;
}
