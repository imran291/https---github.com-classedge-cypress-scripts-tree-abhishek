/// <reference types="cypress" />

import GenericFunctions from "../support/GenericFunctions"
import HomePage from "../support/HomePage_po"
import GetApiFunctions from "../support/GetApiFunctions"
import GetUrl from "../support/GetUrl"
import AssignmentPreview from "../support/AssignmentPreview"
import Practice_po from "../support/Practice_po"
import BookShelf from "../support/BookShelf_po";
import Chapters from "../support/Chapters_po";
import Assignment_Chapter from "../support/Assignment_Chapter"
import AssignmentComplete from "../support/AssignmentComplete"


export default class Assignment{

    compareValue = 0
    NewTag_WE = ".labels > span.badge"
    AssignTopic_WE = "h3.title.heading5"
    DigitalTest_TXT = "Digital Test"
    DigitalTest_WE = ":nth-child(2) > .info h3.title.heading5"
    Task_WE = ":nth-child(3) > .info h3.title.heading5"
    OralTest_WE = ":nth-child(1) > :nth-child(2) > .info > .title.heading5"
    OralTest_TXT = "Oral Test"
    Topic_TXT = ".heading1.text-truncate"
    Title_TXT = "input[type='text']"
    NewTagForTodayAssignment_TXT_1 = ".today-cards :nth-child("
    NewTagForTodayAssignment_TXT_2 = ") .labels span"
    OverDueTagForTodayAssignment_TXT = ") .item.overdue"
    StrikeOffTodayAssignment_WE = ") .card.flex-row"
    NewTagForUpcomingAssignment_TXT_1 = ".upcoming-cards :nth-child("
    NewTagForUpcomingAssignment_TXT_2 = ") .labels span"
    AssignNow_BTN = ".d-flex button.btn-outline-primary"
    // TodayAssignmentList_LST = ".today-cards .title.text-truncate"
    UpcomingAssignmentList_LST = ".upcoming-cards h3.title"
    MyAssignmentList_TXT = ".today-cards .title.text-truncate"
    MyAssignmentListCommingUp_TXT = ".upcoming-cards .title.text-truncate"
    ShowMore_BTN = ".today-cards button.btn.btn-outline-secondary"
    ShowMoreUpComing_BTN = ".upcoming-cards button.btn.btn-outline-secondary"
    MyAssignmentCount_TXT = ".today-cards .body-bold-light"
    MyAssignmentCountUpComing_TXT = ".upcoming-cards .body-bold-light"
    SelectedDifficulity_TXT = "div:nth-child(3) .btn.btn-shadow.active"
    SelectedDuration_TXT = ":nth-child(4) :nth-child(3) label.btn.btn-shadow.ng-star-inserted.active"
    Difficulty_TXT = "div:nth-child(3) .btn-group-toggle label"
    Duration_TXT = ":nth-child(3) > .form-group > .d-flex input"
    DueBy_Calendar_WE = "input[placeholder='yyyy-mm-dd']"
    BeginTest_BTN = "div.action-section button.btn.btn-outline-primary"
    FreshCreatedAssignment_WE = ".justify-content-end > .icon"
    BeginAndRedoTest_WE = ".action-section > .btn"
    DoNotShowMeAgain_WE = ".btn-inherit"
    NextQuestion_WE = ".icon.icon-test-next"
    PreviousQuestion_WE = ".icon.icon-test-previous"
    TotalNumberOfQuestions_WE = ".row.align-items-center div.col:nth-child(1)"
    SubmitButton_BTN = "div.descard-body-outer button.btn.btn-outline-primary"
    ReviewButton_BTN = ".p-4 > .btn"
    QuestionInHamburgerMenu_WE = "span.icon.d-inline-block.align-middle"
    Flag_WE = "div.col.d-flex.justify-content-end span"
    MenuIcon_WE = ".icon.icon-menu"
    BackButton_WE = ".icon.icon-back"
    CountDownTime_WE = "countdown span.ng-star-inserted"
    CorrectAnswers_TXT = ".result-top .ql-editor p"
    TQVideo_WE = ".icon.icon-w-video"
    TodayAndUpComing_WE = ".head > .heading2"
    ViewCompletedAssignment_BTN = ".view-completed-btn-sec button"
    AlertAfterForDigitalTest_WE = ".nx-afs-intent-acknowledge.ng-star-inserted"
    SelectingNonCompletedAssignmentAll_WE = ".today-cards .card:not(.completed) .title.text-truncate"
    CompletedAssignmentAll_WE = ".today-cards .completed"
    ViewAssignment_BTN = ".main-wrapper > .d-flex.justify-content-end > .btn"
    HideAnswer_BTN = ".actionBox .btn.btn-outline-primary"

    ViewAssignment_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        genericFunctions.ClickForecefully(this.ViewAssignment_BTN)
    }

    HideAnswer_BTN_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.HideAnswer_BTN))
    }

    makeAllTestZero(){
        const genericFunctions = new GenericFunctions()
        const getUrl = new GetUrl()
        this.SelectTheNonCompletedTest_NEW("").then((elemenText) => {
            this.BeginTest_BTN_Click()
            this.CorrectAnswers_New()
            this.SubmitButton_BTN_Click()
            genericFunctions.GetUrl(getUrl.GetAssignmentListUrl())
            this.makeAllTestZero()
        })
    }


    SelectTheNonCompletedTest(DateValue){
        return (this.IsTheTestVisible().then((visibility) => {
            if(visibility == false){
                this.CreateFreshDigitalTest(DateValue)
            }else if(visibility == true){
                return (this.IsNonCompletedTestVisible().then((IsVisible) => {
                    if(IsVisible == true){
                        this.SelectingNonCompletedAssignmentAll_WE_Click()
                    }else if(IsVisible == false){

                    }
                }))
            }
        }))
    }

    ClickOnShowMoreButton(value){
        const self = this
        const genericFunctions = new GenericFunctions()
        for(let i=0; i<=(value+1); i++){
            // genericFunctions.wait(1000)
            this.MyAssignmentCount_TXT_GetText().then((AssignmentCount) => {
                if(AssignmentCount != 0 && AssignmentCount > 10){
                    self.MyAssignmentList_TXT_Count().then((MyAssignmentListCount) => {
                        if((AssignmentCount != MyAssignmentListCount)){
                            genericFunctions.ClickForecefully(self.ShowMore_BTN)
                        }
                    }) 
                }                
            })
        }
    }

    SelectTheNonCompletedTest_NEW(DateValue){
        const assignmentComplete = new AssignmentComplete()
        const genericFunctions = new GenericFunctions()
        const bookShelf = new BookShelf()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        return (this.IsTheTestVisible().then((visibility) => {
            if(visibility == false){
                this.DigitalTest_WE_Click()
                bookShelf.SelectRandomBook()
                chapter.SelectRandomTopic();
                assignment_Chapter.NextStep_BTN_Click()
                this.CreateDigitalTest(DateValue).then((titleName) => {
                    this.Title_TXT_Click()
                    this.Title_TXT_Clear()
                    this.Title_TXT_Type(titleName)
                    this.AssignNow_BTN_Click()
                    this.SelectTheNonCompletedTest_NEW(DateValue)
                })
            }else if(visibility == true){
                this.ViewCompletedAssignment_BTN_Click()
                return (assignmentComplete.TodayCompletedAssignment_TXT_GetText().then((text) => {
                    assignmentComplete.BackButton_WE_Click()
                    this.ClickOnShowMoreButton(parseInt(text/10))
                    return (this.IsCompletedAssignmentCountmatchedWithAssignmentVisible(text).then((countMatched) => {
                        if(countMatched == true){
                            this.DigitalTest_WE_Click()
                            bookShelf.SelectRandomBook()
                            chapter.SelectRandomTopic();
                            assignment_Chapter.NextStep_BTN_Click()
                            this.CreateDigitalTest(DateValue).then((titleName) => {
                                this.Title_TXT_Click()
                                this.Title_TXT_Clear()
                                this.Title_TXT_Type(titleName)
                                this.AssignNow_BTN_Click()
                                this.SelectTheNonCompletedTest_NEW(DateValue)
                            })
                        }else if(countMatched == false){
                            genericFunctions.ClickOnSingleElement(this.SelectingNonCompletedAssignmentAll_WE, 2)// change 2 to 0
                        }
                    }))
                }))
            }
        }))
    }

    NonCompletedTest_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromDefinedElement(this.SelectingNonCompletedAssignmentAll_WE, 0))
    }

    SelectingNonCompletedAssignmentAll_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromDefinedElement(this.SelectingNonCompletedAssignmentAll_WE, 0))
    }

    SelectingNonCompletedAssignmentAll_WE_Click(){
        const genericFunctions = new GenericFunctions()
        this.IsNonCompletedTestVisible().then((testVisible) => {
            if(testVisible == true){
                genericFunctions.ClickOnSingleElement(this.SelectingNonCompletedAssignmentAll_WE, 0)
            }
        })
    }

    CreateFreshDigitalTest(value){
        return (this.IsTheTestVisible().then((visibility) => {
            if(visibility != true){
                return (this.CreateDigitalTest(value))
            }else if(visibility != false){
                return (this.IsNonCompletedTestVisible().then((elementVisible) => {
                    if(elementVisible != true){
                        return (this.CreateDigitalTest(value))
                    }
                }))
            }
        }))
    }

    IsNonCompletedTestVisible(){
        const genericFunctions = new GenericFunctions()
        return (this.IsTheTestVisible().then((visibility) => {
            if(visibility != false){
                return (this.IsCompletedAssignmentVisibleInTheList().then((isCountMatched) => {
                    if(isCountMatched == true){
                        return (genericFunctions.IsVisibleForSingleElement(this.SelectingNonCompletedAssignmentAll_WE, 0).then((elementVisible) => {
                            if(elementVisible == true){
                                return true
                            }else if(elementVisible == false){
                                return false
                            }
                        }))
                    }else if(isCountMatched == false){
                        this.ShowMore_BTN_Click_UsingBool().then((showMoreBtnVisible) => {
                            if(showMoreBtnVisible == true){
                                genericFunctions.ClickForecefully(this.ShowMore_BTN)
                                this.IsNonCompletedTestVisible()
                            }  
                        })
                    }
                }))
            }
        }))
    }

    CompletedAssignmentAll_WE_GetCount(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.CompletedAssignmentAll_WE))
    }

    IsCompletedAssignmentVisibleInTheList(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.MyAssignmentList_TXT).then((AssignmentListCount) => {
            return (genericFunctions.CountOfAllElements(this.SelectingNonCompletedAssignmentAll_WE).then((completedListCount) => {
                if(completedListCount > 1){
                    if(AssignmentListCount != completedListCount){
                        return true
                    }else{
                        return (genericFunctions.IsVisibleForSingleElement(this.SelectingNonCompletedAssignmentAll_WE, 0).then((singleElementVisible) => {
                            if(singleElementVisible == true){
                                return true
                            }else if(singleElementVisible == false){
                                return false
                            }
                        }))  
                    }
                }else{
                    return (this.ShowMore_BTN_Click_UsingBool().then((showMoreBtnVisible) => {
                        if(showMoreBtnVisible == true){
                            return false
                        }else if(showMoreBtnVisible == false){
                            //make it correct for last element 
                        }
                    }))
                }
            }))
        }))
    }

    IsCompletedAssignmentCountmatchedWithAssignmentVisible(value){
        return (this.MyAssignmentCount_TXT_GetText().then((val) => {
            if(value == (val+value)){
                return true
            }else{
                return false
            }
        }))
    }

    AlertAfterForDigitalTest_WE_IsVisible(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.IsVisible(this.AlertAfterForDigitalTest_WE))
    }

    ContainsTextForTodayAndUpComing_WE(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.TodayAndUpComing_WE).then((TodayAndUpComingText) => {
            if(TodayAndUpComingText.includes("Today") && TodayAndUpComingText.includes("Upcoming")){
                return true
            }else{
                return false
            }
        }))
    }

    ViewCompletedAssignment_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        genericFunctions.ClickForecefully(this.ViewCompletedAssignment_BTN)
    }

    ContainsTextForViewCompletedAssignment_BTN(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.ViewCompletedAssignment_BTN).then((ViewCompletedAssignmentText) => {
            if(ViewCompletedAssignmentText.includes("View Completed Assignments")){
                return true
            }else{
                return false
            }
        }))
    }

    NewTag_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.NewTag_WE)
    }

    NewTag_WE_GetDomElement(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetElement(this.NewTag_WE))
    }
    
    MenuIcon_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        genericFunctions.ClickForecefully(this.MenuIcon_WE)
    }

    BackButton_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.BackButton_WE)
    }

    Flag_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.Flag_WE)
    }

    TQVideo_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.TQVideo_WE)
    }

    Flag_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.CompareAttributeOfSingleElement(this.Flag_WE, 0, "Class"))
    }

    OralTestType_WE_GetClassText(){
        const genericFunctions = new GenericFunctions()
        const practice_po = new Practice_po()
        genericFunctions.wait(1000)
        return (genericFunctions.CompareAttributeOfSingleElement(practice_po.GetTypeOfQuestion_WE, 0, "Class").then((classText) => {
            if(classText.includes("instantFeedback")){
                return true
            }else{
                return false
            }
        }))
    }

    QuestionInHamburgerMenu_WE_GetText(){
        const self = this
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.QuestionInHamburgerMenu_WE).then((questionCount) => {
            let randomValue = genericFunctions.RandomValueFromCount(questionCount)
            return (genericFunctions.CompareAttributeOfSingleElement(self.QuestionInHamburgerMenu_WE, (randomValue-1), "class").then((getText) => {
                return getText
            }))
        }))
    }

    ReviewButton_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.ReviewButton_BTN)
    }

    SubmitButton_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.SubmitButton_BTN))
    }

    SubmitButton_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        genericFunctions.ClickForecefully(this.SubmitButton_BTN)
    }

    NextQuestion_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        genericFunctions.ClickForecefully(this.NextQuestion_WE)
    }

    PreviousQuestion_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.PreviousQuestion_WE)
    }

    ManageWrongAnswers(){
        let value = 0
        const self = this
        this.OnlyScqAndMcqAnswerShouldBeAvaliable().then((checkAvailability) => {
            value = parseInt(checkAvailability)
            for(let i=1; i<=(parseInt(value)-1); i++){
                self.PreviousQuestion_WE_Click()
            }
        })
        this.WrongAnswers()
    }

    WrongAnswers(){
        const self = this
        const practice_po = new Practice_po()
        practice_po.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            self.TotalNumberOfQuestions_WE_GetText().then((questionNumber) => {
                let question = questionNumber.split(" ")
                if(parseInt(question[1]) != parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForInCorrectAnswers()
                        self.NextQuestion_WE_Click()
                        self.WrongAnswers()    
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForWrongAnswers()
                        self.NextQuestion_WE_Click()
                        self.WrongAnswers()
                    }else{
                        self.NextQuestion_WE_Click()
                        self.WrongAnswers()
                    }
                }else if(parseInt(question[1]) == parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForInCorrectAnswers()
                        self.NextQuestion_WE_Click()   
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForWrongAnswers()
                        self.NextQuestion_WE_Click()
                    }
                    else{
                        self.NextQuestion_WE_Click()
                    }
                }
            })
        })
    }

    ManageCorrectAnswers(){
        let value = 0
        const self = this
        this.OnlyScqAndMcqAnswerShouldBeAvaliable().then((checkAvailability) => {
            value = parseInt(checkAvailability)
            for(let i=1; i<=(parseInt(checkAvailability)-1); i++){
                self.PreviousQuestion_WE_Click()
            }
        })
        this.CorrectAnswers()
    }

    CorrectAnswers_New(){
        const self = this
        const practice_po = new Practice_po()
        const genericFunctions = new GenericFunctions()
        // genericFunctions.wait(1000)
        practice_po.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            self.TotalNumberOfQuestions_WE_GetText().then((questionNumber) => {
                let question = questionNumber.split(" ")
                if(parseInt(question[1]) != parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers_New()    
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers_New()
                    }else if((questionType == "composite")){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers_New()
                    }else{
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers_New()
                    }
                }else if(parseInt(question[1]) == parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()   
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()
                    }else if((questionType == "composite")){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers_New()
                        self.NextQuestion_WE_Click()
                    }else{
                        self.NextQuestion_WE_Click()
                    }
                }
            })
        })
    }

    CorrectAnswers(){
        const self = this
        const practice_po = new Practice_po()
        practice_po.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            self.TotalNumberOfQuestions_WE_GetText().then((questionNumber) => {
                let question = questionNumber.split(" ")
                if(parseInt(question[1]) != parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers()
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers()    
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForCorrectAnswers()
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers()
                    }else{
                        self.NextQuestion_WE_Click()
                        self.CorrectAnswers()
                    }
                }else if(parseInt(question[1]) == parseInt(question[3])){
                    if(questionType == "scq"){
                        practice_po.HandleScqTypeQuestionsForCorrectAnswers()
                        self.NextQuestion_WE_Click()   
                    }else if((questionType == "mcq")){
                        practice_po.HandleMcqTypeQuestionsForCorrectAnswers()
                        self.NextQuestion_WE_Click()
                    }else{
                        self.NextQuestion_WE_Click()
                    }
                }
            })
        })
    }

    OnlyScqAndMcqAnswerShouldBeAvaliable(){
        const self = this
        const genericFunctions = new GenericFunctions()
        const bookShelf = new BookShelf()
        const practice_po = new Practice_po()
        const chapter = new Chapters();
        const assignment_Chapter = new Assignment_Chapter()
        return (practice_po.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            return (self.TotalNumberOfQuestions_WE_GetText().then((text) => {
                let question = text.split(" ")
                if((questionType == "scq") || (questionType == "mcq")){
                    self.compareValue++;
                }
                if(parseInt(question[1]) != parseInt(question[3])){
                    self.NextQuestion_WE_Click()
                    self.OnlyScqAndMcqAnswerShouldBeAvaliable()
                }
                if(parseInt(question[1]) == parseInt(question[3])){
                    if(self.compareValue != parseInt(question[3])){
                        bookShelf.SelectRandomBook()
                        chapter.SelectRandomTopic();
                        assignment_Chapter.NextStep_BTN_Click()
                        self.CreateDigitalTest().then((titleName) => {
                            self.Title_TXT_Click()
                            self.Title_TXT_Clear()
                            self.Title_TXT_Type(titleName)
                            self.AssignNow_BTN_Click()
                            self.ShowMore_BTN_Click()
                            genericFunctions.ClickOnElementUsingText(titleName)
                            self.BeginAndRedoTest_WE_Click()
                            self.DoNotShowMeAgain_WE_Click()
                            self.ManageCorrectAnswers();
                        })
                    }
                    else if(self.compareValue == parseInt(question[3])){
                        return (self.compareValue)
                    }
                }
            }))
        }))
    }

    TotalNumberOfQuestions_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.TotalNumberOfQuestions_WE))
    }

    CorrectAnswers_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.CorrectAnswers_TXT).then((questionText) => {
            if(questionText.includes("Select the correct answer")){
                return true
            }else{
                return false
            }
        }))
    }

    OralCorrectAnswers_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        const practice_po = new Practice_po()
        genericFunctions.wait(2000)

        // return (practice_po.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
        //     return (genericFunctions.GetTextFromElement(this.CorrectAnswers_TXT).then((questionText) => {
        //         if(questionText.includes("The correct answer is") && (questionType == "scq")){
        //             return true
        //         }else if(questionText.includes("The correct answer are") && (questionType == "mcq")){
        //             return true
        //         }else{
        //             return false
        //         }
        //     }))
        // }))

        return (this.HideAnswer_BTN_GetText().then(hideText => {
            if(hideText.includes("Hide Answer")){
                return true
            }else{
                return false
            }
        }))
    }

    CountDownTime_WE_GetText(match){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        return (genericFunctions.GetTextFromElement(this.CountDownTime_WE).then((time) => {
            time = time.split(":")
            match = match.split(" ")
            time = time[0]
            time = parseInt(time)+1
            match = match[1]
            if(match == time){
                return true
            }else{
                return false
            }
        }))
    }

    AssignTopic_Assignment_IsVisible(){
        const genericFunctions = new GenericFunctions()
        const homePage = new HomePage()
        return (genericFunctions.GetTextFromAllElements(homePage.allElemets_WE).then((AllElementText) => {
            if(AllElementText.text().includes("Assignments")){
                return true
            }else{
                return false
            }
        }))
    }

    AssignTopic_DigitalTest_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromAllElements(this.AssignTopic_WE).then((DigitalTest_IsVisible) => {
            if(DigitalTest_IsVisible.text().includes("Digital Test")){
                return true
            }else{
                return false
            }
        }))
    }

    Task_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromAllElements(this.AssignTopic_WE).then((taskIsVisible) => {
            if(taskIsVisible.text().includes("Task")){
                return true
            }else{
                return false
            }
        }))
    }

    AssignTopic_OralTest_TXT_IsVisible(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.GetTextFromAllElements(this.AssignTopic_WE).then((OralTest_IsVisible) => {
            if(OralTest_IsVisible.text().includes("Oral Test")){
                return true
            }else{
                return false
            }
        }))
    }

    Difficulty_TXT_SelectRandom(){
        const self = this
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.Difficulty_TXT).then((DifficultyTxtCount) => {
            let random = genericFunctions.RandomValueFromCount(DifficultyTxtCount)
            genericFunctions.ClickOnSingleElement(self.Difficulty_TXT, (random-1))
        })
    }

    BeginTest_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.BeginTest_BTN))
    }

    BeginTest_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.BeginTest_BTN)
    }

    BeginAndRedoTest_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        this.BeginAndRedoTest_WE_ISVisible().then(btnVisible => {
            if(btnVisible != false){
                genericFunctions.ClickForecefully(this.BeginAndRedoTest_WE)
            }
        })
    }

    BeginAndRedoTest_WE_ISVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.BeginAndRedoTest_WE))
    }

    DoNotShowMeAgain_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.DoNotShowMeAgain_WE)
    }

    FreshCreatedAssignment_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        genericFunctions.ClickForecefully(this.FreshCreatedAssignment_WE)
    }
    
    Duration_TXT_SelectRandom(){
        const self = this
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.Duration_TXT).then((DurationTxtCount) => {
            let random = genericFunctions.RandomValueFromCount(DurationTxtCount)
            genericFunctions.ClickOnSingleElement(self.Duration_TXT, (random-1))
        })
    }

    DueBy_Calendar_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.DueBy_Calendar_WE)
    }

    DueBy_Calendar_WE_clear(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Clear(this.DueBy_Calendar_WE)
    }

    DueBy_Calendar_WE_Type(value){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        genericFunctions.Type(this.DueBy_Calendar_WE, value)
    }

    DueBy_Calendar_WE_DateSelecter(value){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ElementScrollIntoView(this.DueBy_Calendar_WE, 0, 2)
        genericFunctions.RemoveAttributeFromSingleElement(this.DueBy_Calendar_WE, "readonly")
        this.DueBy_Calendar_WE_Click()
        this.DueBy_Calendar_WE_clear()
        this.DueBy_Calendar_WE_Type(genericFunctions.Select_YY_MM_DD_Format(value))
    }

    AssignTopic_DigitalTest_Click(){
        const self = this
        const genericFunctions = new GenericFunctions()
        this.AssignTopic_DigitalTest_IsVisible().then((DigitalTest_IsVisible) => {
            if(DigitalTest_IsVisible == true){
                genericFunctions.wait(1000)
                genericFunctions.ClickOnElementUsingText(self.DigitalTest_TXT)
            }
        })
    }

    DigitalTest_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.DigitalTest_WE)
    }

    Task_WE_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.Task_WE)
    }

    // DigitalTest_WE_Click(){
    //     const self = this
    //     const genericFunctions = new GenericFunctions()
    //     this.AssignTopic_DigitalTest_IsVisible().then((DigitalTest_IsVisible) => {
    //         if(DigitalTest_IsVisible == true){
    //             genericFunctions.wait(1000)
    //             genericFunctions.ClickForecefully(self.DigitalTest_WE)
    //         }
    //     })
    // }

    OralTest_WE_Click(){
        const self = this
        const genericFunctions = new GenericFunctions()
        this.AssignTopic_OralTest_TXT_IsVisible().then((OralTest_IsVisible) => {
            if(OralTest_IsVisible == true){
                genericFunctions.wait(1000)
                genericFunctions.ClickForecefully(self.OralTest_WE)
            }
        })
    }

    AssignTopic_OralTest_TXT_Click(){
        const self = this
        const genericFunctions = new GenericFunctions()
        this.AssignTopic_OralTest_TXT_IsVisible().then((OralTest_IsVisible) => {
            if(OralTest_IsVisible == true){
                genericFunctions.ClickOnElementUsingText(self.OralTest_TXT)
            }
        })
    }
    
    Title_TXT_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Click(this.Title_TXT)
    }

    Title_TXT_Clear(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Clear(this.Title_TXT)
    }

    Title_TXT_Type(value){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Type(this.Title_TXT, value)
    }

    AssignNow_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.Click(this.AssignNow_BTN)
    }

    CreateDigitalTest(value){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        return (genericFunctions.GetTextFromElement(this.Topic_TXT).then((getText) => {
            getText = getText +" "+this.GenerateDate(value)
            getText = getText.replace(/\s+/g, '+')
            getText = getText.replace("Assign+Digital+", "")
            return getText
        }))
    }

    CreateOralTest(value){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.Topic_TXT).then((getText) => {
            getText = getText +" "+this.GenerateDate(value)
            getText = getText.replace(/\s+/g, '+')
            return getText
        }))
    }

    GenerateDate(value){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GenerateDate(value))
    }

    MyAssignmentList_TXT_Count(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.MyAssignmentList_TXT))
    }

    MyAssignmentListCommingUp_TXT_Count(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.MyAssignmentListCommingUp_TXT))
    }

    ShowMore_BTN_Click(value){
        const self = this
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        this.MyAssignmentCount_TXT_GetText().then((AssignmentCount) => {
            if(AssignmentCount != 0 && AssignmentCount > 10){
                self.MyAssignmentList_TXT_Count().then((MyAssignmentListCount) => {
                    if(((AssignmentCount+value) != MyAssignmentListCount)){
                        genericFunctions.ClickForecefully(self.ShowMore_BTN)
                        self.ShowMore_BTN_Click(value)
                    }
                }) 
            }                
        })
    }

    ShowMore_BTN_Click_UsingBool(){
        const self = this
        return (this.MyAssignmentCount_TXT_GetText().then((AssignmentCount) => {
            return (self.MyAssignmentList_TXT_Count().then((MyAssignmentListCount) => {
                if((AssignmentCount != MyAssignmentListCount)){
                    return true
                }else if((AssignmentCount != 0) && (AssignmentCount > 10)){
                    return false
                }else if((AssignmentCount == MyAssignmentListCount)){
                    return false
                }
            }))                
        }))
    }

    IsTheTestVisible(){
        return (this.MyAssignmentCount_TXT_GetText().then((AssignmentCount) => {
            if(AssignmentCount == 0){
                return false
            }else{
                return true
            }
        }))
    }

    CheckThatNewTagShouldBeVisibleForUpComing(ElementName){
        const self = this
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetIndexValueFromElementText(this.UpcomingAssignmentList_LST, ElementName).then((indexValue) => {
            return (genericFunctions.CountOfAllElements(self.UpcomingAssignmentList_LST).then((elementCount) => {
                self.compareValue = parseInt(indexValue)+parseInt(elementCount+1)
                cy.wait(500)
                self.compareValue = (parseInt(elementCount+1)-(self.compareValue))
                return (self.NewTagForUpcomingAssignment_TXT_GetText(+self.compareValue).then((newText) => {
                    return newText
                }))
            }))
        }))
    }

    ShowMoreUpComing_BTN_Click(){
        const self = this
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(2000)
        this.MyAssignmentCountUpComing_TXT_GetText().then((AssignmentCount) => {
            self.MyAssignmentListCommingUp_TXT_Count().then((MyAssignmentListCount) => {
                if(AssignmentCount != MyAssignmentListCount){
                    genericFunctions.ClickForecefully(self.ShowMoreUpComing_BTN)
                    self.ShowMoreUpComing_BTN_Click()
                }
            })
        })
    }

    MyAssignmentList_TXT_GetText(){
        const self = this
        const genericFunctions = new GenericFunctions()
        // self.ShowMore_BTN_Click()
        return (genericFunctions.GetTextFromAllElements(self.MyAssignmentList_TXT))       
    }

    SelectedDifficulity_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.SelectedDifficulity_TXT))       
    }

    SelectedDuration_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.SelectedDuration_TXT))       
    }

    NewTagForTodayAssignment_TXT_GetText(elementCount){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.NewTagForTodayAssignment_TXT_1+(elementCount)+this.NewTagForTodayAssignment_TXT_2))       
    }

    NewTagForTodayOverDue_TXT_GetText(elementCount){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.NewTagForTodayAssignment_TXT_1+(elementCount)+this.OverDueTagForTodayAssignment_TXT))       
    }

    StrikeOffTodayAssignment_WE_GetText(elementCount){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(500)
        this.compareValue = this.NewTagForTodayAssignment_TXT_1+(elementCount)+this.StrikeOffTodayAssignment_WE
        return (genericFunctions.CompareAttributeOfSingleElement(this.compareValue, 0, "class").then((classText) => {
            if(classText.includes("completed")){
                return true
            }else{
                return false
            }
        }))
    }

    NewTagForUpcomingAssignment_TXT_GetText(elementCount){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.NewTagForUpcomingAssignment_TXT_1+elementCount+this.NewTagForUpcomingAssignment_TXT_2))       
    }

    MyAssignmentListCommingUp_TXT_GetText(){
        const self = this
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromAllElements(self.MyAssignmentListCommingUp_TXT))       
    }

    MyAssignmentCount_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.GetTextFromElement(this.MyAssignmentCount_TXT).then((AssignmentCount) => {
            AssignmentCount = AssignmentCount.replace(" tasks due", "")
            // AssignmentCount = AssignmentCount.replace(" ", "")
            return parseInt(AssignmentCount)
        }))
    }

    MyAssignmentCountUpComing_TXT_GetText(){
        let count =""
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.GetTextFromElement(this.MyAssignmentCountUpComing_TXT).then((AssignmentCount) => {
            count = AssignmentCount
            count = count.replace(/[^0-9]/g, "")
            count = count.replace(" ","")
            return parseInt(count)
        }))
    }

    Duration_GetValue_API(){
        const genericFunctions = new GenericFunctions()
        const getApiFunctions = new GetApiFunctions()
        getApiFunctions.activity_1_api_v1_assignment_task_GET().then((response) => {
            cy.log("response : "+response)
        })
    }
}