import GenericFunctions from "../support/GenericFunctions"

export default class StudyPlan_CreateStudyPlan{

    StudyPlaName = ".form-control"
    ActivePlan_BTN = "button.btn.btn-outline-primary"
    BeginStudying_BTN = ".text > .btn"
    

    StudyPlanGenerateDate(day){
        let date = ""
        const genericFunctions = new GenericFunctions()
        date = genericFunctions.GenerateDate(day)
        date = date.replaceAll(" ", "-")
        return date
    }

    StudyPlaName_Type(date){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        this.StudyPlaName_Clear()
        genericFunctions.Type(this.StudyPlaName, date)
        return date
    }

    StudyPlaName_Clear(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Clear(this.StudyPlaName)
    }

    ActivePlan_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        genericFunctions.ClickForecefully(this.ActivePlan_BTN)
    }

    BeginStudying_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.BeginStudying_BTN)
    }

}