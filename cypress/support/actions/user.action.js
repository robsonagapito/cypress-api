/// <reference types="cypress" />
import { GFTRest } from "../request/GFTRest"
import { AgapitoServer } from "../services/AgapitoServer"

const gftRest = new GFTRest();
const agapitoServer = new AgapitoServer();

Cypress.Commands.add("createPatternUser", (login, name, email, age) => {
    cy.gftFixture("user")
    cy.get("@body").then((body)  => {
        body.login = login
        body.full_name = name
        body.email = email
        body.age = age
        cy.log(JSON.stringify(body))
        let gftRest = new GFTRest();
        gftRest.executePost(agapitoServer.getURLUsers(), body).should((response) => {  
            gftRest.logResponse(response.status, response.body)
            cy.wrap(response.body).as('body')
        })
    })
})