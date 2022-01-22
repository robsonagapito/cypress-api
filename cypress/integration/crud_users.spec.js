/// <reference types="cypress" />
import { GFTRest } from "../support/request/GFTRest"
import { AgapitoServer } from "../support/services/AgapitoServer"

describe('@users - Users CRUD', () => {
        
        const gftRest = new GFTRest();
        const agapitoServer = new AgapitoServer();

    context('Functionality', () => {

        it('@sprintXX @JIRA-XXXX - POST - Create an user.', () => {
            cy.gftFixture("user")
            cy.get("@body").then((body)  => {
                body.login = "gft"
                body.full_name = "GFT Brasil POST"
                body.email = "testing.brazil@gft.com"            
                gftRest.executePost(agapitoServer.getURLUsers(), body).should(({status, body}) => {
                    gftRest.logResponse(status, body)

                    expect(status).to.eq(201)
                })
            })
        })
        
        it('@sprintXX @JIRA-XXXX - GET - Get all users.',  () => {
            cy.createPatternUser("gft", "GFT Brazil GET", "testing@gft.com", "18")
            cy.get('@body').then((bodyAux) => {
                gftRest.executeGet(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(({status, body}) => {            
                    gftRest.logResponse(status, body)

                    expect(status).to.eq(200)
                    expect(body.id).eq(bodyAux.id)
                    expect(body.login).eq("gft")
                    expect(body.full_name).eq("GFT Brazil GET")
                    expect(body.email).eq("testing@gft.com")
                    expect(body.age).eq(18)
                    expect(body.created_at).to.be.exist
                    expect(body.updated_at).to.be.exist
                })
            })
        })

        
        it('@sprintXX @JIRA-XXXX - PUT - Update an user.', () => {
            cy.createPatternUser("gft", "GFT Brazil", "testing@gft.com", "18")
            cy.get('@body').then((bodyAux) => {
                bodyAux.login = "gftput"
                bodyAux.full_name = "GFT Brasil PUT"
                bodyAux.email = "put@gft.com"
                bodyAux.age = 20
                gftRest.executePut(agapitoServer.getURLUsers() + '/' + bodyAux.id, bodyAux).should(({status, body}) => {  
                    gftRest.logResponse(status, body)
                    expect(status).to.eq(200)

                    gftRest.executeGet(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(({body}) => {
                        expect(body.id).eq(bodyAux.id)
                        expect(body.login).eq("gftput")
                        expect(body.full_name).eq("GFT Brasil PUT")
                        expect(body.email).eq("put@gft.com")
                        expect(body.age).eq(20)
                        expect(body.created_at).to.be.exist
                        expect(body.updated_at).to.be.exist
                    })
                })
            })
        })

        it('@sprintXX @JIRA-XXXX - PATCH - Update an user.', () => {
            cy.createPatternUser("gft", "GFT Brazil", "testing@gft.com", "18")
            cy.get('@body').then((bodyAux) => {
                bodyAux.login = "gftpatch"
                
                gftRest.executePatch(agapitoServer.getURLUsers() + '/' + bodyAux.id, bodyAux).should(({status, body}) => {  
                    gftRest.logResponse(status, body)
                    expect(status).to.eq(200)

                    gftRest.executeGet(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(({body}) => {
                        expect(body.id).eq(bodyAux.id)
                        expect(body.login).eq("gftpatch")
                        expect(body.full_name).eq("GFT Brazil")
                        expect(body.email).eq("testing@gft.com")
                        expect(body.age).eq(18)
                        expect(body.created_at).to.be.exist
                        expect(body.updated_at).to.be.exist
                    })
                })
            })
        })

        it('@sprintXX @JIRA-XXXX - DELETE - Update an user.', () => {
            cy.createPatternUser("gft", "GFT Brazil", "testing@gft.com", "18")
            cy.get('@body').then((bodyAux) => {          
                gftRest.executeDelete(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(({status, body}) => {
                    gftRest.logResponse(status, body)
                    expect(status).to.eq(204)

                    gftRest.executeGet(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(({status}) => {
                        expect(status).to.eq(404)
                    })
                })
            })
        })

    })

    context('Architecture', () => {
            
        it('@sprintXX @JIRA-XXXX @contract - Check Users Contract with AJV',() => {    
            cy.createPatternUser("gft", "GFT Brazil", "testing@gft.com", "18")
            cy.get('@body').then((bodyAux) => {
                gftRest.executeGet(agapitoServer.getURLUsers() + '/' + bodyAux.id).should(  ({status, body}) => {
                    gftRest.logResponse(status, body)

                    cy.validateContract('user.contract', body)
                })
            })
        })
    })
})
