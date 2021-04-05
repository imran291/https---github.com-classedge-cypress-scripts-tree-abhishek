import GenericFunctions_Abh from "../support/GenericFunctions_Abh"

export default class Practice_IntroWithTQ_Abh {

    BeginPracticeAndPracticeAgain_BTN = "button.btn.btn-outline-primary:nth-child(1)"
    SecondaryBeginPracticeAndPracticeAgain_BTN = "button.btn.btn-outline-secondary"
    Pract_Intro_TQ =".points-nav-practice ul li"
    //Status Icon
    Icon_NotStudied = ".icon-not-studied"
    Icon_MidConf = ".icon-conf-mid"
    Icon_HighConf = ".icon-conf-high"


    SecondaryBeginPracticeAndPracticeAgain_BTN_Click(){
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.ClickForecefully(this.SecondaryBeginPracticeAndPracticeAgain_BTN)
    }

    BeginPracticeAndPracticeAgain_BTN_IsVisible(){
        const genericFunctions_abh = new GenericFunctions_Abh()
        return (genericFunctions_abh.IsVisible(this.BeginPracticeAndPracticeAgain_BTN))
    }

    BeginPracticeAndPracticeAgain_BTN_Click(){
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((ElemenText) => {
            if(ElemenText != " Continue Studying "){
                genericFunctions_abh.ClickOnElementUsingText(ElemenText);
            }else if(ElemenText == " Continue Studying "){
                this.SecondaryBeginPracticeAndPracticeAgain_BTN_Click()
            }
        })
    }

}