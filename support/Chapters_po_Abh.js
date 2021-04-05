import GenericFunctions_Abh from "../support/GenericFunctions_Abh";
import GetApiFunctions from "../support/GetApiFunctions";
import ApiConfig from "../support/ApiConfig"
import IntroWithTQ from "./Revision_IntroWithTQ_po"
import genericfunctions from "../support/GenericFunctions";
import GetUrl_Abh from "../support/GetUrl_Abh"
import BookShelf_Abh from "../support/BookShelf_po_Abh"


export default class Chapters_Abh {

    Chapter_Url = "https://afs-qa-learn.testedgeonline.com/browseBook/chapters/(comp:d)"
    Flag = 0;
    AllChapters_WE = ".align-items-center.d-flex.justify-content-between.ng-star-inserted"//.justify-content-between .collapsed > h5"
    Chapter_Expanded = "div.card-expanded"
    Exclude_FromSyllabus_Btn = '[for="customSwitch1"]'
    CompletedInSchool_Btn = '[for = "customSwitch2"]'
    AllChapters_Parent_Ele = "afs-lib-chapter-accordian.ng-star-inserted"
    AllChapters_Heading = ".card.card-main-header.ng-star-inserted"
    //Status_Icon
    AllTopic_Conf_Icon = "svg.icon"
    AllTopic_NotStudied_Class = "icon icon-notstudied ng-star-inserted"
    AllTopic_LowConf_Class = "icon icon-conf-low ng-star-inserted"
    AllTopic_MidConf_Class = "icon icon-conf-mid ng-star-inserted"
    AllTopic_HighConf_Class = "icon icon-conf-high ng-star-inserted"
    AllTopic_CompInSchool_Class = "icon icon-completed-inschool ng-star-inserted"
    AllTopic_ExcludeFromSyllabus_Class = "icon icon-iconexclude ng-star-inserted"
    AllTopic_NotStudied_Icon = ".icon-notstudied"
    AllTopic_LowConf_Icon = ".icon-conf-low"
    AllTopic_MidConf_Icon = ".icon-conf-mid"
    AllTopic_HighConf_Icon = ".icon-conf-high"
    AllTopic_CompInSchool_Icon = ".icon-completed-inschool"
    AllTopic_ExcludeFromSyllabus_Icon = ".icon-iconexclude"
    AllTopics_WE = "div[class='card-header'] .w-100 h5"
    AllTopic_Parent_Ele = ".card.ng-star-inserted"
    Excluded_Class_Ele = ".ng-star-inserted.excluded"
    //
    //Text
    BeginPractice_Txt = " Begin Practice "
    Practice_Again_Txt = " Practice Again "
    //
    BeginReviseAndReviseAgain_BTN = ".c-pointer:nth-child(1) div.d-flex div h4"
    SecondaryBeginReviseAndReviseAgain_BTN = "button.btn.btn-outline-secondary"
    BeginPracticeAndPracticeAgain_BTN = ".c-pointer:nth-child(2) div.d-flex div h4"
    BookName_TXT = "h2.heading1.text-truncate"
    PracticeDuration_TXT = ".c-pointer:nth-child(2) div:nth-child(2) p"
    ReviseDuration_TXT = ".c-pointer:nth-child(1) div:nth-child(2) p"
    AllTopicDuration_WE = "div[class='w-100'] .mb-0.small-text"
    SelectTopic_TXT = ".intent-modal-open h2.heading2"
    StudyPlan_TXT = ":nth-child(3) > :nth-child(2) h3.title.heading5"
    StudyPlanAddToPortion_BTN = ".d-flex > .btn.btn-outline-primary"
    StudyPlanNextStep_BTN = "button.btn-outline-primary span"
    StudyPlanTopicTitle_TXT = ".page-sec-pt-heading > .heading2"
    Icon_Back = "span.icon-back"

    CheckTypeOfStatusIconVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetElement(this.AllTopic_Conf_Icon).each(($ele) => {
            cy.get($ele).invoke('attr', "class").then($el => {
                if ($el.includes(this.AllTopic_NotStudied_Class)) {
                    cy.get(".icon-notstudied").should("be.visible")
                }
                if ($el.includes(this.AllTopic_LowConf_Class)) {
                    cy.get(".icon-conf-low").should("be.visible")
                }
                if ($el.includes(this.AllTopic_MidConf_Class)) {
                    cy.get(".icon-conf-mid").should("be.visible")
                }
                if ($el.includes(this.AllTopic_HighConf_Class)) {
                    cy.get(".icon-conf-high").should("be.visible")
                }
                if ($el.includes(this.AllTopic_CompInSchool_Class)) {
                    cy.get(".icon-completed-inschool").should("be.visible")
                }
                if ($el.includes(this.AllTopic_ExcludeFromSyllabus_Class)) {
                    cy.get(".icon-iconexclude").should("be.visible")
                }
            })
        })
    }

    CheckSelectedChapterIsExcluded() {
        var flag = []
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetElement(this.Chapter_Expanded).find(this.AllChapters_WE)
            .invoke('attr', "class").then(($el) => {
                if ($el.includes("excluded")) {
                    flag.push(true)
                }
                else {
                    flag.push(false)
                }
            })
        return flag
    }

    FindHighConfChapter() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var C
        var S
        var L
        var N = []
        genericFunctions_abh.GetElement(this.AllChapters_Parent_Ele).each(($ele, index) => {
            cy.get($ele).find(this.AllTopic_Conf_Icon).then(($el) => {
                S = 0
                L = $el.length
                C = 0
                for (var i = 0; i < L; i++) {
                    // cy.wait(300)
                    cy.get($el).eq(`${i}`).invoke('attr', "class").then(($el) => {
                        S = S + 1
                        if ($el.includes(this.AllTopic_HighConf_Class)) {
                            C = C + 1
                        }
                        cy.wait(500)
                        if ((C == L)) {
                            N.push(index)
                        }
                    })
                }
            })
        })
        return N
    }

    FindMidConfChapter() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var C
        var S
        var L
        var N = []
        genericFunctions_abh.GetElement(this.AllChapters_Parent_Ele).each(($ele, index) => {
            cy.get($ele).find(this.AllTopic_Conf_Icon).then(($el) => {
                S = 0
                L = $el.length
                C = 0
                for (var i = 0; i < L; i++) {
                    // cy.wait(300)
                    cy.get($el).eq(`${i}`).invoke('attr', "class").then(($el) => {
                        S = S + 1
                        if (($el.includes(this.AllTopic_HighConf_Class)) || ($el.includes(this.AllTopic_MidConf_Class))) {
                            C = C + 1
                        }
                        cy.wait(500)
                        if ((C < L) && (C > (L / 2)) && (S == L) && (L > 2)) {
                            N.push(index)
                        }
                    })
                }
            })
        })
        return N
    }

    FindLowConfChapter() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var C
        var S
        var L
        var N = []
        genericFunctions_abh.GetElement(this.AllChapters_Parent_Ele).each(($ele, index) => {
            cy.get($ele).find(this.AllTopic_Conf_Icon).then(($el) => {
                S = 0
                L = $el.length
                C = 0
                for (var i = 0; i < L; i++) {
                    // cy.wait(300)
                    cy.get($el).eq(`${i}`).invoke('attr', "class").then(($el) => {
                        S = S + 1
                        if ($el.includes(this.AllTopic_NotStudied_Class)) {
                            C = C + 1
                        }
                        cy.wait(500)
                        if ((C < L) && (C > (L / 2)) && (S == L)) {
                            N.push(index)
                        }
                    })
                }
            })
        })
        return N
    }

    FindNotStartedChapter() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var C
        var L
        var N = []
        genericFunctions_abh.GetElement(this.AllChapters_Parent_Ele).each(($ele, index) => {
            cy.get($ele).find(this.AllTopic_Conf_Icon).then(($el) => {
                L = $el.length
                C = 0
                for (var i = 0; i < L; i++) {
                    cy.wait(300)
                    cy.get($el).eq(`${i}`).invoke('attr', "class").then(($el) => {
                        if ($el.includes(this.AllTopic_NotStudied_Class)) {
                            C = C + 1
                        }
                        if (L == C) {
                            N.push(index)
                        }
                    })
                }
            })
        })
        return N
    }

    StudyPlanTopicTitle_TXT_GeText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.StudyPlanTopicTitle_TXT))
    }

    SecondaryBeginReviseAndReviseAgain_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickForecefully(this.SecondaryBeginReviseAndReviseAgain_BTN)
    }

    StudyPlanNextStep_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        // this.StudyPlanNextStep_BTN_IsVisible().then(buttonVisible => {
        //     if(buttonVisible != false){
        genericFunctions_abh.wait(2000)
        genericFunctions_abh.ClickForecefully(this.StudyPlanNextStep_BTN)
        //     }
        // })
    }

    StudyPlanNextStep_BTN_IsVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisible(this.StudyPlanNextStep_BTN))
    }

    StudyPlanAddToPortion_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickForecefully(this.StudyPlanAddToPortion_BTN)
    }

    StudyPlan_TXT_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickForecefully(this.StudyPlan_TXT)
    }

    SelectTopic_TXT_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.SelectTopic_TXT))
    }

    SelectRandomChapter() {
        let value = 0;
        var V = []
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.CountOfAllElements(this.AllChapters_WE).then((count) => {
            value = genericFunctions_abh.RandomValueFromCount(count);
            V.push((value - 1))
            cy.log("value : " + value + " , count : " + count)
            cy.scrollTo("bottom").wait(1000)
            genericFunctions_abh.ClickOnSingleElementWithoutForce(this.AllChapters_WE, (value - 1))
        })
        return V
    }

    SelectRandomTopic() {
        let value = 0;
        const genericFunctions_abh = new GenericFunctions_Abh();
        // genericFunctions.wait(2000)
        genericFunctions_abh.CountOfAllElements(this.AllTopics_WE).then((AllTopiCnt) => {
            value = genericFunctions_abh.RandomValueFromCount(AllTopiCnt);
            this.CheckForTheBigIdea(this.AllTopics_WE, (value - 1)).then((visible) => {
                if (visible != true) {
                    genericFunctions_abh.ClickOnSingleElement(this.AllTopics_WE, (value - 1));
                } else {
                    this.SelectRandomTopic();
                }
            })
        })
    }

    HandleBeginReviseAndReviseAgain() {
        const self = this
        const getUrl_abh = new GetUrl_Abh()
        const bookshelf_abh = new BookShelf_Abh()
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((ElemenText) => {
            genericFunctions_abh.GetTextFromElement(this.ReviseDuration_TXT).then((ReviseDuration) => {
                if (!ReviseDuration.includes(" 0 mins ")) {
                    if (ElemenText != " Continue Studying ") {
                        genericFunctions_abh.ClickOnElementUsingText(ElemenText);
                    } else if (ElemenText == " Continue Studying ") {
                        this.SecondaryBeginReviseAndReviseAgain_BTN_Click()
                    }
                } else {
                    genericFunctions_abh.GetUrl(getUrl_abh.GetBookShelfPageUrl)
                    bookshelf_abh.SelectRandomBook()
                    self.SelectRandomTopic()
                    self.HandleBeginReviseAndReviseAgain()
                }
            })
        })
    }

    BeginPracticeAndPracticeAgain_BTN_Click() {
        const self = this
        const getUrl_abh = new GetUrl_Abh()
        const bookshelf = new BookShelf()
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((ElemenText) => {
            genericFunctions_abh.GetTextFromElement(this.PracticeDuration_TXT).then((PracticeDuration) => {
                if (!PracticeDuration.includes(" 0 mins ")) {
                    genericFunctions_abh.ClickOnElementUsingText(ElemenText)
                } else {
                    genericFunctions_abh.GetUrl(getUrl_abh.GetBookShelfPageUrl())
                    bookshelf.SelectRandomBook()
                    self.SelectRandomTopic()
                    self.BeginPracticeAndPracticeAgain_BTN_Click()
                }
            })
        })
    }

    AllTopics_WE_Count() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.CountOfAllElements(this.AllTopics_WE))
    }

    BeginReviseAndReviseAgainTextVisible() { //observe this method for continue study
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((txtVisible) => {
            if (txtVisible.includes(" Revise Again ") || txtVisible.includes(" Begin Revise ")) {
                return true;
            } else {
                return false;
            }
        }))
    }

    BeginPracticeAndPracticeAgain_BTN_TextVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.BeginPracticeAndPracticeAgain_BTN).then((txtVisible) => {
            if (txtVisible.includes(" Begin Practice ") || txtVisible.includes(" Practice Again ")) {
                return true;
            } else {
                return false;
            }
        }))
    }

    BeginReviseAndReviseAgain_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then(ElemenText => {
            if (ElemenText != " Continue Studying ") {
                genericFunctions_abh.ClickForecefully(this.BeginReviseAndReviseAgain_BTN)
            } else if (ElemenText == " Continue Studying ") {
                this.SecondaryBeginReviseAndReviseAgain_BTN_Click()
            }
        })
    }

    BookName_TXT_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.BookName_TXT))
    }

    BeginReviseAndReviseAgain_BTN_IsVisible() {
        const self = this
        const getUrl_abh = new GetUrl_Abh()
        const bookshelf = new BookShelf()
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisible(this.BeginReviseAndReviseAgain_BTN).then(function (buttonVisible) {
            if ((self.Flag < 6) && (buttonVisible == false)) {
                genericFunctions_abh.GetUrl(getUrl_abh.GetBookShelfPageUrl())
                bookshelf.SelectRandomBook()
                self.SelectRandomTopic()
                self.Flag++;
                self.BeginReviseAndReviseAgain_BTN_IsVisible()
            } else if ((self.Flag < 6) && (buttonVisible == true)) {
                return true;
            } else if ((self.Flag == 6) && (buttonVisible == false)) {
                return false
            }
        }))
    }

    BeginPracticeAndPracticeAgain_BTN_IsVisible() {
        const self = this
        const getUrl_abh = new GetUrl_Abh()
        const bookshelf = new BookShelf()
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisible(this.BeginPracticeAndPracticeAgain_BTN).then(function (buttonVisible) {
            if ((self.Flag < 6) && (buttonVisible == false)) {
                genericFunctions_abh.GetUrl(getUrl_abh.GetBookShelfPageUrl())
                bookshelf.SelectRandomBook()
                self.SelectRandomTopic()
                self.BeginPracticeAndPracticeAgain_BTN_Click()
                self.BeginPracticeAndPracticeAgain_BTN_IsVisible()
                self.Flag++;
            } else if ((self.Flag < 6) && (buttonVisible == true)) {
                return true;
            } else if ((self.Flag == 6) && (buttonVisible == false)) {
                return false
            }
        }))
    }

    CheckForTheBigIdea(elements, value) {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromDefinedElement(elements, value).then((BigIdeaText) => {
            if (BigIdeaText.text().includes("The Big Idea")) {
                return true
            } else {
                return false
            }
        }))
    }

    FindMultipleTqTopic() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        const introWithTQ = new IntroWithTQ();
        const getUrl_abh = new GetUrl_Abh()
        const bookShelf = new BookShelf();
        this.SelectRandomTopic();
        this.HandleBeginReviseAndReviseAgain();
        introWithTQ.CountOf_AllTq_WE().then((countOfTQ) => {
            if (countOfTQ > 1) {
                introWithTQ.HandleBeginReviseAndReviseAgain();
            } else {
                genericFunctions_abh.GetUrl(getUrl_abh.GetBookShelfPageUrl());
                bookShelf.SelectRandomBook();
                this.FindMultipleTqTopic();
            }
        })
    }

    DurationOfTopicShouldNotBeZero() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromAllElements(this.AllTopicDuration_WE).each((AllTopicDuration) => {
            return AllTopicDuration.text();
        }))
    }

}