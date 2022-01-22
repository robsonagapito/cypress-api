import Ajv from "ajv"

async function gerarLogErro(ajv){
    let result = ""
    ajv.errors.forEach( (ar) => {
        result = result + "--------------------------\n"
        result = result + ar.dataPath + "\n"
        result = result + ar.message + "\n"
        result = result + "--------------------------\n"
    })

    return result
}

Cypress.Commands.add("validateContract", (file, body) => {
    
    cy.gftContract(file)
    cy.get('@contract').then( async (contract) => {
        let ajv = new Ajv({ allErrors: true })
        let valid = ajv.validate(contract, body)
        let res = ""
        if (!valid) {
           res = await gerarLogErro(ajv)
        }
        expect(valid,res).to.be.true
    })
})