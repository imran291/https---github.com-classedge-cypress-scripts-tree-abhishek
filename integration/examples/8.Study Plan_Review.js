/// <reference types="cypress" />

import 'cypress-wait-until';
import { should } from 'chai';
//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh";
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_PortionBook_Abh from "../../support/StudyPlan_portion-book_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh";
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 40000)

    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it("1 - AFS-1046 -Review Plan-Navigation- To Verify user should be able to navigate to review  plan ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.scrollTo("bottom")
        cy.wait(1000)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
    })

    it("2 - AFS-1046 -Review Plan-Navigation- To Verify Review plan tab is functional ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        cy.scrollTo("bottom")
        cy.wait(1000)
        genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
    })

    it("3 - AFS-1046 -Review Plan-Content- To Verify User should be able to view the contents of Review Plan page ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        cy.scrollTo("bottom")
        cy.wait(1000)
        genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        cy.wait(5000)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.Progress_Graph)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.Portion_Progress_Bar)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "1", studyPlan_Progress.Pause_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0",
            studyPlan_Progress_abh.DeadlineTab_Heading)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1",
            studyPlan_Progress_abh.PortionTab_Heading)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "2",
            studyPlan_Progress_abh.PauseTab_Heading)

    })

    it("5 - AFS-1046 -Review Plan-Graph - To Verify User should be able to view the progress of the active plan datewise ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.IsVisible(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        cy.scrollTo("bottom")
        cy.wait(1000)
        genericFunctions_abh.Click(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        cy.wait(5000)
        genericFunctions_abh.GetElement(studyPlan_Progress_abh.Graph_Dates).then(($ele) => {
            cy.wrap($ele)
            var L = $ele.length
            for (var i = 1; i < L; i++) {
                genericFunctions_abh.GetSpecificElement($ele, `${i}`).then(($el) => {
                    genericFunctions_abh.GetElement($el).trigger("mousemove", -50, -50, { force: true })
                    genericFunctions_abh.GetElement(studyPlan_Progress_abh.Planned_vs_Required_vs_Actual_Flow_Box).should("be.visible")
                })
            }
        })

    })

    it(" 11 - AFS-1046 -Review Plan-PortionProgressBar - Verify User should be shown progress bar of each subject" +
        "added in the review plan page", () => {

            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
            genericFunctions_abh.IsVisibleForMultiElements(studyPlan_Progress_abh.Portion_Progress_Bar)
        })

    it(" 15 - AFS-1046 -Review Plan-PortionProgressBar - Verify the subject shown in the review page is tappable", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const studyPlan_PortionBook_abh = new StudyPlan_PortionBook_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        cy.scrollTo("bottom")
        cy.wait(1000)
        genericFunctions_abh.ClickOnFirstElement(studyPlan_Progress_abh.Portion_Subjects)
        cy.wait(1000)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PortionBook_abh.Url)
    })

    it(" 16 - AFS-1046 -Review Plan-PortionProgressBar - Verify on tapping the subject shown in the review page," +
        "user should be shown the portion added to that subject in the active plan", () => {
            const login_abh = new Login_Abh();
            const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
            const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
            const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
            const studyPlan_PortionBook_abh = new StudyPlan_PortionBook_Abh();
            const genericFunctions_abh = new GenericFunctions_Abh();
            login_abh.CommonLogin();
            cy.wait(15000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
                expect(txt).to.be.true
            })
            cy.wait(1000)
            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            cy.wait(1000)
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
            cy.scrollTo("bottom")
            cy.wait(1000)
            genericFunctions_abh.ClickOnFirstElement(studyPlan_Progress_abh.Portion_Subjects)
            cy.wait(1000)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_PortionBook_abh.Url)
            genericFunctions_abh.IsVisible(studyPlan_PortionBook_abh.Portion_Added_In_ActivePlan)
        })

    it(" 18 - AFS-1046 -Review Plan-PortionProgressBar - Verify the subject shown in the review page is tappable", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.Plan_Detail_tab)
    })

    it("19 -AFS-1046-Review Plan-PortionProgressBar-Verify user should be shown the details of the plan in Plan Detail Tab", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.Plan_Detail_tab)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.DailyStudyGoal_And_PlanEndDate_info)
        genericFunctions_abh.IsVisible(studyPlan_Progress_abh.CurrentWeek_Info)
    })

    it("22 -AFS-1046-Review Plan-EditPlan-Verify  Deadline under Modify tab is functional", () => {
        const login_abh = new Login_Abh();;
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0",
            studyPlan_Progress_abh.DeadlineTab_Heading)
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Review_Deadline_Text)
        genericFunctions_abh.IsVisible(studyPlan_Create_abh.Calendar)

    })
})