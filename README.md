# Cypress E2E Showcase Framework

This framework contains example test cases in **Cucumber BDD**.

The included end-to-end shopping cart scenario covers a complete customer journey, starting from login and ending with logout:

**Login** – user signs into the application.

**Browse Products** – navigate through the product catalog.

**Select a Product** – choose a specific product to view details.

**Add to Basket** – add the selected product to the shopping cart.

**Proceed to Checkout** – navigate to the checkout page.

**Enter Checkout Details** – provide shipping, billing, and payment information.

**Complete Purchase** – finalize the order successfully.

**Logout** – securely sign out of the application.

This flow demonstrates how Cypress can be used to automate complex user interactions and validate critical business processes in an e-commerce application.

## Cypress Framework Setup

- `Install`: Install recent cypress version and Cucumber Dependencies

## Test File

There is one spec files in the e2e folder:

- `checkout.feaure` : This feature file contains the scenarios to test the E2E customer journey

In order to execute scripts, simply run:

- Gitbash

```
npm install
npx cypress open (Cypress GUI to run individual spec file)
```

## Future

- Consider using an **API** to login.
- Use a modular approach with the Page Object Model (**POM**).
- Follow Cypress best practices, such as using **cypress-data-session** to cache cookies and local storage. This way, we can log in once and reuse the session during regression testing.
- Use **fixtures** to support data-driven testing.
