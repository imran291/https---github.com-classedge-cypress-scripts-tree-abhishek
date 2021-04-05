export default class FixturePathHandle{

    LoginCredentials = "../cypress_practice/cypress/fixtures/LoginCredentials.json";

    WriteFixtureForUserAndPassword_JSON(UserName, Password) {
        const self = this;
        cy.writeFile(self.LoginCredentials, { UserPassword: UserName +"/"+ Password })
    }
}