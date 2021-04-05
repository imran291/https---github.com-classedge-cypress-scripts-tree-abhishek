/// <reference types="cypress" />

import GenericFunctions from "../../support/GenericFunctions";
import GetUrl from "../../support/GetUrl";
import Login from "../../support/Login_po";
import HomePage from "../../support/HomePage_po";
import Config from "../../support/Config";
import StudyPlan_HomePage from "../../support/StudyPlan_HomePage"
import StudyPlan_MyLesson from "../../support/StudyPlan_MyLesson"
import Chapters from "../../support/Chapters_po";
import BookShelf from "../../support/BookShelf_po";
import StudyPlan_CreateStudyPlan from "../../support/StudyPlan_CreateStudyPlan"

describe("Study Plan Cases", () => {

    Cypress.config("defaultCommandTimeout", 60000)

    beforeEach(() => {
        const geturl = new GetUrl();
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetUrl(geturl.GetUrlForAutomation())
        genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    // afterEach(() => {
    //     const genericFunctions = new GenericFunctions();
    //     genericFunctions.ClearCookies()
    // })

    // http://pm2.testedgeonline.com:8080/browse/AA-1897?jql=project%20%3D%2010003%20and%20issuetype%20in%20(10104)
    // AA-1931
    //AA-1925, AA-1926, 

    /*
    TEST CASES DETAILS :- 

    1. AA-1923 > To Verify a Study Plan should be visible on landing page
    2. To Verify a Study Plan should be Clickable from the Home page
    3. To Verify a user should be shown Create the Study Plan When syllabus already selected

    */

    it ("AA-1923 > To Verify a Study Plan should be visible on Home page",() => {
        const login = new Login();
        const studyPlan_HomePage = new StudyPlan_HomePage();
        login.CommonLogin();
        studyPlan_HomePage.StudyPlan_BTN_Check_GetText().then((txt) => {
            expect(txt).to.be.true
        })
    })

    it ("To Verify a Study Plan should be Clickable from the Home page",() => {
        const login = new Login();
        const studyPlan_HomePage = new StudyPlan_HomePage();
        const studyPlan_MyLesson = new StudyPlan_MyLesson()
        const getUrl = new GetUrl()
        login.CommonLogin();
        studyPlan_HomePage.StudyPlan_BTN_Click()
        studyPlan_MyLesson.PageURl_Visible().then(pageUrl => {
            expect(pageUrl).to.equal(getUrl.CreateStudyPlan())
        })
    })

    it ("AA-1924 > To Verify user should be able to redirect himself towards study plan from Syllabus", () => {
        const login = new Login();
        const homePage = new HomePage();
        const chapter = new Chapters();
        const studyPlan_MyLesson = new StudyPlan_MyLesson()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        chapter.StudyPlan_TXT_Click()
        studyPlan_MyLesson.PageTitle_TXT_GetText().then(pageTitle => {
            expect(pageTitle).to.equal("Create Study Plan")
        })
    })

    it ("AA-1927 > To Verify a user should not be able to Create the Study Plan unless syllabus selected", () => {
        let dateAndTime = ""
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const studyPlan_CreateStudyPlan = new StudyPlan_CreateStudyPlan()
        const studyPlan_HomePage = new StudyPlan_HomePage()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        chapter.StudyPlan_TXT_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.StudyPlanAddToPortion_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        dateAndTime = studyPlan_CreateStudyPlan.StudyPlanGenerateDate("today")
        studyPlan_CreateStudyPlan.StudyPlaName_Type(dateAndTime)
        studyPlan_CreateStudyPlan.ActivePlan_BTN_Click()
        studyPlan_CreateStudyPlan.BeginStudying_BTN_Click()
        studyPlan_HomePage.StudyPlanTitle_TXT_GeText().then(date => {
            expect(date).to.equal(dateAndTime)
        })
    })

    it ("AA-1928 > To Verify a user should not be able to Create the Study Plan unless syllabus selected", () => {
        let dateAndTime = ""
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const studyPlan_CreateStudyPlan = new StudyPlan_CreateStudyPlan()
        const studyPlan_HomePage = new StudyPlan_HomePage()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        chapter.StudyPlan_TXT_Click()
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.StudyPlanAddToPortion_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        chapter.StudyPlanNextStep_BTN_Click()
        dateAndTime = studyPlan_CreateStudyPlan.StudyPlanGenerateDate("today")
        studyPlan_CreateStudyPlan.StudyPlaName_Type(dateAndTime)
        studyPlan_CreateStudyPlan.ActivePlan_BTN_Click()
        studyPlan_CreateStudyPlan.BeginStudying_BTN_Click()
        studyPlan_HomePage.StudyPlanTitle_TXT_GeText().then(date => {
            expect(date).to.equal(dateAndTime)
        })
    })

    it ("AA-1929 > To Verify User should be able to navigate to the Select portion page during study plan creation", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        chapter.StudyPlan_TXT_Click()
        bookshelf.BookShelfTitle_TXT_GeText().then(bookShelfTitle => {
            expect(bookShelfTitle).to.equal("Select Portion")
        })
    })

    it ("AA-1930 > To Verify User should be able to navigate to the Books> Chapters>Topics to select as the portion during study plan creation", () => {
        const login = new Login();
        const homePage = new HomePage();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        chapter.StudyPlan_TXT_Click()
        bookshelf.SelectRandomBook();
        chapter.StudyPlanTopicTitle_TXT_GeText().then(topicTitle =>{
            expect(topicTitle).to.contain("Select Topics from")
        })
    })

    // it.only("AA-1931 > To Verify User should be able to select the Books > Chapters > Topics as the portion during study plan creation", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const bookshelf = new BookShelf();
    //     const chapter = new Chapters();
    //     const studyPlan_CreateStudyPlan = new StudyPlan_CreateStudyPlan()
    //     const studyPlan_HomePage = new StudyPlan_HomePage()
    //     login.CommonLogin();
    //     homePage.Syllabus_WE_Click()
    //     chapter.StudyPlan_TXT_Click()
    //     bookshelf.SelectRandomBook();
        
    // })

})