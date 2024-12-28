const { Builder, By, Key, until } = require("selenium-webdriver");
const axios = require("axios");

const fetchTrendingTopics = async () => {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Navigating to Twitter login page...");
    await driver.get("https://twitter.com/login");

    // Wait for the username field to load
    console.log("Waiting for username field...");
    await driver.wait(until.elementLocated(By.name("text")), 10000);
    const usernameField = await driver.findElement(By.name("text"));
    console.log("Entering username...");
    await usernameField.sendKeys("@sinha_kart1745", Key.RETURN);

    // Wait for the password field to load
    console.log("Waiting for password field...");
    await driver.wait(until.elementLocated(By.name("password")), 10000);
    const passwordField = await driver.findElement(By.name("password"));
    console.log("Entering password...");
    await passwordField.sendKeys("Sinha@17", Key.RETURN);

    // Wait for the homepage to load
    console.log("Waiting for homepage...");
    await driver.sleep(5000);

    // Fetch trending topics
    console.log("Fetching trending topics...");
    const trendElements = await driver.findElements(
      By.css('[data-testid="trend"]')
    );
    const trends = [];
    for (let trend of trendElements) {
      const text = await trend.getText();
      if (text) trends.push(text);
    }

    return {
      trends: trends.slice(0, 5),
      dateTime: new Date(),
      ipAddress: "127.0.0.1", // Replace with your proxy IP if needed
    };
  } catch (error) {
    console.error("Error in Selenium script:", error.message);
    throw error;
  } finally {
    await driver.quit();
  }
};

module.exports = fetchTrendingTopics;
