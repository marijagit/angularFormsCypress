import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    html: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: './cypress/tests/*.cy.js',
    video: false
  },
  env: {
    baseUrl: 'http://localhost:4200/'
  }
});
