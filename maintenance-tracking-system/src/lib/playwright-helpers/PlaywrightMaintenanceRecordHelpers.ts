import { Page, expect } from "@playwright/test";
import { MaintenanceRecord } from "@/lib/maintenance-records/MaintenanceRecordInterface";

// The ids should not be used as they are not passed by the user to any forms.
export const PLAYWRIGHT_MAINTENANCE_RECORD: MaintenanceRecord[] = [
    {
        id: "0",
        equipmentId: "0",
        date: new Date("2024-12-29"),
        type: "Repair",
        technician: "Allen",
        hoursSpent: 2,
        description: "Repair on packing arm 2.",
        priority: "Medium",
        partsReplaced: ["Gears 1, 2"],
        completionStatus: "Incomplete",
    },
    {
        id: "1",
        equipmentId: "1",
        date: new Date("2024-12-31"),
        type: "Repair",
        technician: "Joe",
        hoursSpent: 2,
        description: "Check on welding arm 3.",
        priority: "Low",
        partsReplaced: undefined,
        completionStatus: "Incomplete",
    },
]

export async function checkMaintenanceRecordRow(page: Page, rowNum: number, record: MaintenanceRecord, equipmentName: string) {
    const row = page.getByTestId("maintenance-record-row").nth(rowNum);

    await expect(row.getByTestId("equipmentName")).toHaveText(equipmentName);
    await expect(row.getByTestId("type")).toHaveText(record.type);
    await expect(row.getByTestId("technician")).toHaveText(record.technician);
    await expect(row.getByTestId("hoursSpent")).toHaveText(record.hoursSpent.toString());
    await expect(row.getByTestId("description")).toHaveText(record.description);
    await expect(row.getByTestId("priority")).toHaveText(record.priority);
    await expect(row.getByTestId("completionStatus")).toHaveText(record.completionStatus);
    await expect(row.getByTestId("date")).toHaveText(record.date.toUTCString());
}

export async function createMaintenanceRecord(page: Page, newRecord: MaintenanceRecord, equipmentName: string) {
    // Open the modal
    await page.getByTestId("add-one-maintenance-record").click();

    // Check if modal is open
    await expect(page.getByTestId("dialog-modal")).toBeVisible();

    // Fill the form
    await page.getByLabel("equipmentId").fill(equipmentName);
    await page.getByTestId(equipmentName).dblclick();
    await page.getByLabel("date").fill(newRecord.date.toISOString().substring(0, 10));
    await page.getByLabel("type").selectOption(newRecord.type);
    await page.getByLabel("technician").fill(newRecord.technician);
    await page.getByLabel("hoursSpent").fill(newRecord.hoursSpent.toString());
    await page.getByLabel("description").fill(newRecord.description);
    await page.getByLabel("priority").selectOption(newRecord.priority);
    await page.getByLabel("completionStatus").selectOption(newRecord.completionStatus);

    for (let part in newRecord.partsReplaced) {
        await page.getByTestId("partsReplaced-add").click();
        await page.getByLabel(`partsReplaced-${part}`).fill(newRecord.partsReplaced[parseInt(part)]);
    }

    // Confirm creation
    await page.getByTestId("2-confirm").click();

    //Check if modal is closed
    await expect(page.getByTestId("dialog-modal")).toBeVisible({visible: false});
}
