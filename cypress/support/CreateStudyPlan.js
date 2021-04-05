import GenericFunctions from "../support/GenericFunctions"

export default class CreateStudyPlan{

    CreatePlanTitle_TXT = ".heading1.text-truncate"


    CreatePlanTitle_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.CreatePlanTitle_TXT))
    }

}