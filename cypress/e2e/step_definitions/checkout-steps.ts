import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// When(/^I submit the GET request for the media "([^"]*)"$/, (uri: any) => {
//   cy.apiGet(uri);
// });

// Then(/^I validate status code "([^"]*)" for the media$/, (status: string) => {
//   cy.get("@apiGet").then((response: any) => {
//     cy.log("object to check newly created account details", response.status);
//     const statusInt = parseInt(status, 10);
//     expect(response.status).equal(statusInt);
//   });
// });

// Then(
//   /^I validate the duration less than "([^"]*)" for the media$/,
//   (duration: string) => {
//     cy.get("@apiGet").then((response: any) => {
//       const durationInt = parseInt(duration, 10);
//       expect(response.duration).to.be.lessThan(durationInt);
//     });
//   }
// );

// Then(/^I validate id is not null in media call$/, () => {
//   cy.get("@apiGet").then((response: any) => {
//     expect(response.body.data).to.be.an("array");

//     response.body.data.forEach((item: any) => {
//       expect(item.id).to.not.be.null;
//     });
//   });
// });

// Then(
//   /^I validate segment type for every tract to be "([^"]*)"$/,
//   (segmentType: string) => {
//     cy.get("@apiGet").then((response: any) => {
//       expect(response.body.data).to.be.an("array");

//       response.body.data.forEach((item: any) => {
//         expect(item.segment_type).equal(segmentType);
//       });
//     });
//   }
// );

// Then(
//   /^I validate primary field for every tract to be nevel null or empty$/,
//   () => {
//     cy.get("@apiGet").then((response: any) => {
//       expect(response.body.data).to.be.an("array");

//       response.body.data.forEach((item: any) => {
//         expect(item.title_list.primary).to.not.equal(null);
//         expect(item.title_list.primary).to.not.equal("");
//       });
//     });
//   }
// );

// Then(/^I validate now_playing in offset$/, () => {
//   cy.get("@apiGet").then((response: any) => {
//     expect(response.body.data).to.be.an("array");

//     response.body.data.forEach((item: any) => {
//       expect(item.title_list.primary).to.not.equal(null);
//       expect(item.title_list.primary).to.not.equal("");
//     });
//   });
// });

// Then(/^I validate now_playing in offset is only true in one track$/, () => {
//   cy.get("@apiGet").then((response: any) => {
//     const data = response.body.data;
//     expect(data).to.be.an("array");

//     const nowPlayingCount = data.filter(
//       (item: any) => item.offset?.now_playing === true
//     ).length;
//     expect(nowPlayingCount).to.equal(1);
//   });
// });

// Then(
//   /^I validate media ai call response header contains date propertyk$/,
//   () => {
//     cy.get("@apiGet").then((response: any) => {
//       // Log all headers to console for debugging
//       cy.log(JSON.stringify(response.headers));

//       // Check if the "date" header exists
//       expect(response.headers).to.have.property("date");
//     });
//   }
// );

Given(/^I login to SauceDemo application/, () => {
  cy.visit('https://www.saucedemo.com/');
  cy.dataTest('login-button').should('be.visible');
  cy.login('standard_user', 'secret_sauce');
  cy.contains('Swag Labs').should('be.visible');
});

Then(/^I sort the items by price low to high/, () => {
  cy.dataTest('active-option').should('be.visible');

  //Find drop down contains Price (low to high) and select it
  cy.get('.select_container')
    .click()
    .find('.product_sort_container')
    .should('be.visible')
    .and('contain', 'Price (low to high)')
    .select('Price (low to high)');

  // Verify that the items are sorted by price low to high
  cy.get('.inventory_item_price').then(($prices) => {
    const prices = $prices.toArray().map((el) => parseFloat(el.innerText.replace('$', '')));
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
  });
});

Then(/^I add the first item to the cart/, () => {
  cy.dataTest('inventory-list').within(($list) => {
    cy.wrap($list)
      .dataTest('inventory-item')
      .first()
      .within(() => {
        cy.dataTest('add-to-cart-sauce-labs-onesie').click();
      });
  });
  cy.dataTest('shopping-cart-link').should('contain', '1');
});

Then(/^I proceed to checkout/, () => {
  cy.dataTest('shopping-cart-link').click();
  cy.dataTest('checkout').click();
  cy.dataTest('title').should('contain', 'Checkout: Your Information');
});

Then(/^I fill in the checkout information with valid data/, () => {
  cy.dataTest('checkout-info-container').within(() => {
    cy.dataTest('firstName').type('John');
    cy.dataTest('lastName').type('Doe');
    cy.dataTest('postalCode').type('12345');
  });
});

When(/^I complete the checkout process/, () => {
  cy.dataTest('continue').click();
  cy.dataTest('title').should('contain', 'Checkout: Overview');
  cy.dataTest('finish').click();
});

Then(/^I should see the order confirmation message/, () => {
  cy.dataTest('title').should('contain', 'Checkout: Complete!');
  cy.dataTest('complete-header').should('contain', 'Thank you for your order!');
  cy.dataTest('complete-text').should(
    'contain',
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  );
  cy.dataTest('back-to-products').click();
  cy.url().should('include', 'saucedemo.com/inventory.html');
  cy.dataTest('inventory-list').should('be.visible');
  cy.dataTest('shopping-cart-link').should('contain', '');
  cy.get('#react-burger-menu-btn').should('be.visible');
});

Then(/^I should be able to log out successfully/, () => {
  cy.get('#react-burger-menu-btn').should('be.visible').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.url().should('include', 'saucedemo.com');
  cy.dataTest('login-button').should('be.visible');
  cy.dataTest('login-button').should('contain', 'Login');
  cy.dataTest('username').should('be.visible');
});
