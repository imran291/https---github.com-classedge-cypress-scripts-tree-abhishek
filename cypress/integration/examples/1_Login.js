import FixturePathHandle from "../../support/FixturePathHandle"

describe ("Login Test Cases", () => {

    it("describe username and password for test purpose", () => {
       const fixturePathHandle = new FixturePathHandle();
       fixturePathHandle.WriteFixtureForUserAndPassword_JSON("Salil", "Sharma")
    })

})