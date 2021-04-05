import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import GetUrl from "../support/GetUrl"

export default class StudyPlan_PausedPlan {

    PausedPlan_Url = "https://afs-qa-learn.testedgeonline.com/study-plan/paused-plan"
    Resume_Plan_Txt = " Resume Plan "
    SelectAnotherPlan_Text = " Select another plan"
    MenuIcon = ".justify-content-start span"
    Resume_Plan = ".btn.btn-outline-primary"



    HandlePausedPlan() {
        const genericFunctions_abh = new GenericFunctions_Abh()
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Resume_Plan)
            if (x !== null) {
                if (x.textContent == this.Resume_Plan_Txt) {
                    // cy.scrollTo("bottom").wait(1000)
                    genericFunctions_abh.ClickOnElementUsingText(this.Resume_Plan_Txt)
                    cy.wait(2000)
                }

            }
        })
    }
}