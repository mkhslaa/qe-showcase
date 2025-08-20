import { any } from "cypress/types/bluebird";

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const registerDataSession = require("cypress-data-session/src/plugin");

async function setupNodeEvents(on: any, config: any) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  const items: Record<string, string> = {};
  type TaskVar = {
    name: string;
    value: Record<string, string>;
  };

  // cy.task() requires returning a Promise
  // or anything BUT undefined to signal that
  // the task is finished
  // see https://on.cypress.io/task
  on("task", {
    setItem(TaskVar: any): any {
      console.log("setting %s", TaskVar.name);

      if (typeof TaskVar.value === "undefined") {
        // since we cannot return undefined from the cy.task
        // let's not allow storing undefined
        throw new Error(
          `Cannot store undefined value for item "${TaskVar.name}"`
        );
      }

      items[TaskVar.name] = TaskVar.value;

      return null;
    },

    getItem(name: any) {
      if (name in items) {
        console.log("returning item %s", name);

        return items[name];
      }

      const msg = `Missing item "${name}"`;

      console.error(msg);
      throw new Error(msg);
    },
  });

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);
  registerDataSession(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    supportFile: "cypress/support/e2e.ts",
    specPattern: "**/*.feature",
    experimentalSessionAndOrigin: true,
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 60000,
    env: {
      allureReuseAfterSpec: true,
    },
  },
});
