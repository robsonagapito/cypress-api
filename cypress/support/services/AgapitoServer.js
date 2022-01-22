/// <reference types="Cypress" />

export class AgapitoServer {

    constructor() {
        this.url = `http://agapito-server.herokuapp.com`;
    }

    getURLUsers = () => this.url + '/users';
}