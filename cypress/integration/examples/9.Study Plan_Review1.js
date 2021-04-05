/// <reference types="cypress" />

import 'cypress-wait-until';
import { should } from 'chai';
import { Runnable } from 'mocha';
//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh";
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_PortionBook_Abh from "../../support/StudyPlan_portion-book_Abh";
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh";
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";
import Chapters_Abh from "../../support/Chapters_po_Abh";

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 40000)


    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it("23 - AFS-1046 - Review Plan-EditPlan - Verify user should be able to modify the plans deadline", () => {
        const login_abh = new Login_Abh();
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
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Review_Deadline_Text)
        genericFunctions_abh.IsVisible(studyPlan_Create_abh.Calendar)
        genericFunctions_abh.GetElement(studyPlan_Create_abh.StudyHours_EveryDay).then(($ele) => {
            var hour = $ele.text()
            cy.log(hour)
            cy.wait(2000)
            genericFunctions_abh.GetElement(studyPlan_Create_abh.Plan_EndDate).parents(studyPlan_Create_abh.Calendar_Weeks)
                .next().children().eq("0").click({ force: true })
            cy.wait(2000)
            genericFunctions_abh.GetElement(studyPlan_Create_abh.StudyHours_EveryDay).then(($ele) => {
                cy.wait(2000)
                cy.wrap($ele)
                var UpdatedHour = $ele.text()
                cy.log(UpdatedHour)
                cy.wait(2000)
                expect(UpdatedHour).is.not.equal(hour)
            })
        })
    })

    it("24 - AFS-1046 - Review Plan-EditPlan - Verify user should be able to activate the plan with the modified deadline", () => {

        const login_abh = new Login_Abh();
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
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Review_Deadline_Text)
        genericFunctions_abh.IsVisible(studyPlan_Create_abh.Calendar)
        genericFunctions_abh.GetElement(studyPlan_Create_abh.Plan_EndDate).parents(studyPlan_Create_abh.Calendar_Weeks)
            .next().children().eq("0").click({ force: true })
        genericFunctions_abh.ClickOnElementUsingText(studyPlan_Create_abh.Next_Button_Text)
        studyPlan_Create_abh.ActivePlan_BTN_Click()
        studyPlan_Create_abh.BeginStudying_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
    })

    it("25 - AFS-1046- Review Plan-EditPlan- Verify user should not be able to activate the plan with the unfeasible deadline", () => {

        const login_abh = new Login_Abh();
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
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Review_Deadline_Text)
        genericFunctions_abh.IsVisible(studyPlan_Create_abh.Calendar)
        genericFunctions_abh.GetElement(studyPlan_Create_abh.Todays_Date).should("have.css", "pointer-events", "none")

    })

    it("26 - AFS-1046- Review Plan-EditPlan- Verify user should be able to view the modified deadline of the plan", () => {

        const login_abh = new Login_Abh();
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
        cy.wait(2000)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        genericFunctions_abh.GetElement(studyPlan_Progress_abh.DailyStudyGoal_And_PlanEndDate_info).then(($ele) => {
            var info = $ele.text()
            genericFunctions_abh.ClickOnSingleElement(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "0")
            genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Review_Deadline_Text)
            genericFunctions_abh.IsVisible(studyPlan_Create_abh.Calendar)
            genericFunctions_abh.GetElement(studyPlan_Create_abh.Plan_EndDate).parents(studyPlan_Create_abh.Calendar_Weeks)
                .next().children().eq("1").click({ force: true })
            cy.wait(2000)
            genericFunctions_abh.ClickOnElementUsingText(studyPlan_Create_abh.Next_Button_Text)
            studyPlan_Create_abh.ActivePlan_BTN_Click()
            studyPlan_Create_abh.BeginStudying_BTN_Click()
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
            genericFunctions_abh.GetElement(studyPlan_Progress_abh.DailyStudyGoal_And_PlanEndDate_info).then(($el) => {
                var UpdatedInfo = $el.text()
                expect(UpdatedInfo).to.be.not.equal(info)
            })
        })
    })

    it("28 - AFS-1046- Review Plan-EditPlan- Verify  Portion under Modify tab is functional", () => {

        const login_abh = new Login_Abh();
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
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress_abh.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1",
            studyPlan_Progress_abh.PortionTab_Heading)
        cy.scrollTo("center").wait(1000)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Update_Portion_Text)
    })

    it("30 - AFS-1046-Review Plan-EditPlan- Verify user should be shown the count of Chapters/Topics selected/Edited after modifying the portion ", () => {

        const login_abh = new Login_Abh();
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
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress_abh.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1",
            studyPlan_Progress_abh.PortionTab_Heading)
        cy.scrollTo("center").wait(1000)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Update_Portion_Text)
        genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Bookshelf_Subject_Topic_Selected, "0").then(($ele) => {
            var Topics = $ele.text()
            cy.wrap($ele).parents(studyPlan_Create_abh.Bookshelf_Subjects).click()
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "0").click()
            cy.scrollTo("center").wait(1000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "1").click()
            cy.wait(2000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "5").scrollIntoView().click()
            cy.wait(2000)
            genericFunctions_abh.Click(studyPlan_Create_abh.Update_Portion_Btn)
            cy.wait(2000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Bookshelf_Subject_Topic_Selected, "0").then(($el) => {
                cy.wait(2000)
                var Updated_Topics = $el.text()
                cy.wait(2000)
                expect(Updated_Topics).to.be.not.equal(Topics)
            })
        })
    })

    it("31 - AFS-1046-Review Plan-EditPlan- Verify user should be able to discard the modified portion during editing ", () => {

        const login_abh = new Login_Abh();
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
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress_abh.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1",
            studyPlan_Progress_abh.PortionTab_Heading)
        cy.scrollTo("center").wait(1000)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Update_Portion_Text)
        genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Bookshelf_Subject_Topic_Selected, "0").then(($ele) => {
            var Topics = $ele.text()
            cy.wrap($ele).parents(studyPlan_Create_abh.Bookshelf_Subjects).click()
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "0").click()
            cy.scrollTo("center").wait(1000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "1").click()
            cy.wait(2000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "5").scrollIntoView().click()
            cy.wait(2000)
            genericFunctions_abh.Click(studyPlan_Create_abh.Update_Portion_Btn)
            cy.wait(2000)
            genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Bookshelf_Subject_Topic_Selected, "0").then(($el) => {
                cy.wait(2000)
                var Updated_Topics = $el.text()
                cy.wait(2000)
                expect(Updated_Topics).to.be.not.equal(Topics)
            })
        })
        genericFunctions_abh.Click(studyPlan_Create_abh.Bookshelf_Delete_Icon)
        genericFunctions_abh.ClickOnElementUsingText(studyPlan_Create_abh.Bookshelf_Discard_PopUp_Text)
        cy.wait(2000)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
    })

    it("33-AFS-1046-Review Plan-EditPlan-Verify user should be able to view the modified portion added to the plan", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const chapter_abh = new Chapters_Abh();
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
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Modify_Pause_Text, "0", studyPlan_Progress_abh.Modify_Text)
        genericFunctions_abh.IsVisibleForSingleElementWithText(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1",
            studyPlan_Progress_abh.PortionTab_Heading)
        cy.scrollTo("center").wait(1000)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Progress_abh.Deadline_Portion_Pause_Tab, "1")
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Update_Portion_Text)
        genericFunctions_abh.GetElement(studyPlan_Create_abh.Bookshelf_Political_Science)
            .find(studyPlan_Create_abh.Bookshelf_Subject_Topic_Selected).then(($ele) => {
                var Topics = $ele.text()
                cy.wrap($ele).parents(studyPlan_Create_abh.Bookshelf_Subjects).click()
                genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "0").click()
                cy.scrollTo("center").wait(1000)
                genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "1").click()
                cy.wait(2000)
                genericFunctions_abh.GetSpecificElement(studyPlan_Create_abh.Select_Topic, "5").scrollIntoView().click()
                cy.wait(2000)
                genericFunctions_abh.Click(studyPlan_Create_abh.Update_Portion_Btn)
                cy.wait(2000)
                genericFunctions_abh.GetElement($ele).then(($ele) => {
                    cy.wait(2000)
                    var Updated_Topics = $ele.text()
                    var Total_Topics = Updated_Topics.slice(1, 9)
                    cy.wait(2000)
                    expect(Updated_Topics).to.be.not.equal(Topics)
                    chapter_abh.StudyPlanNextStep_BTN_Click()
                    chapter_abh.StudyPlanNextStep_BTN_Click()
                    genericFunctions_abh.Click(studyPlan_Create_abh.First_Feasible_Date)
                    chapter_abh.StudyPlanNextStep_BTN_Click()
                    studyPlan_Create_abh.ActivePlan_BTN_Click()
                    studyPlan_Create_abh.BeginStudying_BTN_Click()
                    studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                        expect(pageUrl).to.be.true
                    })
                    cy.wait(1000)
                    genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Review_Plan_Button)
                    genericFunctions_abh.GetElement(studyPlan_Create_abh.Bookshelf_Political_Science)
                        .find(studyPlan_Progress_abh.Subject_Topics_Selected_Text).then(($el) => {
                            var Topic_selected = $el.text()
                            expect(Topic_selected).to.be.include(Total_Topics)
                        })
                })
            })

    })
})