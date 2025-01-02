import { Page, expect } from "@playwright/test";
import { Equipment } from "@/lib/equipment/EquipmentInterface";

// The ids should not be used as they are not passed to any equipment forms.
export const PLAYWRIGHT_EQUIPMENT: Equipment[] = [
    {
        id: "0",
        name: "PW Assembler",
        location: "Site 3",
        department: "Assembly",
        model: "Mk 3",
        serialNumber: "1357",
        installDate: new Date("2024-12-20"),
        status: "Down",
    },
    {
        id: "1",
        name: "PW Machining",
        location: "Site 4",
        department: "Machining",
        model: "Mk 2",
        serialNumber: "2468",
        installDate: new Date("2024-12-22"),
        status: "Operational",
    },
] as const;

/*
    Helper functions
*/

// Helper function for checking a row in the equipment table
export async function checkEquipmentRow(page: Page, rowNum: number, compareEquipment: Equipment) {
    const row = page.getByTestId("equipment-row").nth(rowNum);
    
    await expect(row.getByTestId("name")).toHaveText(compareEquipment.name);
    await expect(row.getByTestId("status")).toHaveText(compareEquipment.status);
    await expect(row.getByTestId("serialNumber")).toHaveText(compareEquipment.serialNumber);
    await expect(row.getByTestId("model")).toHaveText(compareEquipment.model);
    await expect(row.getByTestId("department")).toHaveText(compareEquipment.department);
    await expect(row.getByTestId("location")).toHaveText(compareEquipment.location);
    await expect(row.getByTestId("installDate")).toHaveText(compareEquipment.installDate.toUTCString());
}

// Helper function for creating a row in the equipment table
export async function createEquipment(page: Page, newEquipment: Equipment) {
    // Open the modal
    await page.getByTestId("add-one-equipment").click();

    // Check if modal is open
    await expect(page.getByTestId("dialog-modal")).toBeVisible();

    // Fill the form
    await page.getByLabel("name").fill(newEquipment.name);
    await page.getByLabel("location").fill(newEquipment.location);
    await page.getByLabel("department").selectOption(newEquipment.department);
    await page.getByLabel("status").selectOption(newEquipment.status);
    await page.getByLabel("model").fill(newEquipment.model);
    await page.getByLabel("serialNumber").fill(newEquipment.serialNumber);
    await page.getByLabel("installDate").fill(newEquipment.installDate.toISOString().substring(0, 10));

    // Confirm creation
    await page.getByTestId("2-confirm").click();

    // Check if modal is closed
    await expect(page.getByTestId("dialog-modal")).toBeVisible({visible: false});
}

// Helper function for using a single string filter in a table
export async function checkSingleStringFilter(page: Page, headerId: string, input: string, isSelect?: boolean) {
    // Change depending on if the filter is a select filter

    if (isSelect) {
        // Do this if the input is select

        await page.getByTestId(headerId).getByTestId("select-1").selectOption(input);

        // Use headerId to get the correct column to check
        const columnName = headerId.substring(headerId.lastIndexOf('-')+1, headerId.length)

        await expect(page.getByTestId("equipment-row").nth(0).getByTestId(columnName)).toContainText(input);
        
        await page.getByTestId(headerId).getByTestId("select-1").selectOption("All");
    } else {
        // Do this if the input is just an input string

        await page.getByTestId(headerId).getByTestId("string-1").fill(input);

        // Use headerId to get the correct column to check
        const columnName = headerId.substring(headerId.lastIndexOf('-')+1, headerId.length)

        await expect(page.getByTestId("equipment-row").nth(0).getByTestId(columnName)).toContainText(input);
        
        await page.getByTestId(headerId).getByTestId("string-1").fill("");
    }
}
