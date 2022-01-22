/// <reference types="Cypress" />

export class GFTRest {

    constructor() {
        this.headers = new Map()
        this.addHeader("accept", "application/json")
        this.addHeader("content-type", "application/json")
    }

    cleanHeader = () => {
        this.headers.clear()
    }

    addHeader = (header, value) => {
        this.headers.set(header, value)
    }

    updateBearer = (tk) => {
        let bearer = tk
        if (tk == '')
            bearer = `${Cypress.env("bearerApi")}`

        if (tk == 'empty')
            bearer = ''

        if (Cypress.env("addBearer") && (bearer != 'without')){
            this.addHeader('Authorization', bearer)        
        }
    }

    executeGet = (url, tk = '') => {
        this.updateBearer(tk)
        const headersObj = Object.fromEntries(this.headers)

        this.logRequest("GET", url, "")

        return cy.request({
            "method": 'GET',
            "url": url,
            "headers": headersObj,
            "failOnStatusCode": false
        })
    }

    executePost = (url, body, tk = '') => {
        this.updateBearer(tk)
        const headersObj = Object.fromEntries(this.headers)

        this.logRequest("POST", url, JSON.stringify(body))

        return cy.request({
            "method": 'POST',
            "url": url,
            "headers": headersObj,
            "body": body,
            "failOnStatusCode": false
        })
    }

    executePut = (url, body, tk = '') => {
        this.updateBearer(tk)
        const headersObj = Object.fromEntries(this.headers)

        this.logRequest("PUT", url, JSON.stringify(body))

        return cy.request({
            "method": 'PUT',
            "url": url,
            "headers": headersObj,
            "body": body,
            "failOnStatusCode": false
        })
    }

    executePatch = (url, body, tk = '') => {
        this.updateBearer(tk)
        const headersObj = Object.fromEntries(this.headers)

        this.logRequest("PATCH", url, JSON.stringify(body))

        return cy.request({
            "method": 'PATCH',
            "url": url,
            "headers": headersObj,
            "body": body,
            "failOnStatusCode": false
        })
    }

    executeDelete = (url, tk = '') => {
        this.updateBearer(tk)
        const headersObj = Object.fromEntries(this.headers)

        this.logRequest("DELETE", url, "")

        return cy.request({
            "method": 'DELETE',
            "url": url,
            "headers": headersObj,
            "failOnStatusCode": false
        })
    }

    logRequest = (metodo, url, body) => {
        cy.log('================================')
        cy.log(`Method: ${metodo}` )
        cy.log(`URL: ${url}` )
        cy.log(`Headers:` )
        for (let [key, value] of this.headers) {
            cy.log(`  =>  ${key} = ${value}`)
        }

        if (body != "") {
            cy.log(`Body: ${body}`)
        }
    }

    logResponse = (status, body) => {
        cy.log('--------------------------------')
        cy.log(`RESPONSE` )
        cy.log(`Status Code: ${status}` )
        let responseBody = JSON.stringify(body)
        const bodyAux = new Cypress.Promise((resolve, reject) => resolve(responseBody))
        bodyAux.then(($res) => cy.log(`Body: ${$res}` ))
    }
}