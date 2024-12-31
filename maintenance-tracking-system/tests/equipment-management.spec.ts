import { test, expect, Page } from "@playwright/test";
import { Equipment } from "@/lib/equipment/EquipmentInterface";
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
        name: "PW Machining",
        location: "Site 4",
        department: "Machining",
        model: "Mk 2",
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

/*
    Tests
*/

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
});

test.describe("Equipment Modifications", () => {
    // Test the ability to create an equipment row with the form
    test("should create new equipment with valid data", async ({ page }) => {
        // Create an equipment object in the table
        await createEquipment(page, PLAYWRIGHT_EQUIPMENT[0]);

        // Check that the equipment was created
        await checkEquipmentRow(page, 0, PLAYWRIGHT_EQUIPMENT[0]);
    });



    // Test the error messages on the create equipment form
    test("should show validation errors for invalid equipment data", async ({ page }) => {
        // Open the modal
        await page.getByTestId("add-one-equipment").click();

        // Check if modal is open
        await expect(page.getByTestId("dialog-modal")).toBeVisible();

        // Click the confirm button with blank inputs
        await page.getByTestId("2-confirm").click();



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
        await page.getByTestId("2-confirm").click();

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
        await page.getByTestId("2-confirm").click();

        // Check if modal is open (it should be as confirm should not submit the form)
        await expect(page.getByTestId("dialog-modal")).toBeVisible();



        // Check expected error messages
        await expect(page.getByText(EQUIPMENT_ERROR_MSG.name.trailingWhitespace)).toBeVisible();

        // Finished inputs
        await page.getByLabel("name").fill("done");

        // Click confirm
        await page.getByTestId("2-confirm").click();

        // Check if modal is closed
        await expect(page.getByTestId("dialog-modal")).toBeVisible({visible: false});
    });



    // Test the ability to edit one row in the equipment table
    test("should edit one existing equipment", async ({ page }) => {
        // Create an equipment object in the table
        await createEquipment(page, PLAYWRIGHT_EQUIPMENT[0]);

        // Check that the equipment was created
        await checkEquipmentRow(page, 0, PLAYWRIGHT_EQUIPMENT[0]);

        // Click on the checkbox in the row

        const checkboxDiv = page.getByTestId("equipment-row").nth(0).getByTestId("select");
        await checkboxDiv.getByRole("checkbox").click();

        // Click on the Edit One Equipment button
        await page.getByTestId("edit-one-equipment").click();

        // Check the modal is open
        await expect(page.getByTestId("dialog-modal")).toBeVisible();

        // Make sure the default values in the form are correct

        await expect(page.getByLabel("name")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].name);
        await expect(page.getByLabel("location")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].location);
        await expect(page.getByLabel("department")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].department);
        await expect(page.getByLabel("status")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].status);
        await expect(page.getByLabel("model")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].model);
        await expect(page.getByLabel("serialNumber")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].serialNumber);
        await expect(page.getByLabel("installDate")).toHaveValue(PLAYWRIGHT_EQUIPMENT[0].installDate.toISOString().substring(0, 10));

        // Enter the edited information for the equipment

        await page.getByLabel("name").fill(PLAYWRIGHT_EQUIPMENT[1].name);
        await page.getByLabel("location").fill(PLAYWRIGHT_EQUIPMENT[1].location);
        await page.getByLabel("department").selectOption(PLAYWRIGHT_EQUIPMENT[1].department);
        await page.getByLabel("status").selectOption(PLAYWRIGHT_EQUIPMENT[1].status);
        await page.getByLabel("model").fill(PLAYWRIGHT_EQUIPMENT[1].model);
        await page.getByLabel("serialNumber").fill(PLAYWRIGHT_EQUIPMENT[1].serialNumber);
        await page.getByLabel("installDate").fill(PLAYWRIGHT_EQUIPMENT[1].installDate.toISOString().substring(0, 10));

        // Click confirm
        await page.getByTestId("2-confirm").click();

        // Check the row
        await checkEquipmentRow(page, 0, PLAYWRIGHT_EQUIPMENT[1]);
    });
});
