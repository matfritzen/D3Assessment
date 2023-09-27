import { defineConfig } from "cypress";
require("dotenv").config();


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    viewportWidth: 1500,
    reporter: "mochawesome",
    env: {
      home: process.env.HOME_URL
    },
    reporterOptions: {
        charts : true,
        overwrite: false,
        html: false,
        json: true,
        reportDir: "cypress/reports/mochawesome-repoxrt"
    },
    video: true,
    retries: 2
  }
});
