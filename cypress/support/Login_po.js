///<reference types="cypress" />
///<reference types="cypress-iframe" />
import GenericFunctions from "../support/GenericFunctions";
import Config from "../support/Config"
import "cypress-iframe";

export default class Login{

    UserName_TXT = "input[formcontrolname='username']";
    Password_TXT = "input[formcontrolname='password']"; 
    NotRobotCheck_CBTN = ".recaptcha-checkbox-border"
    SignIn_BTN = ".btn-outline-primary.btn-blue"
    Verify_TXT = "Verify"


    CommonLogin(){
        const config = new Config();
        config.DefinedLoginFunction();   
    }

    UserName_Txt_Type(value){
        const generic = new GenericFunctions();
        generic.Type(this.UserName_TXT, value);
    }
   
    Password_Txt_Type(value){
        const generic = new GenericFunctions();
        generic.Type(this.Password_TXT, value);
    }

    SignIn_Btn_Click(){
        const generic = new GenericFunctions();
        generic.ClickForecefully(this.SignIn_BTN);
    }

    Verify_TXT_Click(){
        const generic = new GenericFunctions();
        
        generic.ClickOnElementUsingText(this.Verify_TXT);
    }


}