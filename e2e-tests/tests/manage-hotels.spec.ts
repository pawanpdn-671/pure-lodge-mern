import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
	await page.goto(UI_URL);

	await page
		.getByRole("link", {
			name: "Sign In",
		})
		.click();

	await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

	await page.locator("[name=email]").fill("pawantest@gmail.com");
	await page.locator("[name=password]").fill("123456");

	await page.getByRole("button", { name: "Login" }).click();

	await expect(page.getByText("Login Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
	await page.goto(`${UI_URL}add-hotel`);

	await page.locator('[name="name"]').fill("Test Hotel");
	await page.locator('[name="city"]').fill("Test City");
	await page.locator('[name="country"]').fill("Test Country");
	await page.locator('[name="description"]').fill("This is a description for the test mode.");
	await page.locator('[name="pricePerNight"]').fill("100");
	await page.selectOption('select[name="starRating"]', "3");
	await page.getByText("Budget").click();
	await page.getByLabel("Free Wifi").check();
	await page.getByLabel("Parking").check();
	await page.locator('[name="adultCount"]').fill("2");
	await page.locator('[name="childCount"]').fill("3");

	await page.setInputFiles('[name="imageFiles"]', [
		path.join(__dirname, "files", "1.jpg"),
		path.join(__dirname, "files", "2.jpg"),
	]);

	await page.getByRole("button", { name: "Add Hotel" }).click();
	await expect(page.getByText("Hotel successfully added")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
	await page.goto(`${UI_URL}my-hotels`);

	await expect(page.getByText("Test Hotel")).toBeVisible();
	await expect(page.getByText("This is a description for the test mode")).toBeVisible();
	await expect(page.getByText("Test City, Test Country")).toBeVisible();
	await expect(page.getByText("Budget")).toBeVisible();
	await expect(page.getByText("Rs. 100 per night")).toBeVisible();
	await expect(page.getByText("2 adults, 3 children")).toBeVisible();
	await expect(page.getByText("3 Star Rating")).toBeVisible();

	await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
