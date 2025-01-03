import { test, expect } from "@playwright/test";
import { M_RECORD_ERROR_MSG } from "@/lib/maintenance-records/MaintenanceRecordValidation";
import { 
    createEquipment, 
    PLAYWRIGHT_EQUIPMENT, 
    checkEquipmentRow, 
    checkSingleStringFilter
} from "@/lib/playwright-helpers/PlaywrightEquipmentHelpers";
import { 
    createMaintenanceRecord, 
    PLAYWRIGHT_MAINTENANCE_RECORD,
    checkMaintenanceRecordRow 
} from "@/lib/playwright-helpers/PlaywrightMaintenanceRecordHelpers";

test.beforeEach(async ({ page }) =>{
    // Before each test, we want to create two testing equipment to ensure there is something to
    // create records for testing
    await page.goto("http://localhost:3000");
    await page.getByTestId("navbar-Equipment").click();
    await createEquipment(page, PLAYWRIGHT_EQUIPMENT[0]);
    await checkEquipmentRow(page, 0, PLAYWRIGHT_EQUIPMENT[0]);
    await page.getByTestId("navbar-Maintenance Records").click();
})

test.describe("Maintenance Record Forms", () => {
    // Test the ability to create a maintenance record with the form
    test("should create new maintenance record with valid data", async ({ page }) => {
        await createMaintenanceRecord(page, PLAYWRIGHT_MAINTENANCE_RECORD[0], PLAYWRIGHT_EQUIPMENT[0].name);
        await checkMaintenanceRecordRow(page, 0, PLAYWRIGHT_MAINTENANCE_RECORD[0], PLAYWRIGHT_EQUIPMENT[0].name);
    });


    // Test if maintenance hours (hoursSpent) validation is properly set up
    test("should validate maintenance hours", async ({ page }) => {
        await page.getByTestId("add-one-maintenance-record").click();

        await expect(page.getByTestId("dialog-modal")).toBeVisible();

        await page.getByTestId("2-confirm").click();

        // Check required message for hours spent
        await expect(page.getByText(M_RECORD_ERROR_MSG.hoursSpent.required)).toBeVisible();

        // Check negative number message for hours spent
        await page.getByLabel("hoursSpent").fill("-1");

        await page.getByTestId("2-confirm").click();

        await expect(page.getByText(M_RECORD_ERROR_MSG.hoursSpent.positive)).toBeVisible();

        // Check too high message for hours spent
        await page.getByLabel("hoursSpent").fill("25");

        await page.getByTestId("2-confirm").click();

        await expect(page.getByText(M_RECORD_ERROR_MSG.hoursSpent.maxValue)).toBeVisible();
    });
});

test.describe("Maintenance Record Visuals", () => {
    // Test if the correct equipment name is shown in the table
    test("should show equipment name in maintenance table", async ({ page }) => {
        await createMaintenanceRecord(page, PLAYWRIGHT_MAINTENANCE_RECORD[0], PLAYWRIGHT_EQUIPMENT[0].name);
        
        await expect(page.getByTestId("maintenance-record-row").nth(0).getByTestId("equipmentName")).toHaveText(PLAYWRIGHT_EQUIPMENT[0].name);

        await createMaintenanceRecord(page, PLAYWRIGHT_MAINTENANCE_RECORD[1], PLAYWRIGHT_EQUIPMENT[0].name);

        await expect(page.getByTestId("maintenance-record-row").nth(0).getByTestId("equipmentName")).toHaveText(PLAYWRIGHT_EQUIPMENT[0].name);
    });


    // Test if the maintenance records can be filtered by date range
    test("should filter maintenance records by date range", async ({ page }) => {
        await createMaintenanceRecord(page, PLAYWRIGHT_MAINTENANCE_RECORD[0], PLAYWRIGHT_EQUIPMENT[0].name);
        await createMaintenanceRecord(page, PLAYWRIGHT_MAINTENANCE_RECORD[1], PLAYWRIGHT_EQUIPMENT[0].name);

        const checkDate = "2024-12-30";
        const dateHeader = page.getByTestId("maintenance-record-table-header-date");

        // Check the beginning date filter
        await dateHeader.getByTestId("date-1").fill(checkDate);
        const afterDate = await page.getByTestId("maintenance-record-row").nth(0).getByTestId("date").textContent();
        expect(checkDate <= new Date(afterDate as string).toISOString().substring(0, 10)).toBeTruthy();

        await dateHeader.getByTestId("date-1").fill("");

        // Check the end date filter
        await dateHeader.getByTestId("date-2").fill(checkDate);
        const beforeDate = await page.getByTestId("maintenance-record-row").nth(0).getByTestId("date").textContent();
        expect(new Date(beforeDate as string).toISOString().substring(0, 10) <= checkDate).toBeTruthy();
    });
});