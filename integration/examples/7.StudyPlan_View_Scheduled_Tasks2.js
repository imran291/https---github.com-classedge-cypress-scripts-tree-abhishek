/// <reference types="cypress" />

import 'cypress-wait-until';

//Abh
import GenericFunctions_Abh from "../../support/GenericFunctions_Abh"
import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh"
import StudyPlan_Myplans_Abh from "../../support/StudyPlan_my-plans_Abh"
import StudyPlan_Progress_Abh from "../../support/StudyPlan_progress_Abh";
import StudyPlan_HomePage_Abh from "../../support/StudyPlan_HomePage_Abh"
// import StudyPlan_CreateStudyPlan_Abh from "../../support/StudyPlan_CreateStudyPlan_Abh";
import StudyPlan_Schedule_Abh from "../../support/StudyPlan_schedule_Abh";
// import StudyPlan_MyLesson_Abh from "../../support/StudyPlan_MyLesson_Abh"
import GetUrl_Abh from "../../support/GetUrl_Abh";
import Config_Abh from "../../support/Config_Abh";
import Login_Abh from "../../support/Login_po_Abh";

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 60000)

    beforeEach(() => {
        const geturl_abh = new GetUrl_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetUrl(geturl_abh.GetUrlForAutomation())
        // genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    it("25 -AFS-1045-MyLesson-Locked Lesson- To Verify locked lessons are un-tappable and non functional ", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(10000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Content_Lock_Icon)
            .parents(studyPlan_MyLesson_abh.StudyPlan_Todays_Content).click()
        cy.wait(5000)
        genericFunctions_abh.GetElement(studyPlan_MyLesson_abh.StudyPlan_Content_Lock_Icon)
            .parents(studyPlan_MyLesson_abh.StudyPlan_Todays_Content).should("be.visible")
    })

    it("28-AFS-1045-MyLessons-Schedued List-To Verify user should be able to navigate to the schedule list page of the plan", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();;
        login_abh.CommonLogin();
        cy.wait(10000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
    })

    it("29-AFS-1045- MyLessons-Schedued List-To Verify user should be able to see the full schedule list of the plan", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(10000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Todays_Schedule_Lessons)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Upcoming_Schedule_Lessons)

    })

    it("30-AFS-1045-MyLessons-Schedued List-To Verify user should be able to see the full schedule list of the plan arranged weekly",()=>{

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(10000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Date_Tab)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Todays_Date_Tab)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Todays_Schedule_Lessons)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Upcoming_Schedule_Lessons)
    })

    it("32-AFS-1045-MyLessons-Schedued List- To Verify user should be shown filter on scheduled list", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(10000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Filter_Icon)
    })

    it("34-AFS-1045-MyLessons-Schedued List-To Verify user should be shown various filter options on scheduled list ", () => {

        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        cy.scrollTo("bottom").wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Filter_Icon)
        cy.wait(2000)
        genericFunctions_abh.ClickForecefully(studyPlan_Schedule_abh.StudyPlan_Filter_Icon)
        cy.wait(2000)
        genericFunctions_abh.GetElement(studyPlan_Schedule_abh.StudyPlan_FilterElements_WithCheckboxs).each(($ele) => {
            cy.wrap($ele).scrollIntoView().wait(1000).should("be.visible").within(() => {
                genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Filter_Checkbox)
            })
        })
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Filter_ApplyBtn)

    })

    it("35-AFS-1045-MyLessons-Schedued List-To Verify various filter options shown in the scheduled list should be functional",()=>{
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const studyPlan_Schedule_abh = new StudyPlan_Schedule_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const getUrl = new GetUrl_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(2000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        cy.wait(2000)
        cy.scrollTo("bottom").wait(1000)
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_ViewFullSchedule)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FullSchedule_Text)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_Filter_Icon)
        genericFunctions_abh.ClickForecefully(studyPlan_Schedule_abh.StudyPlan_Filter_Icon)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.StudyPlan_FilterElements_WithCheckboxs)
        genericFunctions_abh.GetElement(studyPlan_Schedule_abh.StudyPlan_FilterElements_WithCheckboxs).each(($ele) => {
            cy.wrap($ele)
            genericFunctions_abh.Click($ele)
        })
        genericFunctions_abh.Click(studyPlan_Schedule_abh.StudyPlan_Filter_ApplyBtn)
        genericFunctions_abh.IsVisible(studyPlan_Schedule_abh.All_Lessons)
 
    })

    it("38-AFS-1045-My Lessons- Manage and Create Plan- To Verify Manage and Create Plan button is tappable", () => {
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)

    })

    it("39-AFS-1045-My Lessons- Manage and Create Plan-To Verify Manage and Create Plan button is Functional", () => {
        var plan_text
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        genericFunctions_abh.GetElement(studyPlan_HomePage_abh.StudyPlan_BTN).then(($ele) => {
            plan_text = $ele.text().slice(7)

            studyPlan_HomePage_abh.StudyPlan_BTN_Click()
            cy.wait(1000)
            studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
                expect(pageUrl).to.be.true
            })
            genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)
            genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)
            genericFunctions_abh.IsVisibleWithContains(studyPlan_Myplans_abh.Active_Plan_Text)
            genericFunctions_abh.IsVisibleWithContains(plan_text)
            genericFunctions_abh.IsVisibleWithContains(studyPlan_Myplans_abh.Other_Plans_Txt)
            genericFunctions_abh.IsVisible(studyPlan_Myplans_abh.Other_Plans)
            genericFunctions_abh.IsVisible(studyPlan_Myplans_abh.StudyPlan_Btn)
        })

    })

    it("40-AFS-1045-My Lessons- Manage and Create Plan-To Verify User should be able to review the Active plan"
        +" from Manage and Create button", () => {
    
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)
        genericFunctions_abh.IsVisible(studyPlan_Myplans_abh.Active_Plan_Tab)
        genericFunctions_abh.Click(studyPlan_Myplans_abh.Active_Plan_Tab)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)

    })

    it("41-AFS-1045-My Lessons- Manage and Create Plan-To Verify User should be able to reactivate the older plans"
        +" from the list of Other Plans from Manage and Create button", () => {
    
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
        const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
        const studyPlan_Progress_abh = new StudyPlan_Progress_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Myplans_abh.Other_Plans_Txt)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Myplans_abh.Other_Plans,"0")
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Progress_abh.Url)
        genericFunctions_abh.Click(studyPlan_Progress_abh.Activate_Plan_Button)
        genericFunctions_abh.IsVisibleWithContains(studyPlan_Create_abh.Update_Portion_Text)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Create_abh.Bookshelf_Subjects,"0")
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Create_abh.Select_Topic,"1")
        genericFunctions_abh.ClickForecefully(studyPlan_Create_abh.Add_Portion_Btn)
        cy.wait(2000)
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        cy.wait(2000)
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        genericFunctions_abh.GetElement(studyPlan_Create_abh.First_Feasible_Date).next().click()
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        cy.wait(2000)
        studyPlan_Create_abh.ActivePlan_BTN_Click()
        studyPlan_Create_abh.BeginStudying_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
    })

    it("42-AFS-1045-My Lessons- Manage and Create Plan-To Verify User should be able to create a new plan"
        +" from the Manage and Create button",()=>{
        const login_abh = new Login_Abh();
        const studyPlan_HomePage_abh = new StudyPlan_HomePage_Abh();
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh();
        const genericFunctions_abh = new GenericFunctions_Abh();
        const studyPlan_Create_abh = new StudyPlan_CreateStudyPlan_Abh();
        const studyPlan_Myplans_abh = new StudyPlan_Myplans_Abh();
        login_abh.CommonLogin();
        cy.wait(15000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
        cy.wait(1000)
        studyPlan_HomePage_abh.StudyPlan_BTN_Click()
        cy.wait(1000)
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })
        genericFunctions_abh.ClickForecefully(studyPlan_MyLesson_abh.StudyPlan_Manage_and_Create_Plan_button)
        genericFunctions_abh.AssertCurrentUrlWithText(studyPlan_Myplans_abh.MyPlans_Url)
        genericFunctions_abh.Click(studyPlan_Create_abh.StudyPlan_Btn)
        cy.wait(2000)
        genericFunctions_abh.ClickOnSingleElementWithoutForce(studyPlan_Create_abh.Bookshelf_Subjects,"0")
        cy.wait(2000)
        genericFunctions_abh.ClickOnSingleElement(studyPlan_Create_abh.Select_Topic,"0")
        genericFunctions_abh.ClickForecefully(studyPlan_Create_abh.Add_Portion_Btn)
        cy.wait(2000)
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        cy.wait(2000)
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        cy.wait(2000)
        genericFunctions_abh.ClickOnElementUsingText("Next Step")
        cy.wait(2000)
        studyPlan_Create_abh.ActivePlan_BTN_Click()
        studyPlan_Create_abh.BeginStudying_BTN_Click()
        studyPlan_MyLesson_abh.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.be.true
        })

    })
})
