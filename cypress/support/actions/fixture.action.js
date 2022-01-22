/// <reference types="cypress" />

Cypress.Commands.add("gftFixture", (file) => {
    cy.fixture(file + ".json").as("body")
})

Cypress.Commands.add("gftContract", (file) => {
    cy.fixture(' ' + '/../../contracts/' + file + ".json").as("contract")
})