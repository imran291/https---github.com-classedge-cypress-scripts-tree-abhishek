import GenericFunctions from "./GenericFunctions"

export default class Assignment_Chapter{

    NextStep_BTN = ".button-action-wrapper .btn-outline-primary"

    NextStep_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        genericFunctions.ClickForecefully(this.NextStep_BTN)
    }

}