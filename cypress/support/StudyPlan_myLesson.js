import GenericFunctions from "../support/GenericFunctions"
import GetUrl from "../support/GetUrl"


export default class StudyPlan_MyLesson {

    PageTitle_TXT = ".heading1.text-truncate"
    PausePlan_WE = ".btn.btn-outline-primary"

    PageTitle_TXT_GetText() {
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        return (genericFunctions.GetTextFromElement(this.PageTitle_TXT))
    }

    PageURl_Visible() {
        const genericFunctions = new GenericFunctions();
        const getUrl = new GetUrl()
        genericFunctions.wait(2000)
        return (genericFunctions.GetCurrentPageUrl().then(currentUrl => {
            if (currentUrl.includes("my-lesson")) {
                if (currentUrl == getUrl.StudyPlanUrl()) {
                    return true
                }
            } else if (currentUrl.includes("paused-plan")) {
                return false
            } else if (currentUrl.includes("")) {

            }
        }))
    }

    PausePlan_WE_GetTextFromAllElements() {
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromAllElements(this.PausePlan_WE))
    }

}