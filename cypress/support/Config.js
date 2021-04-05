/// <reference types="cypress" />

import Login_po from "../support/Login_po";
import GenericFunctions from "../support/GenericFunctions"

export default class Config{

    envirounment = "qa";//qa, dev, LiveEnv , ""
    scope = "defined";
    Syllabus = "Syllabus"
    Assignment = "Assignments"

    DefinedLoginFunction(){
        const login = new Login_po();
        const genericFunctions = new GenericFunctions()
        if((this.envirounment === "qa") && (this.scope === "defined")){
            login.UserName_Txt_Type("imran1")//salil- pass@123, global-pass@123
            login.SignIn_Btn_Click()
            login.Password_Txt_Type("afs!12345")
            login.Verify_TXT_Click()
            // genericFunctions.wait(2000)
        }else if((this.envirounment === "dev") && (this.scope === "defined")){
            cy.get("input[formcontrolname='username']").type("qa5");//imran
            cy.contains(" Sign In ").click({force:true});
            cy.get("input[formcontrolname='password']").type("qa5");//imran
            cy.contains(" Verify ").click({force:true});
            // cy.contains(" I Accept ").click({force:true});
        }else if((this.envirounment === "LiveEnv") && (this.scope === "defined")){
            login.UserName_Txt_Type("arijit")
            login.SignIn_Btn_Click()
            login.Password_Txt_Type("Arijit@77")
            login.Verify_TXT_Click()
            genericFunctions.wait(2000)
        }else if((this.envirounment === "") && (this.scope === "defined")){
            cy.get("input[formcontrolname='username']").type("arvind");//9930901415
            cy.contains(" Sign In ").click({force:true});
            cy.get("input[formcontrolname='password']").type("arvind");//123
            cy.contains(" Verify ").click({force:true});
            // cy.contains(" I Accept ").click({force:true});
        }
    }  
}