import GenericFunctions from "../support/GenericFunctions"
import GetUrl from "../support/GetUrl";
import BookShelf from "../support/BookShelf_po";
import Chapters from "../support/Chapters_po";
import Practice_IntroWithTQ from "../support/Practice_IntroWithTQ_po"

export default class Practice_po{

    TotalNumberOfQuestions = ".row .col:nth-child(1)";
    GetTypeOfQuestion_WE = "div.mainWrapper.vertical"
    TotalNumberOfOptionsInQuestion_WE = "input[type='checkbox']"
    CheckForCorrectAndWrongAnswer_WE = "tce-option"
    IAttemptLater_TXT = "I’ll attempt later"
    QuestionText_WE = ".questBox .ql-editor p"
    CheckAnswer_TXT = " Check Answer"
    CorrectAnswerTextMssg_TXT = ".result-top div.textDisplay"
    Retry_BTN = ".btn-outline-primary"
    InCorrentOption_CBX = "tce-option.ng-star-inserted:not(.tick) input"
    CorrentOption_CBX = "tce-option.tick.ng-star-inserted input"


    TotalNumberOfQuestions_Count(){
        let totalQuestions;
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.TotalNumberOfQuestions).then((questionCount) => {
            totalQuestions = questionCount.split(" ")
            return totalQuestions[2]
        }))
    }

    Retry_BTN_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.Retry_BTN))
    }

    Retry_BTN_Click(){
        const self = this
        const genericFunctions = new GenericFunctions()
        this.Retry_BTN_GetText().then((text) => {
            if (text == " Retry"){
                genericFunctions.ClickForecefully(self.Retry_BTN)
            }else{
                genericFunctions.wait(2000)
                self.Retry_BTN_Click();
            }
        })
    }

    GetTypeOfQuestionType_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.wait(1000)
        return (genericFunctions.CompareAttributeOfSingleElement(this.GetTypeOfQuestion_WE, 0, "class").then((ClassName) => {
            if(ClassName.includes("scq")){
                return "scq"
            }else if(ClassName.includes("mcq")){
                return "mcq"
            }else if(ClassName.includes("subjective")){
                return "writtenQuestion"
            }else if (ClassName.includes("sorting")){
                return "sorting"
            }else if(ClassName.includes("composite")){
                return "composite"
            }
        }))
    }

    HandleScqTypeQuestionsForCorrectAnswers_New(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickForecefully(this.CorrentOption_CBX)
    }

    HandleScqTypeQuestionsForCorrectAnswers(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.TotalNumberOfOptionsInQuestion_WE).then((totalOptions) => {
            let ramdomValue = genericFunctions.RandomValueFromCount(totalOptions)
            genericFunctions.wait(1000)
            genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, (ramdomValue-1))
            genericFunctions.CompareAttributeOfSingleElement(this.CheckForCorrectAndWrongAnswer_WE, (ramdomValue-1), "class").then((classText) => {
                if(classText != "ng-star-inserted selectedOtp correct tick"){
                    this.HandleScqTypeQuestionsForCorrectAnswers();
                }
            })
        })
    }

    HandleScqTypeQuestionsForInCorrectAnswers(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.TotalNumberOfOptionsInQuestion_WE).then((totalOptions) => {
            let ramdomValue = genericFunctions.RandomValueFromCount(totalOptions)
            genericFunctions.wait(1000)
            genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, (ramdomValue-1))
            genericFunctions.CompareAttributeOfSingleElement(this.CheckForCorrectAndWrongAnswer_WE, (ramdomValue-1), "class").then((classText) => {
                if(classText != "ng-star-inserted selectedOtp incorrect"){
                    this.HandleScqTypeQuestionsForInCorrectAnswers();
                }
            })
        })
    }

    HandleMcqTypeQuestionsForCorrectAnswers_New(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.CorrentOption_CBX).then((count) => {
            for(let i=0; i<=(count-1); i++){
                genericFunctions.ClickOnSingleElement(this.CorrentOption_CBX, i)
            }
        })
    }
    
    HandleMcqTypeQuestionsForCorrectAnswers(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.TotalNumberOfOptionsInQuestion_WE).then((count) => {
            for(let i=0; i<=(count-1); i++){
                genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, i)
                genericFunctions.wait(1000)
                genericFunctions.CompareAttributeOfSingleElement(this.CheckForCorrectAndWrongAnswer_WE, i, "class").then((classText) => {
                    if(classText != "ng-star-inserted selectedOtp correct tick"){
                        genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, i)
                    }
                })
            }
        })
    }

    HandleMcqTypeQuestionsForWrongAnswers(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.TotalNumberOfOptionsInQuestion_WE).then((cnt) => {
            for(let ii=0; ii<=(cnt-1); ii++){
                genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, ii)
                genericFunctions.wait(1000)
                genericFunctions.CompareAttributeOfSingleElement(this.CheckForCorrectAndWrongAnswer_WE, ii, "class").then((Text) => {
                    if(Text != "ng-star-inserted selectedOtp incorrect"){
                        genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, ii)
                    }
                })
            }
        })
    }

    QuestionsForPartialAnswers(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.TotalNumberOfOptionsInQuestion_WE).then((totlcnt) => {
            for(let a=0; a<=(totlcnt-1); a++){
                genericFunctions.ClickOnSingleElement(this.TotalNumberOfOptionsInQuestion_WE, a)
            }
        })
    }

    IAttemptLater_TXT_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.ClickOnElementUsingText(this.IAttemptLater_TXT)
    }

    QuestionText_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.QuestionText_WE))
    }

    IsMcqTypeQuestionVisible(){
        this.TotalNumberOfQuestions_Count().then((count) => {
            for(let i=0; i<=(count-1); i++){
                cy.wait(1000)
                this.GetTypeOfQuestionType_WE_GetText().then((type) => {
                    if(type != "mcq"){
                        this.IAttemptLater_TXT_Click();
                    }
                })
            }
        })
    }

    IsScqTypeQuestionVisible(){
        this.TotalNumberOfQuestions_Count().then((count) => {
            for(let i=0; i<=(count-1); i++){
                cy.wait(1000)
                this.GetTypeOfQuestionType_WE_GetText().then((type) => {
                    if(type != "scq"){
                        this.IAttemptLater_TXT_Click();
                    }
                })
            }
        })
    }

    CheckAnswer_TXT_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickOnElementUsingText(this.CheckAnswer_TXT)
    }

    CorrectAnswerTextMssg_TXT_GetText(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.CorrectAnswerTextMssg_TXT))
    }

    CheckForMcqTypeQuestionForCorrectAnswer(){
        this.IsMcqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((check) => {
            if (check == "mcq"){
                this.HandleMcqTypeQuestionsForCorrectAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.CheckForMcqTypeQuestionForCorrectAnswer();
            }
        })
    }

    McqTypeQuestionsForWrongAnswer(){
        this.IsMcqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            if(questionType == "mcq"){
                this.HandleMcqTypeQuestionsForWrongAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.McqTypeQuestionsForWrongAnswer()
            }
        })
    }

    McqTypeQuestionsForRetryAnswer(){
        this.IsMcqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            if(questionType == "mcq"){
                this.HandleMcqTypeQuestionsForWrongAnswers();
                this.CheckAnswer_TXT_Click()
                this.Retry_BTN_Click()
                this.HandleMcqTypeQuestionsForCorrectAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.McqTypeQuestionsForRetryAnswer()
            }
        })
    }

    ScqTypeQuestionsForRetryAnswer(){
        this.IsScqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((questionType) => {
            if(questionType == "scq"){
                this.HandleScqTypeQuestionsForInCorrectAnswers();
                this.CheckAnswer_TXT_Click()
                this.Retry_BTN_Click()
                this.HandleScqTypeQuestionsForCorrectAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.ScqTypeQuestionsForRetryAnswer()
            }
        })
    }

    McqTypeQuestionForPartiallyAnswer(){
        this.IsMcqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((partialType) => {
            if(partialType == "mcq"){
                this.QuestionsForPartialAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.McqTypeQuestionForPartiallyAnswer()
            }
        })
    }

    CheckForScqTypeQuestionForCorrectAnswer(){
        this.IsScqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((check) => {
            if (check == "scq"){
                this.HandleScqTypeQuestionsForCorrectAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.CheckForScqTypeQuestionForCorrectAnswer();
            }
        })
    }

    CheckForScqTypeQuestionForInCorrectAnswer(){
        this.IsScqTypeQuestionVisible();
        this.GetTypeOfQuestionType_WE_GetText().then((check) => {
            if (check == "scq"){
                this.HandleScqTypeQuestionsForCorrectAnswers()
                this.CheckAnswer_TXT_Click()
            }else{
                this.LandOnPracticePageFromBookShelf()
                this.CheckForScqTypeQuestionForInCorrectAnswer();
            }
        })
    }

    LandOnPracticePageFromBookShelf(){
        const genericFunctions = new GenericFunctions();
        const practiceInto = new Practice_IntroWithTQ();
        const bookshelf = new BookShelf();
        const chapter = new Chapters();
        const getUrl = new GetUrl();
        genericFunctions.GetUrl(getUrl.GetBookShelfPageUrl())
        bookshelf.SelectRandomBook();
        chapter.SelectRandomTopic();
        chapter.BeginPracticeAndPracticeAgain_BTN_Click();
        practiceInto.BeginPracticeAndPracticeAgain_BTN_Click();
    }
    
    CheckSkippingQuestionIsWorkingFine(){
        const self = this;
        const genericFunctions = new GenericFunctions()
        return (this.QuestionText_WE_GetText().then((text) => {
            self.IAttemptLater_TXT_Click();
            genericFunctions.wait(3000)
            return (self.QuestionText_WE_GetText().then((txt) => {
                if(text != txt){
                    return true
                }else{
                    return false
                }
            }))
        }))
    }

}