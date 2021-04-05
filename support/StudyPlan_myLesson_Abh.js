import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import GetUrl from "../support/GetUrl"

export default class StudyPlan_MyLesson_Abh {

    StudyPlan_MenuIcon = ".justify-content-start span"
    StudyPlan_Name = ".container-fluid > .d-flex >h2"
    StudyPlan_Ring = ".rings"//.rings // .col-xl-4"
    StudyPlan_Today_tab = ".cmn-today-cards > .head > .heading2"
    StudyPlan_Upcoming_tab = ".cmn-upcoming-cards > .head > .heading2"
    StudyPlan_ViewFullSchedule = ".p18 button"
    StudyPlan_Pause_Activate_Button = ".icon-pause.icon"
    StudyPlan_Name_In_Footer = ".footer-info > h1"
    StudyPlan_Portion_Progress_Bar = ".progress-con > :nth-child(1)"
    StudyPlan_Time_Progress_Bar = ".progress-con > :nth-child(2)"
    StudyPlan_Review_Plan_Button = ".action-section > :nth-child(1)"
    StudyPlan_Manage_and_Create_Plan_button = ".action-section > .btn-sm"
    StudyPlan_Ring_Default_Mins = "g[aria-label^='0 of'][aria-label$='mins']"
    StudyPlan_Ring_Default_Tasks = "g[aria-label^='0 of'][aria-label$='tasks']"
    StudyPlan_Ring_Default_Stars = "g[aria-label^='0 of'][aria-label$='stars']"
    StudyPlan_Ring_Current_Mins = 'g[aria-label*="of"][aria-label$="mins"]'
    StudyPlan_Ring_Current_Tasks = 'g[aria-label*="of"][aria-label$="tasks"]'
    StudyPlan_Ring_Current_Stars = 'g[aria-label*="of"][aria-label$="stars"]'
    StudyPlan_Content_Title_Tab = ".info-detail"
    StudyPlan_BigIdea1_Time = ".mr-3"
    StudyPlan_Continue_Studying_Btn = '.btn.btn-sm.btn-outline-secondary'
    StudyPlan_Begin_Revision_Tab = "button.btn.btn-outline-primary"
    StudyPlan_Revise_Continue_Btn = ".btn-skip-continue"
    StudyPlan_Revise_Back_Btn = "button .icon-back"
    StudyPlan_Task_To_Complete_Today = ".body-bold-light"
    StudyPlan_Todays_Content = ".cmn-today-cards > .ng-star-inserted"
    StudyPlan_Upcoming_Content = ".cmn-upcoming-cards > .ng-star-inserted"
    StudyPlan_Highlited_Content = ".primary"
    StudyPlan_Unlocked_Dropdown_Btn = ".cmn-today-cards > .ng-star-inserted button.dropdown-toggle"
    StudyPlan_All_Content = ".bor-bot"
    StudyPlan_Content_Lock_Icon = "#security"
    StudyPlan_Todays_LessonsType = ".cmn-today-cards > .ng-star-inserted .lesson-type"
    StudyPlan_Lessons_Type = ".lesson-type"
    SudyPlan_BigIdea_Lesson_Text = "BigIdea"
    SudyPlan_Revise_Lesson_Text = "Revise"
    SudyPlan_Practice_Lesson_Text = "Practice"
    SudyPlan_Summary_Lesson_Text = "Summary"
    SudyPlan_Summary_Test_Text = "Test"
    StudyPlan_ReturnToStudyPlan_BtnText = "Return to Study Plan"
    STudyPlan_ContinueStudying_BtnText = " Continue Studying "
    StudyPlan_TodaysLessons_Time = ".cmn-today-cards > .ng-star-inserted .mr-3"
    StudyPlan_Ring_TickMark = "path[stroke-width='30']"
    Lesson_Dropdown_Btn= ".dropdown-toggle"
    Lesson_MarkAsCompplete_Btn = ".dropdown-item"
    Lesson_TickMark = ".check-svg"
    //from old myLesson
    PageTitle_TXT = ".heading1.text-truncate"
    PausePlan_WE = ".btn.btn-outline-primary"

    HandleElement(element) {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var ele = [] 
        cy.document().then((doc) => {
            var x = doc.querySelector(element)
            if (x == null) {
                ele.push(false)
                cy.wait(2000)
            }
            else{
                ele.push(true)
            }
        })
        return ele
    }

    StudyPlan_Complete_Todays_Lessons() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetElement(this.StudyPlan_Todays_Content).then(($el) => {
            var flag = 0
            var EL = $el.length
            for (var flag = 0; flag < EL; flag++) {

                genericFunctions_abh.GetSpecificElement(this.StudyPlan_Todays_LessonsType, `${flag}`).then(($ele) => {
                    if ($ele.text() == "BigIdea") {
                        cy.wrap($ele).parents(this.StudyPlan_Todays_Content).click()
                        genericFunctions_abh.ClickWithCustomeTime(this.StudyPlan_Continue_Studying_Btn, "6000000")
                    }
                    else if ($ele.text() == "Revise") {
                        cy.wrap($ele).parents(this.StudyPlan_Todays_Content).click()
                        genericFunctions_abh.GetElementWithTimeout(".bullet span", "6000000").then(($ele) => {
                            var L = $ele.length
                            for (var i = 0; i < L; i++) {
                                if (i == 0) {
                                    genericFunctions_abh.ClickOnElementUsingTextWithoutForce(" Begin Revision ")
                                }
                                genericFunctions_abh.ClickOnElementUsingTextWithTimeWithoutForce(" Continue ", "6000000")
                                genericFunctions_abh.ClickOnElementUsingTextWithTimeWithoutForce(" Skip ", "6000000")
                                genericFunctions_abh.ClickOnElementUsingTextWithTimeWithoutForce(" Continue ", "6000000")
                            }
                        })
                        genericFunctions_abh.ClickOnSingleElementWithoutForce("button.btn.btn-icon", "0")
                    }
                    else if ($ele.text() == "Practice") {
                        cy.wrap($ele).parents(this.StudyPlan_Todays_Content).click()
                        genericFunctions_abh.ClickOnElementUsingTextWithoutForce(" Begin Practice ")
                        genericFunctions_abh.GetElementWithTimeout(".qusn-top-actions .row div:nth-child(1)").then(($ele) => {
                            var L1 = $ele.text()
                            L1 = parseInt(L1.slice(5))
                            for (var k = 0; k < L1; k++) {
                                genericFunctions_abh.GetElementWithTimeout("tce-option.tick.ng-star-inserted input", "6000000").each(($ele) => {
                                    cy.wrap($ele).click({ force: true })
                                })
                                genericFunctions_abh.ClickOnElementUsingTextWithTime(" Check Answer", "6000000")
                                genericFunctions_abh.ClickOnElementUsingTextWithTime(" Continue", "6000000")
                            }
                        })
                        genericFunctions_abh.ClickOnSingleElementWithoutForce("button.btn.btn-icon", "0")
                    }

                    else if ($ele.text() == "Summary") {
                        cy.wrap($ele).parents(this.StudyPlan_Todays_Content).within(() => {
                            genericFunctions_abh.Click(".dropdown-toggle")
                            cy.wait(2000)
                            genericFunctions_abh.Click(".dropdown-item")
                        })
                    }

                    else if ($ele.text() == "Test") {
                        cy.wrap($ele).parents(this.StudyPlan_Todays_Content).within(() => {
                            genericFunctions_abh.ClickForecefully(".dropdown-toggle")
                            cy.wait(2000)
                            genericFunctions_abh.ClickForecefully(".dropdown-item")
                        })
                    }
                })
            }
        })

    }

    //from old myLesson

    PageTitle_TXT_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(2000)
        return (genericFunctions_abh.GetTextFromElement(this.PageTitle_TXT))
    }

    PageURl_Visible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        const getUrl = new GetUrl()
        genericFunctions_abh.wait(2000)
        return (genericFunctions_abh.GetCurrentPageUrl().then(currentUrl => {
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
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromAllElements(this.PausePlan_WE))
    }


}