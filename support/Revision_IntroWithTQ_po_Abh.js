import GenericFunctions_Abh from "../support/GenericFunctions_Abh";
import Chapters_Abh from "../support/Chapters_po_Abh";

export default class Revision_IntroWithTQ_Abh {

    All_TQ = "ul.points-nav div li"
    BeginRevise_BTN = "button.btn.btn-outline-primary"
    ReviseAgain_Btn = "button.btn-outline-secondary"
    BackButton_BTN = "span.icon.icon-back"
    AllTq_WE = "div.info.body-bold-light.normal"
    ChapterName_TXT = "h2.heading1.text-truncate"
    Revision_Intro_Url = "https://afs-qa-learn.testedgeonline.com/lesson/player?player=revise&module=browseBook"

    SelectTopicHavingMultiTq() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        const chapters_abh = new Chapters_Abh()
        genericFunctions_abh.GetElement(this.All_TQ).then(($ele) => {
            var Tqs = $ele.length
            cy.log(Tqs)
            if (Tqs == 1) {
                genericFunctions_abh.Click(this.BackButton_BTN)
                chapters_abh.SelectRandomChapter()
                chapters_abh.SelectRandomTopic()
                genericFunctions_abh.IsVisible(chapters_abh.BeginReviseAndReviseAgain_BTN)
                genericFunctions_abh.ClickWithScollIntoView(chapters_abh.BeginReviseAndReviseAgain_BTN)
                cy.wait(2000)
                this.SelectTopicHavingMultiTq()
            }
        })
        }

    HandleBeginRevise_And_ReviseAgain(){
            const genericFunctions_abh = new GenericFunctions_Abh();
            genericFunctions_abh.GetElement(this.BeginRevise_BTN).then(($el) => {
                var text = $el.text()
                if (text == " Continue Studying ") {
                    genericFunctions_abh.ClickForecefully(this.ReviseAgain_Btn)
                    cy.wait(5000)
                }
                else {
                    genericFunctions_abh.Click(this.BeginRevise_BTN)
                    cy.wait(5000)
                }
            })
        }
    //old 

    HandleBeginReviseAndReviseAgain(){
            const generic_abh = new GenericFunctions_Abh();
            generic_abh.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((text) => {
                generic_abh.ClickOnElementUsingText(text);
            })
        }

    BeginReviseAndReviseAgainTextVisible(){
            const generic_abh = new GenericFunctions_Abh();
            return(generic_abh.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((txt) => {
                if (txt.includes("Revise again") || txt.includes("Begin Revision")) {
                    return true;
                } else {
                    return false;
                }
            }))
    }

    BackButton_BTN_Click() {
        const generic_abh = new GenericFunctions_Abh();
        generic_abh.Click(this.BackButton_BTN);
    }

    BeginReviseAndReviseAgain_BTN_IsVisible() {
        const generic_abh = new GenericFunctions_Abh();
        return generic_abh.IsVisible(this.BeginReviseAndReviseAgain_BTN)
    }

    CountOf_AllTq_WE() {
        const generic_abh = new GenericFunctions_Abh();
        return (generic_abh.CountOfAllElements(this.AllTq_WE))
    }

    AllTq_WE_GetText() {
        const generic_abh = new GenericFunctions_Abh();
        return (generic_abh.GetTextFromElement(this.AllTq_WE))
    }

    ChapterName_TXT_GetText() {
        const generic_abh = new GenericFunctions_Abh();
        return (generic_abh.GetTextFromElement(this.ChapterName_TXT))
    }

}