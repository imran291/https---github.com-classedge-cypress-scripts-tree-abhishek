/// <reference types="cypress" />

import Login_po_Abh from "../support/Login_po_Abh";
import GenericFunctions_Abh from "../support/GenericFunctions_Abh"

export default class Config_Abh{

    envirounment = "qa";//qa, dev, LiveEnv , ""
    scope = "defined";
    Syllabus = "Syllabus"
    Assignment = "Assignments"

    DefinedLoginFunction(){
        const login_abh = new Login_po_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh()
        if((this.envirounment === "qa") && (this.scope === "defined")){
            login_abh.UserName_Txt_Type("imran1")//salil- pass@123, global-pass@123
            login_abh.SignIn_Btn_Click()
            login_abh.Password_Txt_Type("afs!12345")
            login_abh.Verify_TXT_Click()
            // genericFunctions.wait(2000)
        }else if((this.envirounment === "dev") && (this.scope === "defined")){
            cy.get("input[formcontrolname='username']").type("qa5");//imran
            cy.contains(" Sign In ").click({force:true});
            cy.get("input[formcontrolname='password']").type("qa5");//imran
            cy.contains(" Verify ").click({force:true});
            // cy.contains(" I Accept ").click({force:true});
        }else if((this.envirounment === "LiveEnv") && (this.scope === "defined")){
            login_abh.UserName_Txt_Type("arijit")
            login_abh.SignIn_Btn_Click()
            login_abh.Password_Txt_Type("Arijit@77")
            login_abh.Verify_TXT_Click()
            genericFunctions_abh.wait(2000)
        }else if((this.envirounment === "") && (this.scope === "defined")){
            cy.get("input[formcontrolname='username']").type("arvind");//9930901415
            cy.contains(" Sign In ").click({force:true});
            cy.get("input[formcontrolname='password']").type("arvind");//123
            cy.contains(" Verify ").click({force:true});
            // cy.contains(" I Accept ").click({force:true});
        }
    }  
}