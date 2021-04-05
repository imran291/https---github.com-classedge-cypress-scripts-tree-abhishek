///<reference types="cypress" />
///<reference types="cypress-iframe" />
import GenericFunctions_Abh from "../support/GenericFunctions_Abh";
import Config_Abh from "../support/Config_Abh"
import "cypress-iframe";

export default class Login_Abh{

    UserName_TXT = "input[formcontrolname='username']";
    Password_TXT = "input[formcontrolname='password']"; 
    NotRobotCheck_CBTN = ".recaptcha-checkbox-border"
    SignIn_BTN = ".btn-outline-primary.btn-blue"
    Verify_TXT = "Verify"


    CommonLogin(){
        const config_abh = new Config_Abh();
        config_abh.DefinedLoginFunction();   
    }

    UserName_Txt_Type(value){
        const generic_abh = new GenericFunctions_Abh();
        generic_abh.Type(this.UserName_TXT, value);
    }
   
    Password_Txt_Type(value){
        const generic_abh = new GenericFunctions_Abh();
        generic_abh.Type(this.Password_TXT, value);
    }

    SignIn_Btn_Click(){
        const generic_abh = new GenericFunctions_Abh();
        generic_abh.ClickForecefully(this.SignIn_BTN);
    }

    Verify_TXT_Click(){
        const generic_abh = new GenericFunctions_Abh();
        generic_abh.ClickOnElementUsingText(this.Verify_TXT);
    }


}