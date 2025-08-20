Feature: SauceDemo E2E Tests
  As a customer, I would like to proceed to checkout so that I can complete my purchase
  Scenario: Verify purchase is completed successfully
    Given I login to SauceDemo application
    And I sort the items by price low to high
    And I add the first item to the cart
    And I proceed to checkout
    And I fill in the checkout information with valid data
    When I complete the checkout process
    Then I should see the order confirmation message
    And I should be able to log out successfully