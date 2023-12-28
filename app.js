const playwright = require("playwright");
require("dotenv").config();
const os = require("os");
const path = require("path");

// Variable that controls which courses to download.
// Change this to "Alle" if you want to download ALL courses (from old semesters too).
const listItemText = "I gang";

(async () => {
  const browser = await playwright["chromium"].launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(process.env.MOODLE_WEB_URL);

  if ((await page.$("#loginbtn")) || (await page.$("#username")) || (await page.$("#password"))
  ) {
    await page.type("#username", process.env.MOODLE_USERNAME);
    await page.type("#password", process.env.MOODLE_PASSWORD);
    await page.click("#loginbtn");
  }

  // Clicks the dropdown with what courses to show and selects the listItemText.
  await page.waitForSelector("#groupingdropdown");
  await page.click("#groupingdropdown");

  await page.click(`li:has-text("${listItemText}")`);
  await page.waitForTimeout(1500);

  // Click the dropdown with how many courses to show and always select "Alle".
  const button = await page.$('.btn[aria-label*="elementer per side"]');
  if (button) {
    await button.click();
    // Wait for the dropdown menu to appear
    const dropdownMenu = await page.waitForSelector(
      ".btn-group.show .dropdown-menu.show"
    );
    // Click the menu item with text "Alle"
    const alleMenuItem = await dropdownMenu.$(
      '[role="menuitem"][data-limit="0"]'
    );
    if (alleMenuItem) {
      await alleMenuItem.click();
      await page.waitForTimeout(500);
    } else {
      console.log('Menu item "Alle" not found');
    }
  }

  // Refresh the page, to update the DOM with all courses.
  await page.goto(process.env.MOODLE_WEB_URL);
  await page.waitForTimeout(1500);

  // Extract the HREF of each course.
  const courses = await page.$$eval(
    "#page-container-1 .dashboard-card-deck .dashboard-card",
    (cards) => {
      const cardInfo = Array.from(cards, (card) => {
        const anchor = card.querySelector("a");

        return {
          href: anchor ? anchor.getAttribute("href") : null,
        };
      });

      return cardInfo;
    }
  );

  console.log("Found " + courses.length + " courses.");

  const userHomeDirectory = os.homedir();

  try {
    // Loop through each course and download its content.
    for (const course of courses) {
      if (course.href) {
        console.log("Downloading course: " + course.href);

        await page.goto(course.href);

        await page.waitForTimeout(1000);

        await page.getByRole("menuitem").filter({ hasText: "Mere" }).click();

        await page
          .getByRole("menuitem")
          .filter({ hasText: "Download kursusindhold" })
          .click();

        const downloadPromise = page.waitForEvent("download");

        await page.getByRole("button").filter({ hasText: "Download" }).click();

        const download = await downloadPromise;

        // Save the files: (C:\Users\username\moodle)
        const folderPath = path.join(userHomeDirectory, "moodle");
        await download.saveAs(
          path.join(folderPath, download.suggestedFilename())
        );

        console.log("Saved course to: " + folderPath);
      }
      console.log("Done. All courses downloaded.");
    }
  } catch (error) {
    console.log(error);
  }

  await browser.close();
})();
