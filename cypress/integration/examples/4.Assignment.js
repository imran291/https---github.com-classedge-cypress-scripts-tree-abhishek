/// <reference types="cypress" />

import Login from "../../support/Login_po";
import Config from "../../support/Config"
import GetUrl from "../../support/GetUrl";
import GenericFunctions from "../../support/GenericFunctions"
import HomePage from "../../support/HomePage_po";
import Assignment from "../../support/Assignment"
import Assignment_BookShelf from "../../support/Assignment_BookShelf"
import Assignment_IntroTQ from "../../support/Assignment_IntroTQ"
import Assignment_Chapter from "../../support/Assignment_Chapter"
import BookShelf from "../../support/BookShelf_po";
import Chapters from "../../support/Chapters_po";
import AssignmentPreview from "../../support/AssignmentPreview"
import IntroWithTQ from "../../support/Revision_IntroWithTQ_po";
import HamburgerMenu from "../../support/HamburgerMenu_po"
import Task from "../../support/Task"
import AssignmentComplete from "../../support/AssignmentComplete"

describe("Assignment Test Cases", () => {

    Cypress.config("defaultCommandTimeout", 60000)

    beforeEach(() => {
        const geturl = new GetUrl();
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClearLocalStorage()
        genericFunctions.ClearCookies()
        genericFunctions.GetUrl(geturl.GetUrlForAutomation())
        genericFunctions.UnRegisterServiceWorkerOfBrowser()
        // genericFunctions.ReloadPage()
    })

    // afterEach(() => {
    //     const genericFunctions = new GenericFunctions();
    //     genericFunctions.ClearLocalStorage()
    //     genericFunctions.ClearCookies()
    // })

    //http://pm2.testedgeonline.com:8080/browse/AA-1827?jql=project%20%3D%20AA%20AND%20issuetype%20%3D%20%22Test%20Set%22%20ORDER%20BY%20updatedDate%20DESC
    ///AA-1844
    //Completion of Assignment => .today-cards :nth-child(89) .card.flex-row
    //cant be automate AA-1840, AA-1842, AA-1844

    it ("To verify that assignment is visible on the home page", () => {
        const login = new Login();
        const assignment = new Assignment()
        login.CommonLogin();
        assignment.AssignTopic_Assignment_IsVisible().then((Assignment_IsVisible) => {
            expect(Assignment_IsVisible).to.be.true
        })
    })

    it ("To verify that Digital Test is visible under the Assignment page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.AssignTopic_DigitalTest_IsVisible().then((DigitalTest_IsVisible) => {
            expect(DigitalTest_IsVisible).to.be.true
        })
    })

    it ("To verify that Task is visible under the Assignment page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.Task_IsVisible().then((taskIsVisible) => {
            expect(taskIsVisible).to.be.true
        })
    })

    it ("To verify that Oral Test should not be visible under the Assignment page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.AssignTopic_OralTest_TXT_IsVisible().then((OralTest_IsVisible) => {
            expect(OralTest_IsVisible).to.be.false
        })
    })

    it ("To verify that Oral Test should be visible under Syllabus module", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        assignment.AssignTopic_OralTest_TXT_IsVisible().then((OralTest_IsVisible) => {
            expect(OralTest_IsVisible).to.be.true
        })
    })

    it ("To verify that Digital Test is clickable under the Assignment page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const assignment_BookShelf = new Assignment_BookShelf()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        assignment_BookShelf.Steps_WE_IsVisible().then((Steps_WE_IsVisible) => {
            expect(Steps_WE_IsVisible).to.be.true
        })
    })

    it ("To verify that Oral Test is clickable under the Syllabus", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const assignment_BookShelf = new Assignment_BookShelf()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        assignment.OralTest_WE_Click()
        assignment_BookShelf.OralTestHeader_TXT_GetText().then((Text_IsVisible) => {
            expect(Text_IsVisible).to.be.true
        })
    })   

    it ("To verify that user should be able to create Digital Test Under 'Today' Section", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin(); 
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount)
                assignment.MyAssignmentList_TXT_GetText().then((assignmentList) => {
                    expect(assignmentList.text()).to.contain(titleName)
                })
            })
            })
    })

    it ("To verify that user should be able to create Oral Test", () => {
        const genericFunctions = new GenericFunctions();
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        assignment.OralTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateOralTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            genericFunctions.wait(3000)
            assignment.BeginTest_BTN_Click()
            assignment.OralTestType_WE_GetClassText().then((oralTestQuestionAppear) => {
                expect(oralTestQuestionAppear).to.be.true
            })
        })
    })

    it ("To verify that user should be able to create Digital Test with future date", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest().then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.DueBy_Calendar_WE_DateSelecter()
            assignment.AssignNow_BTN_Click()
            assignment.ShowMoreUpComing_BTN_Click()
            assignment.MyAssignmentListCommingUp_TXT_GetText().then((assignmentList) => {
                expect(assignmentList.text()).to.contain(titleName)
            })
        })
    })

    // it("to verify That Difficulty level should be matched with creation of digital task", () => { // need to focus at the last 
    //     const genericFunctions = new GenericFunctions();
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const config = new Config();
    //     const assignment = new Assignment()
    //     const bookShelf = new BookShelf()
    //     const chapter = new Chapters();
    //     const assignment_Chapter = new Assignment_Chapter()
    //     const assignmentPreview = new AssignmentPreview()
    //     login.CommonLogin();
    //     homePage.Assignment_WE_Click()
    //     assignment.DigitalTest_WE_Click()
    //     bookShelf.SelectRandomBook()
    //     chapter.SelectRandomTopic();
    //     assignment_Chapter.NextStep_BTN_Click()
    //     assignment.CreateDigitalTest("today").then((titleName) => {
    //         assignment.Title_TXT_Click()
    //         assignment.Title_TXT_Clear()
    //         assignment.Title_TXT_Type(titleName)
    //         assignment.Difficulty_TXT_SelectRandom();
    //         assignment.SelectedDifficulity_TXT_GetText().then((value) => {
    //             assignment.AssignNow_BTN_Click();
    //             assignment.ShowMore_BTN_Click();
    //             genericFunctions.ClickOnElementUsingText(titleName)
    //             assignment.Duration_GetValue_API()
    //         })
    //     })
    // }) // need to focus at the last

    // it("to verify That Difficulty level should be matched with creation of Oral task", () => { // need to focus at the last 
    //     const genericFunctions = new GenericFunctions();
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const config = new Config();
    //     const assignment = new Assignment()
    //     const bookShelf = new BookShelf()
    //     const chapter = new Chapters();
    //     const assignment_Chapter = new Assignment_Chapter()
    //     const assignmentPreview = new AssignmentPreview()
    //     login.CommonLogin();
    //     genericFunctions.ReloadPage()
    //     homePage.Assignment_WE_Click()
    //     assignment.OralTest_WE_Click()
    //     bookShelf.SelectRandomBook()
    //     chapter.SelectRandomTopic();
    //     assignment_Chapter.NextStep_BTN_Click()
    //     assignment.CreateDigitalTest("today").then((titleName) => {
    //         assignment.Title_TXT_Click()
    //         assignment.Title_TXT_Clear()
    //         assignment.Title_TXT_Type(titleName)
    //         assignment.Difficulty_TXT_SelectRandom();
    //         assignment.SelectedDifficulity_TXT_GetText().then((value) => {
    //             assignment.Preview_BTN_Click()
    //             assignmentPreview.DifficultyLevel_TXT_GetText().then((val) => {
    //                 value = value.replace(" ","")
    //                 expect(assignmentPreview.CompareValues(value, val)).to.be.true
    //             })
    //         })
    //     })
    // }) // need to focus at the last 

    it ("To verify That Duration should be matched with creation of digital task", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.SelectedDuration_TXT_GetText().then((value) => {
                assignment.AssignNow_BTN_Click()
                assignment.ViewCompletedAssignment_BTN_Click()
                assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                    assignment.BackButton_WE_Click()
                    assignment.ShowMore_BTN_Click(completeCount);
                    genericFunctions.ClickOnElementUsingText(titleName)
                    assignment.BeginAndRedoTest_WE_Click()
                    assignment.CountDownTime_WE_GetText(value).then((durationMatched) => {
                        expect(durationMatched).to.be.true
                    })
                })  
            })
        })
    })

    // it("To verify That Duration should be matched with creation of Oral task", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const config = new Config();
    //     const assignment = new Assignment()
    //     const bookShelf = new BookShelf()
    //     const chapter = new Chapters();
    //     const assignment_Chapter = new Assignment_Chapter()
    //     const assignmentPreview = new AssignmentPreview()
    //     const genericFunctions = new GenericFunctions();
    //     login.CommonLogin();
    //     homePage.Assignment_WE_Click()
    //     assignment.OralTest_WE_Click()
    //     bookShelf.SelectRandomBook()
    //     chapter.SelectRandomTopic();
    //     assignment_Chapter.NextStep_BTN_Click()
    //     assignment.CreateOralTest("today").then((titleName) => {
    //         assignment.Title_TXT_Click()
    //         assignment.Title_TXT_Clear()
    //         assignment.Title_TXT_Type(titleName)
    //         assignment.Duration_TXT_SelectRandom();
    //         assignment.SelectedDuration_TXT_GetText().then((value) => {
    //             assignment.Preview_BTN_Click()
    //             assignmentPreview.Duration_TXT_GetText().then((val) => {
    //                 value = genericFunctions.ReplaceWord(value, " mins", "minutes")
    //                 value = value.replace(" ","")
    //                 expect(assignmentPreview.CompareValues(value, val)).to.be.true
    //             })
    //         })
    //     })
    // }) // need to focus at the last

    it ("To verify that user should be able to open the Digital Test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.ClickOnElementUsingText(titleName)
                assignment.BeginAndRedoTest_WE_Click()
                assignment.CorrectAnswers_TXT_GetText().then((correctVisible) => {
                    expect(correctVisible).to.be.true
                })
            })
        })
    })

    it ("To verify that user should be able to open the Oral Test", () => {
        const genericFunctions = new GenericFunctions();
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        assignment.OralTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateOralTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            genericFunctions.wait(3000)
            assignment.BeginTest_BTN_Click()
            assignment.OralCorrectAnswers_TXT_GetText().then((correctAnswerText) => {
                expect(correctAnswerText).to.be.true
            })
        })
    })

    it ("To verify that User is able to open the revise video on intro screen for digital test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const assignment_Intro = new Assignment_IntroTQ()
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.ClickOnElementUsingText(titleName)
                assignment_Intro.AllTQVideo_WE_Click()
                assignment_Intro.Close_BTN_GetCount().then((value) => {
                    expect(value).to.equal(1)
                })  
            })
        })
    })

    it("To verify that user is able to open the revise video on intro screen for Oral test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const assignment_Intro = new Assignment_IntroTQ()
        login.CommonLogin();
        homePage.Syllabus_WE_Click()
        assignment.OralTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateOralTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment_Intro.AllTQVideo_WE_Click()
            assignment_Intro.Close_BTN_GetCount().then((value) => {
                expect(value).to.equal(1)
            })
        })
    })

    it ("To verify that question status is working fine for Wrong Answers for Hamburger menu for Digital Test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const hamburgerMenu = new HamburgerMenu()
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest().then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.ClickOnElementUsingText(titleName)
                assignment.BeginAndRedoTest_WE_Click()
                assignment.WrongAnswers();
                assignment.SubmitButton_BTN_Click()
                assignment.ReviewButton_BTN_Click()
                hamburgerMenu.NavigationIcon_BTN_ClickWithoutCheck()
                assignment.QuestionInHamburgerMenu_WE_GetText().then((text) => {
                    expect(text).to.contain("icon-incorrect")
                })
            })
        })
    })

    it ("To verify that question status is working fine for Correct Answers for Hamburger menu for Digital Test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const hamburgerMenu = new HamburgerMenu()
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest().then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.ClickOnElementUsingText(titleName)
                assignment.BeginAndRedoTest_WE_Click()
                assignment.CorrectAnswers_New();
                assignment.SubmitButton_BTN_Click()
                assignment.ReviewButton_BTN_Click()
                hamburgerMenu.NavigationIcon_BTN_ClickWithoutCheck()
                assignment.QuestionInHamburgerMenu_WE_GetText().then((text) => {
                    expect(text).to.contain("icon-correct")
                })
            })
        })
    })

    it ("To verify that Flag the question should be working fine for Digital Test", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()   
        login.CommonLogin()
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest().then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment.ViewAssignment_BTN_Click()
            assignment.BeginAndRedoTest_WE_Click()
            assignment.Flag_WE_Click()
            assignment.Flag_WE_GetText().then((txtt) => {
                expect(txtt).to.contain("flag-active")
            })
        })
    })

    it ("AA-1840 > To verify that on tapping back button user should be land on assignment page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()   
        login.CommonLogin()
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.BackButton_WE_Click()
        assignment.BackButton_WE_Click()
        assignment.BackButton_WE_Click()
        assignment.MenuIcon_WE_Click()
        homePage.allElemets_WE_GetText().then((allText) => {
            expect(allText).to.contain("Assignments")
        })
    })

    it ("To verify that on Listing screen, User should be able to be see today and upcoming sections", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment() 
        login.CommonLogin()
        homePage.Assignment_WE_Click()
        assignment.ContainsTextForTodayAndUpComing_WE().then((conatainsText) => {
            expect(conatainsText).to.be.true
        })
    })

    it ("To verify that on Listing screen, User should be able to be see completed section", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment() 
        login.CommonLogin()
        homePage.Assignment_WE_Click()
        assignment.ContainsTextForViewCompletedAssignment_BTN().then((conatainsText) => {
            expect(conatainsText).to.be.true
        })
    })

    //AssertionError: Timed out retrying after 60000ms: Expected to find element: `.button-action-wrapper .btn-outline-primary`, but never found it.
    it ("AA - 1838 > To verify that Newly Created Digital Test in today's tasks are shown with 'New' icon", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.GetElement(assignment.MyAssignmentList_TXT).each(($el, index, $list) => {
                    if ($el.text() == titleName){
                        assignment.NewTagForTodayAssignment_TXT_GetText((index+2)).then((text) => {
                            expect(text).to.equal("New")
                        })
                    }
                })
            })
            })
    })

    it("AA-1838 > To verify that Newly Created Digital Test in upcomming tasks are shown with 'New' icon", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions();
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest().then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.DueBy_Calendar_WE_DateSelecter()
            assignment.AssignNow_BTN_Click()
            assignment.ShowMoreUpComing_BTN_Click();
            genericFunctions.GetElement(assignment.UpcomingAssignmentList_LST).each(($el, index, $list) => {
                if ($el.text() == titleName){
                    assignment.NewTagForUpcomingAssignment_TXT_GetText((index+2)).then((text) => {
                        expect(text).to.equal("New")
                    })
                }
            })
        })
    })

    // it("To verify that 'New' icon should get disappeared when user tap on the Today's assignment", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const assignment = new Assignment()
    //     const bookShelf = new BookShelf()
    //     const chapter = new Chapters();
    //     const assignment_Chapter = new Assignment_Chapter()
    //     login.CommonLogin();
    //     homePage.Assignment_WE_Click()
    //     assignment.DigitalTest_WE_Click()
    //     bookShelf.SelectRandomBook()
    //     chapter.SelectRandomTopic();
    //     assignment_Chapter.NextStep_BTN_Click()
    //     assignment.CreateDigitalTest("today").then((titleName) => {
    //         assignment.Title_TXT_Click()
    //         assignment.Title_TXT_Clear()
    //         assignment.Title_TXT_Type(titleName)
    //         assignment.Duration_TXT_SelectRandom();
    //         assignment.AssignNow_BTN_Click()
    //         assignment.ShowMore_BTN_Click();
    //         assignment.NewTag_WE_Click()
    //         assignment.BackButton_WE_Click()
    //         assignment.ShowMore_BTN_Click();
    //         assignment.NewTag_WE_GetDomElement().should('not.exist')
    //     })
    // })

    // it("To verify that 'New' icon should get disappeared when user tap on the Upcoming assignment", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const assignment = new Assignment()
    //     const bookShelf = new BookShelf()
    //     const chapter = new Chapters();
    //     const assignment_Chapter = new Assignment_Chapter()
    //     login.CommonLogin();
    //     homePage.Assignment_WE_Click()
    //     assignment.DigitalTest_WE_Click()
    //     bookShelf.SelectRandomBook()
    //     chapter.SelectRandomTopic();
    //     assignment_Chapter.NextStep_BTN_Click()
    //     assignment.CreateDigitalTest().then((titleName) => {
    //         assignment.Title_TXT_Click()
    //         assignment.Title_TXT_Clear()
    //         assignment.Title_TXT_Type(titleName)
    //         assignment.Duration_TXT_SelectRandom();
    //         assignment.DueBy_Calendar_WE_DateSelecter()
    //         assignment.AssignNow_BTN_Click()
    //         assignment.ShowMoreUpComing_BTN_Click();
    //         assignment.NewTag_WE_Click()
    //         assignment.BackButton_WE_Click()
    //         assignment.ShowMoreUpComing_BTN_Click();
    //         assignment.NewTag_WE_GetDomElement().should('not.exist')
    //     })
    // })

    it ("To verify that all the Assignment are represents with due date of that assignment", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions()
        const assignmentComplete = new AssignmentComplete()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.DueBy_Calendar_WE_DateSelecter("yesterday")
            assignment.AssignNow_BTN_Click()
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(conpleteCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(conpleteCount);
                genericFunctions.GetElement(assignment.MyAssignmentList_TXT).each(($el, index, $list) => {
                    if ($el.text() == titleName){
                        assignment.NewTagForTodayOverDue_TXT_GetText((index+2)).then((text) => {
                            // expect(text).to.equal("overdue  1 days")expected 'overdue  1 daysoverdue  1 daysoverdue  1 daysoverdue  1 daysoverdue  1 daysoverdue  1 days' to equal 'overdue  1 days'
                            expect(text).to.contain("overdue  1 days")
                        })
                    }
                })
            })
            })
    })// handle this methid of contain it shows 

    it ("To verify that Assignment will be striked off, if the user has completed the assignment", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions()
        const assignmentComplete = new AssignmentComplete()
        const getUrl = new GetUrl()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.Duration_TXT_SelectRandom();
            assignment.DueBy_Calendar_WE_DateSelecter("yesterday")
            assignment.AssignNow_BTN_Click()
            assignment.ViewAssignment_BTN_Click()
            assignment.BeginAndRedoTest_WE_Click()
            assignment.CorrectAnswers_New()
            assignment.SubmitButton_BTN_Click()
            genericFunctions.GetUrl(getUrl.GetAssignmentListUrl())
            assignment.ViewCompletedAssignment_BTN_Click()
            assignmentComplete.TodayCompletedAssignment_TXT_GetText().then(completeCount => {
                assignment.BackButton_WE_Click()
                assignment.ShowMore_BTN_Click(completeCount);
                genericFunctions.GetElement(assignment.MyAssignmentList_TXT).each(($el, index, $list) => {
                if ($el.text() == titleName){
                    assignment.StrikeOffTodayAssignment_WE_GetText((index+2)).then((textAppear) => {
                        expect(textAppear).to.be.true
                    })
                }
            })
        })
    })
    })

    it("To verify that Attachment icon will be shown in case there is any attachment there in the assignment(Task).", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const task = new Task()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.Task_WE_Click()
        task.AttachmentIcon_WE_IsDisplayed().then((elementVisible) => {
            expect(elementVisible).to.be.true
        })
    })

    it("AA-1837 > To verify that on Click on any option on Assign module, it navigates the user to select book", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const assignment_BookShelf = new Assignment_BookShelf()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        assignment_BookShelf.SelectBook_TXT_GetText().then(function(bookShelfText){
            expect(bookShelfText).to.equal("Select Subject")
        })
    })

//---------------------------------------------------------------Update Above methods 

    it("AA-1837 > To verify that on Click on any option on Assign module, it navigates the user to select book and then topic", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectTopic_TXT_GetText().then((selectTopicTxt) => {
            expect(selectTopicTxt).to.contain("Select Topics from")
        })
    })

    it ("AA-1839 > To verify that once the Assignment is created, User will be navigated back to listing page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        const genericFunctions = new GenericFunctions()
        const getUrl = new GetUrl()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            genericFunctions.GetCurrentPageUrl().then((currentUrl) => {
                expect(currentUrl).to.equal(getUrl.GetAssignmentListUrl())
            })
        })
    })

    it ("AA-1839 > To verify that once the Assignment is created, There will be a  Alert Notification of Success Message", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.DigitalTest_WE_Click()
        bookShelf.SelectRandomBook()
        chapter.SelectRandomTopic();
        assignment_Chapter.NextStep_BTN_Click()
        assignment.CreateDigitalTest("today").then((titleName) => {
            assignment.Title_TXT_Click()
            assignment.Title_TXT_Clear()
            assignment.Title_TXT_Type(titleName)
            assignment.AssignNow_BTN_Click()
            assignment.AlertAfterForDigitalTest_WE_IsVisible().then(alertVisible => {
                expect(alertVisible).to.be.true
            })
        })
    })

    it ("AA-1841 > To verify that once user clicks on View completed link, user will navigate to a Completed Page", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const genericFunctions = new GenericFunctions()
        const getUrl = new GetUrl()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.ViewCompletedAssignment_BTN_Click()
        genericFunctions.GetCurrentPageUrl().then(currentUrl => {
            expect(currentUrl).to.equal(getUrl.GetAssignmentCompletedLink())
        })
    })

    it ("AA-1841 > To verify that once user clicks on View completed link, Completed Assignment should be visible in it", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const assignmentComplete = new AssignmentComplete()
        const genericFunctions = new GenericFunctions()
        const getUrl = new GetUrl()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        assignment.SelectTheNonCompletedTest_NEW("").then(elemenText => {
            assignment.BeginAndRedoTest_WE_Click()
            assignment.CorrectAnswers_New()
            assignment.SubmitButton_BTN_Click()
            genericFunctions.GetUrl(getUrl.GetAssignmentCompletedLink())
            assignmentComplete.AllCompletedTodayAssignment_WE_GetText().then(textOfElements => {
                expect(textOfElements).to.contain(elemenText.text())
            })
        })
    })

    it ("AA-1843 > To verify the scrolling finctionality,user is ableto scroll down", () => {
        const login = new Login();
        const homePage = new HomePage();
        const assignment = new Assignment()
        const genericFunctions = new GenericFunctions()
        const getUrl = new GetUrl()
        login.CommonLogin();
        homePage.Assignment_WE_Click()
        genericFunctions.ScrollToBottom()
        assignment.ViewCompletedAssignment_BTN_Click()
        genericFunctions.GetCurrentPageUrl().then(url => {
            expect(url).to.equal(getUrl.GetAssignmentCompletedLink())
        })
    })

    // it ("AA-1846 > To verify that the total; duration of the test andthe video assignment is displaying justbelow of it", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const assignment = new Assignment()
    //     const genericFunctions = new GenericFunctions()
    //     const getUrl = new GetUrl()

    // })


    // it.only("make all test 0", () => {
    //     const login = new Login();
    //     const homePage = new HomePage();
    //     const assignment = new Assignment()
    //     const assignmentComplete = new AssignmentComplete()
    //     login.CommonLogin();
    //     homePage.Assignment_WE_Click()
    //     assignment.makeAllTestZero()
    // })

})