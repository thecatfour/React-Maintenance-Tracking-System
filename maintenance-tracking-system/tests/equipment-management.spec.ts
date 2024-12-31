import { test, expect, Page } from "@playwright/test";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
import { EXAMPLE_EQUIPMENT } from "@/lib/ExampleObjects";
import { EQUIPMENT_ERROR_MSG } from "@/lib/equipment/EquipmentValidation";

// The ids should not be used as they are not passed to any equipment forms.
const PLAYWRIGHT_EQUIPMENT: Equipment[] = [
    {
        id: "0",
        name: "PW Assembler",
        location: "Site 3",
        department: "Assembly",
        model: "Mk 1",
        serialNumber: "1357",
        installDate: new Date("2024-12-20"),
        status: "Down",
    },
    {
        id: "1",
        name: "PW Machinging",
        location: "Site 3",
        department: "Machining",
        model: "Mk 1",
        serialNumber: "2468",
        installDate: new Date("2024-12-22"),
        status: "Operational",
    },
] as const;

// Helper function for checking a row in the equipment table
async function checkEquipmentRow(page: Page, rowNum: number, compareEquipment: Equipment) {
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
async function createEquipment(page: Page, newEquipment: Equipment) {
    // Open the modal
    await page.getByRole("button", {name: "Add Equipment"}).click();

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
    await page.getByRole("button", {name: "Confirm"}).click();

    // Check if modal is closed
    await expect(page.getByTestId("dialog-modal")).toBeVisible({visible: false});
}

/*
    Tests
*/

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
});

test.describe("Equipment Modifications", () => {
    test("should create new equipment with valid data", async ({ page }) => {
        // Create an equipment object in the table
        await createEquipment(page, PLAYWRIGHT_EQUIPMENT[0]);

        // Check that the equipment was created
        await checkEquipmentRow(page, 0, PLAYWRIGHT_EQUIPMENT[0]);
    });

    test("should show validation errors for invalid equipment data", async ({ page }) => {
        // Open the modal
        await page.getByRole("button", {name: "Add Equipment"}).click();

        // Check if modal is open
        await expect(page.getByTestId("dialog-modal")).toBeVisible();

        // Click the confirm button with blank inputs
        await page.getByRole("button", {name: "Confirm"}).click();



        // Check expected error messages
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.name.required)).toBeVisible();
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.location.required)).toBeVisible();
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.model.required)).toBeVisible();
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.serialNumber.required)).toBeVisible();
        await expect(page.getByText("Invalid date")).toBeVisible();

        // Check minLength 
        await page.getByLabel("name").fill("aa");

        // Check alphanumeric
        await page.getByLabel("serialNumber").fill("`");

        // Check future
        await page.getByLabel("installDate").fill("9999-01-01");

        // Finished inputs
        await page.getByLabel("location").fill("done");
        await page.getByLabel("model").fill("done");

        // Click confirm to make sure it will not submit
        await page.getByRole("button", {name: "Confirm"}).click();

        // Check if modal is open (it should be as confirm should not submit the form)
        await expect(page.getByTestId("dialog-modal")).toBeVisible();



        // Check expected error messages
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.name.minLength)).toBeVisible();
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.serialNumber.alphanumeric)).toBeVisible();
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.installDate.future)).toBeVisible();

        // Check name whitespace
        await page.getByLabel("name").fill("aa  ");

        // Finished inputs
        await page.getByLabel("serialNumber").fill("123");
        await page.getByLabel("installDate").fill("2000-01-01");

        // Click confirm to make sure it will not submit
        await page.getByRole("button", {name: "Confirm"}).click();

        // Check if modal is open (it should be as confirm should not submit the form)
        await expect(page.getByTestId("dialog-modal")).toBeVisible();



        // Check expected error messages
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.name.trailingWhitespace)).toBeVisible();

        // Finished inputs
        await page.getByLabel("name").fill("done");

        // Click confirm
        await page.getByRole("button", {name: "Confirm"}).click();

        // Check if modal is closed
        await expect(page.getByTestId("dialog-modal")).toBeVisible({visible: false});
    })
});
