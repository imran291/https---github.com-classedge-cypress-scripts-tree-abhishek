import GenericFunctions from "../support/GenericFunctions"

export default class Practice_IntroWithTQ{

    BeginPracticeAndPracticeAgain_BTN = "button.btn.btn-outline-primary:nth-child(1)"
    SecondaryBeginPracticeAndPracticeAgain_BTN = "button.btn.btn-outline-secondary"


    SecondaryBeginPracticeAndPracticeAgain_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.SecondaryBeginPracticeAndPracticeAgain_BTN)
    }

    BeginPracticeAndPracticeAgain_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.BeginPracticeAndPracticeAgain_BTN))
    }

    BeginPracticeAndPracticeAgain_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((ElemenText) => {
            if(ElemenText != " Continue Studying "){
                genericFunctions.ClickOnElementUsingText(ElemenText);
            }else if(ElemenText == " Continue Studying "){
                this.SecondaryBeginPracticeAndPracticeAgain_BTN_Click()
            }
        })
    }

}