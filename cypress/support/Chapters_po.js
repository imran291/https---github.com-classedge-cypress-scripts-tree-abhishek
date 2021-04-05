import GenericFunctions from "../support/GenericFunctions";
import GetApiFunctions from "../support/GetApiFunctions";
import ApiConfig from "../support/ApiConfig"
import IntroWithTQ from "./Revision_IntroWithTQ_po"
import genericfunctions from "../support/GenericFunctions";
import GetUrl from "../support/GetUrl"
import BookShelf from "../support/BookShelf_po"


export default class Chapters{

    Flag = 0;
    AllChapters_WE = ".justify-content-between .collapsed > h5";
    AllTopics_WE = "div[class='card-header'] .w-100 h5";
    BeginReviseAndReviseAgain_BTN = ".c-pointer:nth-child(1) div.d-flex div h4";
    SecondaryBeginReviseAndReviseAgain_BTN = "button.btn.btn-outline-secondary"
    BeginPracticeAndPracticeAgain_BTN = ".c-pointer:nth-child(2) div.d-flex div h4"
    BookName_TXT = "h2.heading1.text-truncate";
    PracticeDuration_TXT = ".c-pointer:nth-child(2) div:nth-child(2) p"
    ReviseDuration_TXT = ".c-pointer:nth-child(1) div:nth-child(2) p"
    AllTopicDuration_WE = "div[class='w-100'] .mb-0.small-text"
    SelectTopic_TXT = ".intent-modal-open h2.heading2"
    StudyPlan_TXT = ":nth-child(3) > :nth-child(2) h3.title.heading5"
    StudyPlanAddToPortion_BTN = ".d-flex > .btn.btn-outline-primary"
    StudyPlanNextStep_BTN = "button.btn-outline-primary span"
    StudyPlanTopicTitle_TXT = ".page-sec-pt-heading > .heading2"


    StudyPlanTopicTitle_TXT_GeText(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.StudyPlanTopicTitle_TXT))
    }

    SecondaryBeginReviseAndReviseAgain_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.SecondaryBeginReviseAndReviseAgain_BTN)
    }

    StudyPlanNextStep_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        // this.StudyPlanNextStep_BTN_IsVisible().then(buttonVisible => {
        //     if(buttonVisible != false){
            genericFunctions.wait(2000)
                genericFunctions.ClickForecefully(this.StudyPlanNextStep_BTN)
        //     }
        // })
    }

    StudyPlanNextStep_BTN_IsVisible(){
        const genericFunctions = new GenericFunctions();
        return  (genericFunctions.IsVisible(this.StudyPlanNextStep_BTN))
    }

    StudyPlanAddToPortion_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.StudyPlanAddToPortion_BTN)
    }

    StudyPlan_TXT_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.StudyPlan_TXT)
    }

    SelectTopic_TXT_GetText(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.SelectTopic_TXT))
    }

    SelectRandomChapter(){
        let value = 0;
        const genericFunctions = new GenericFunctions();
        genericFunctions.CountOfAllElements(this.AllChapters_WE).then((count) => {
            value = genericFunctions.RandomValueFromCount(count);
            cy.log("value : "+value+" , count : "+count )
            genericFunctions.ClickOnSingleElement(this.AllChapters_WE, (value-1));
        })
    }

    SelectRandomTopic(){
        let value = 0;
        const genericFunctions = new GenericFunctions();
        // genericFunctions.wait(2000)
        genericFunctions.CountOfAllElements(this.AllTopics_WE).then((AllTopiCnt) => {
            value = genericFunctions.RandomValueFromCount(AllTopiCnt);
            this.CheckForTheBigIdea(this.AllTopics_WE, (value-1)).then((visible) => {
                if (visible != true){
                    genericFunctions.ClickOnSingleElement(this.AllTopics_WE, (value-1));
                }else{
                    this.SelectRandomTopic();
                }
            })      
        })
    }

    HandleBeginReviseAndReviseAgain(){
        const self = this
        const getUrl = new GetUrl()
        const bookshelf = new BookShelf()
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((ElemenText) => {
            genericFunctions.GetTextFromElement(this.ReviseDuration_TXT).then((ReviseDuration) => {
                if(!ReviseDuration.includes(" 0 mins ")){
                    if(ElemenText != " Continue Studying "){
                        genericFunctions.ClickOnElementUsingText(ElemenText);
                    }else if(ElemenText == " Continue Studying "){
                        this.SecondaryBeginReviseAndReviseAgain_BTN_Click()
                    }
                }else{
                    genericFunctions.GetUrl(getUrl.GetBookShelfPageUrl)
                    bookshelf.SelectRandomBook()
                    self.SelectRandomTopic()
                    self.HandleBeginReviseAndReviseAgain()
                }
            }) 
        })
    }

    BeginPracticeAndPracticeAgain_BTN_Click(){
        const self = this
        const url = new GetUrl()
        const bookshelf = new BookShelf()
        const genericFunctions = new GenericFunctions();
        genericFunctions.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((ElemenText) => {
            genericFunctions.GetTextFromElement(this.PracticeDuration_TXT).then((PracticeDuration) => {
                if(!PracticeDuration.includes(" 0 mins ")){
                    genericFunctions.ClickOnElementUsingText(ElemenText)
                }else{
                    genericFunctions.GetUrl(url.GetBookShelfPageUrl())
                    bookshelf.SelectRandomBook()
                    self.SelectRandomTopic()
                    self.BeginPracticeAndPracticeAgain_BTN_Click()
                }
            })
        })
    }

    AllTopics_WE_Count(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.CountOfAllElements(this.AllTopics_WE))
    }

    BeginReviseAndReviseAgainTextVisible(){ //observe this method for continue study
    const genericFunctions = new GenericFunctions();
       return (genericFunctions.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((txtVisible) => {
            if(txtVisible.includes(" Revise Again ") || txtVisible.includes(" Begin Revise ")){
                return true;
            }else{
                return false;
            }
        }))
    }

    BeginPracticeAndPracticeAgain_BTN_TextVisible(){
        const genericFunctions = new GenericFunctions();
           return (genericFunctions.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((txtVisible) => {
                if(txtVisible.includes(" Begin Practice ") || txtVisible.includes(" Practice Again ")){
                    return true;
                }else{
                    return false;
                }
            }))
        }

    BeginReviseAndReviseAgain_BTN_Click(){
        const genericFunctions = new GenericFunctions()
        genericFunctions.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then(ElemenText => {
            if(ElemenText != " Continue Studying "){
                genericFunctions.ClickForecefully(this.BeginReviseAndReviseAgain_BTN)
            }else if(ElemenText == " Continue Studying "){
                this.SecondaryBeginReviseAndReviseAgain_BTN_Click()     
            } 
        })
    }

    BookName_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.BookName_TXT))
    }

    BeginReviseAndReviseAgain_BTN_IsVisible(){
        const self = this
        const url = new GetUrl()
        const bookshelf = new BookShelf()
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsVisible(this.BeginReviseAndReviseAgain_BTN).then(function(buttonVisible){
            if((self.Flag < 6) && (buttonVisible == false)){
                genericFunctions.GetUrl(url.GetBookShelfPageUrl())
                bookshelf.SelectRandomBook()
                self.SelectRandomTopic()
                self.Flag++;
                self.BeginReviseAndReviseAgain_BTN_IsVisible()   
            }else if((self.Flag < 6) && (buttonVisible == true)){
                return true;
            }else if((self.Flag == 6) && (buttonVisible == false)){
                return false
            }
        }))
    }

    BeginPracticeAndPracticeAgain_BTN_IsVisible(){
        const self = this
        const url = new GetUrl()
        const bookshelf = new BookShelf()
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsVisible(this.BeginPracticeAndPracticeAgain_BTN).then(function(buttonVisible){
            if((self.Flag < 6) && (buttonVisible == false)){
                genericFunctions.GetUrl(url.GetBookShelfPageUrl())
                bookshelf.SelectRandomBook()
                self.SelectRandomTopic()
                self.BeginPracticeAndPracticeAgain_BTN_Click()
                self.BeginPracticeAndPracticeAgain_BTN_IsVisible()
                self.Flag++;
            }else if((self.Flag < 6) && (buttonVisible == true)){
                return true;
            }else if((self.Flag == 6) && (buttonVisible == false)){
                return false
            }
        }))
    }

    CheckForTheBigIdea(elements, value){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromDefinedElement(elements, value).then((BigIdeaText) => {
            if(BigIdeaText.text().includes("The Big Idea")){
                return true
            }else{
                return false
            }          
        }))
    }

    FindMultipleTqTopic(){
        const genericFunctions = new GenericFunctions();
        const introWithTQ = new IntroWithTQ();
        const getUrl = new GetUrl()
        const bookShelf = new BookShelf();
        this.SelectRandomTopic();
        this.HandleBeginReviseAndReviseAgain();
        introWithTQ.CountOf_AllTq_WE().then((countOfTQ) => {
            if(countOfTQ > 1){
                introWithTQ.HandleBeginReviseAndReviseAgain();
            }else{
                genericFunctions.GetUrl(getUrl.GetBookShelfPageUrl());
                bookShelf.SelectRandomBook();
                this.FindMultipleTqTopic();
            }
        })
    }

    DurationOfTopicShouldNotBeZero(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromAllElements(this.AllTopicDuration_WE).each((AllTopicDuration) => {
            return AllTopicDuration.text();
        }))
    }

}