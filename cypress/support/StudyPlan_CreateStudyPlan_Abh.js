import GenericFunctions from "../support/GenericFunctions"
import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import HomePage_Abh from "../support/HomePage_po_Abh"
import Chapters_Abh from "../support/Chapters_po_Abh"
import BookShelf_Abh from "../support/BookShelf_po_Abh"

export default class StudyPlan_CreateStudyPlan_Abh {

    Syllabus_Tab = ".heading4.primary"
    Select_Topic = "h5.heading4"
    Add_Portion_Btn = "button.btn-sm"
    Update_Portion_Btn = "button.btn-sm"
    StudyPlan_Btn = ".title.heading5"
    Studyplan_Subject_Science = ".subject-yellow-theme"
    Bookshelf_Political_Science = ".subject-purple-theme"
    Bookshelf_Geography = ".subject-blue-theme"
    Bookshelf_Mathematics = ".subject-pink-theme"
    Bookshelf_History = ".subject-orange-theme"
    Review_Deadline_Text = " Review Deadline "
    Calendar = ".plan-datepiker"
    Calendar_Weeks = "div.ngb-dp-week.ng-star-inserted"
    Calendar_Days = ".ngb-dp-day"
    Todays_Date = ".ngb-dp-today"
    First_Feasible_Date = 'div[tabindex="0"].ngb-dp-day'
    Plan_EndDate = "span.selectedLastDate"
    Next_Button_Text = "Next Step"
    StudyHours_EveryDay = ".creat-plan-page-mid2 h3 b:nth-child(2)"
    Update_Portion_Text = "Update Portion"
    Bookshelf_Subjects = ".subjects-list .card"
    Bookshelf_Subject_Topic_Selected = ".topic-chap-selected-text"
    Bookshelf_Delete_Icon = ".icon-discard"
    Bookshelf_Discard_PopUp_Text = " Yes, Please Discard"
    //from old StudyPlan_CreateStudyPlan
    StudyPlaName = ".form-control"
    ActivePlan_BTN = "button.btn.btn-outline-primary"
    BeginStudying_BTN = ".text > .btn"

    Create_New_Study_Plan() {

        const genericFunctions_abh = new GenericFunctions_Abh()
        const homepage_abh = new HomePage_Abh();
        const chapter_abh = new Chapters_Abh();
        const bookshelf_abh = new BookShelf_Abh()
        // genericFunctions_abh.ClickOnSingleElement(this.Syllabus_Tab, "1")
        // genericFunctions_abh.ClickOnSingleElement(this.StudyPlan_Btn, "1")
        // cy.wait(5000)
        // genericFunctions_abh.ClickForecefully(this.Studyplan_Subject_Science)
        // genericFunctions_abh.ClickOnSingleElement(this.Select_Topic, "0")
        // genericFunctions_abh.Click(this.Add_Portion_Btn)
        // cy.wait(2000)
        // genericFunctions_abh.ClickOnElementUsingText("Next Step")
        // cy.wait(2000)
        // genericFunctions_abh.ClickOnElementUsingText("Next Step")
        // cy.wait(2000)
        // genericFunctions_abh.ClickOnElementUsingText("Next Step")
        // cy.wait(2000)
        // this.StudyPlaName_Type(this.StudyPlanGenerateDate("today"))
        // this.ActivePlan_BTN_Click()
        // this.BeginStudying_BTN_Click()

        homepage_abh.Syllabus_WE_Click()
        chapter_abh.StudyPlan_TXT_Click()
        bookshelf_abh.SelectRandomBook();
        chapter_abh.SelectRandomTopic();
        chapter_abh.StudyPlanAddToPortion_BTN_Click()
        chapter_abh.StudyPlanNextStep_BTN_Click()
        chapter_abh.StudyPlanNextStep_BTN_Click()
        chapter_abh.StudyPlanNextStep_BTN_Click()
        var dateAndTime = this.StudyPlanGenerateDate("today")
        this.StudyPlaName_Type(dateAndTime)
        this.ActivePlan_BTN_Click()
        this.BeginStudying_BTN_Click()

    }

    //from old StudyPlan_CreateStudyPlan

    StudyPlanGenerateDate(day){
        let date = ""
        const genericFunctions_abh = new GenericFunctions_Abh()
        date = genericFunctions_abh.GenerateDate(day)
        date = date.replaceAll(" ", "-")
        return date
    }

    StudyPlaName_Type(date){
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.wait(2000)
        this.StudyPlaName_Clear()
        genericFunctions_abh.Type(this.StudyPlaName, date)
        return date
    }

    StudyPlaName_Clear(){
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.Clear(this.StudyPlaName)
    }

    ActivePlan_BTN_Click(){
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.wait(1000)
        genericFunctions_abh.ClickForecefully(this.ActivePlan_BTN)
    }

    BeginStudying_BTN_Click(){
        const genericFunctions_abh = new GenericFunctions_Abh()
        genericFunctions_abh.ClickForecefully(this.BeginStudying_BTN)
    }

}