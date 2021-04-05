import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import HamburgerMenu_Abh from "../support/HamburgerMenu_po_Abh"

export default class Revision_Abh {

    flag = 0
    CreateNote_BTN = "span.icon.icon-add-note-white"
    Type_Note = "div.ql-editor.ql-blank"
    Save_Note_Text = " Save Note "
    DoNotShowMeAgain_TXT = "DO NOT SHOW ME AGAIN"
    VideoSection_WE = "div.video-section"
    ContinueButtonForCue_BTN = ".caption-btn-sec button.btn.btn-sm"
    ContinueButtonVisibility_WE = "button.vjs-play-control.vjs-control.vjs-button"
    Back_BTN = "span.icon.icon-back"
    SureWantToGoAway_Yes_BTN = " Yes "
    VideoCueAndCreateNote_WE = "div.vjs-notes-btn.ng-star-inserted"
    VideoLoader_WE = "div.video-js.vjs-big-play-centered"
    Pause_Play_Btn = "button.vjs-play-control"
    Play_Btn_Class = "vjs-playing"
    Pause_Btn_Class = "vjs-paused"
    Video_End_Btn_Class = "vjs-ended"
    Video_End_Btn = "button.vjs-ended"
    Video_Current_time = ".video-timer-box .current-time"
    Video_SliderBar = ".vjs-play-progress.vjs-slider-bar"
    Que_Points = "p.ng-star-inserted"
    Hamburger_Menu_Btn = ".icon-hamburger-menu"
    Continue_Btn_Text = " Continue "
    Skip_Btn_Text = " Skip "
    Note_Continue_Btn = '[type="button"].btn-white'
    //quiz
    Quiz_Container = "div.quiz-player-container"
    NumberOf_QuizQuestions = ".bullets-paging button"
    Answer_Options = "tce-option.ng-star-inserted"
    Selected_Options_Class = "selectedOtp"
    Checkboxes = '.custom-checkbox input[type="checkbox"]'
    Correct_Answer = "tce-option.tick.ng-star-inserted"
    Selected_Correct_Answer = ".selectedOtp.correct.tick"
    Selected_Incorrect_Answer = ".ng-star-inserted.selectedOtp.incorrect"
    Next_Que_Btn = "span.icon-test-next"
    Show_Answer_Text = " Show Answer "
    Show_Answer_Btn = '.actionBox.ng-star-inserted'
    Show_Answer_Output = "div.outputArea"
    Dragable_Ele = '[draggable="true"]'

    //summary
    Summary_Box = "div.summry-details-box"

    HandleElement(element) {
        const genericFunctions_abh = new GenericFunctions_Abh();
        var ele = [] 
        cy.document().then((doc) => {
            var x = doc.querySelector(element)
            if (x == null) {
                ele.push(false)
                cy.wait(2000)
            }
            else{
                ele.push(true)
            }
        })
    }

    HandleNoteContinueBtn() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Note_Continue_Btn)
            if (x !== null) {
                // cy.scrollTo("bottom").wait(1000)
                genericFunctions_abh.Click(this.Note_Continue_Btn)
                cy.wait(2000)
            }
        })
    }

    HandleDragDropQue() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Dragable_Ele)
            if (x !== null) {
                cy.scrollTo("bottom").wait(1000)
                genericFunctions_abh.Click(this.Next_Que_Btn)
                // cy.wait(2000)
            }
        })
    }

    HandleShowAnswerQue() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Show_Answer_Btn)
            if (x !== null) {
                cy.scrollTo("bottom").wait(1000)
                genericFunctions_abh.Click(this.Show_Answer_Btn)
                genericFunctions_abh.IsVisible(this.Show_Answer_Output)
                genericFunctions_abh.Click(this.Next_Que_Btn)
                // cy.wait(2000)
            }
        })
    }

    HandleRadioQue() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.scrollTo("bottom").wait(1000)
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Checkboxes)
            if (x !== null) {
                genericFunctions_abh.GetElement(this.Answer_Options)
                    .should("not.have.class", this.Selected_Options_Class)
                genericFunctions_abh.GetElement(this.Answer_Options).each(($el) => {
                    cy.wrap($el).scrollIntoView().wait(1000)
                    cy.wrap($el).click()
                })
                genericFunctions_abh.IsVisible(this.Selected_Correct_Answer)
                genericFunctions_abh.IsVisible(this.Selected_Incorrect_Answer)
                genericFunctions_abh.Click(this.Next_Que_Btn)
                // cy.wait(2000)
            }
        })
    }

    HandleRadioQueWithCorrectAnswer() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.scrollTo("bottom").wait(1000)
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Checkboxes)
            if (x !== null) {
                genericFunctions_abh.GetElement(this.Answer_Options)
                    .should("not.have.class", this.Selected_Options_Class)
                genericFunctions_abh.GetElement(this.Correct_Answer).each(($el) => {
                    cy.wrap($el).scrollIntoView().wait(1000)
                    cy.wrap($el).click()
                })
                genericFunctions_abh.IsVisible(this.Selected_Correct_Answer)
                genericFunctions_abh.Click(this.Next_Que_Btn)
                // cy.wait(2000)
            }
        })
    }

    CheckStateOfAnsweredQue(){
        const genericFunctions_abh = new GenericFunctions_Abh();
        cy.scrollTo("bottom").wait(1000)
        cy.document().then((doc) => {
            var x = doc.querySelector(this.Checkboxes)
            if (x !== null) {
                genericFunctions_abh.IsVisible(this.Selected_Correct_Answer)
                genericFunctions_abh.IsVisible(this.Selected_Incorrect_Answer)
            }
        })
    }

    //old
    ContinueButtonForCue_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickForecefully(this.ContinueButtonForCue_BTN)
    }

    VideoCueAndCreateNote_WE_IsVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisible(this.VideoCueAndCreateNote_WE))
    }

    VideoCueAndCreateNote_WE_GetAttributText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(3000)
        return (genericFunctions_abh.CompareAttributeOfSingleElement(this.VideoCueAndCreateNote_WE, 0, "class").then(function (attributeValue) {
            if (attributeValue.includes("hidden")) {
                return "hidden"
            } else {
                return "icon"
            }
        }))
    }

    ContinueButtonForCue_BTN_IsVisible() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.IsVisible(this.ContinueButtonForCue_BTN).then((check) => {
            if (check == true) {
                genericFunctions_abh.ElementScrollIntoView(self.ContinueButtonForCue_BTN, 0, 1)
                self.ContinueButtonForCue_BTN_Click()
            }
        })
    }

    SureWantToGoAway_Yes_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickOnElementUsingText(this.SureWantToGoAway_Yes_BTN)
    }

    Back_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.Click(this.Back_BTN)
    }

    VideoLoader_WE_Wait() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(3000)
        genericFunctions_abh.CompareAttributeOfSingleElement(this.VideoLoader_WE, 0, "class").then(function (elementWait) {
            if ((!elementWait.includes("inactive")) || (!elementWait.includes("active"))) {
                genericFunctions_abh.wait(1000)
                self.VideoLoader_WE_Wait()
            }
        })
    }

    VideoLoader_WE_CueAndCreate_Wait() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.CompareAttributeOfSingleElement(this.VideoLoader_WE, 0, "class").then(function (elementWait) {
            if ((elementWait.includes("inactive")) && (elementWait.includes("paused"))) {
                return "cue"
            } else if ((elementWait.includes("active")) && (elementWait.includes("playing"))) {
                return "button"
            }
        })
    }

    CreateNote_BTN_IsVisible() {
        const self = this
        this.VideoLoader_WE_Wait()
        return (this.VideoCueAndCreateNote_WE_GetAttributText().then((attributeValue) => {
            if (attributeValue == "hidden") {
                self.ContinueButtonForCue_BTN_IsVisible()
                self.CreateNote_BTN_IsVisible()
            } else if (attributeValue == "icon") {
                return true
            }
        }))
    }

    // CreateNote_BTN_IsVisible(){ //old
    //     const self = this
    //     const genericFunctions = new GenericFunctions();
    //     genericFunctions.wait(2000)
    //     return (genericFunctions.IsVisible(this.CreateNote_BTN).then((value) => {
    //         return (genericFunctions.IsFocusable(self.CreateNote_BTN).then(function(isDom){
    //             return (genericFunctions.IsHidden(self.CreateNote_BTN).then(function(isDetached){
    //                 if(value != false && isDom == false && isDetached == false){
    //                     return true
    //                 }else{
    //                     genericFunctions.wait(2000)
    //                     self.flag++;
    //                     if (self.flag == 6){
    //                         self.ContinueButtonForCue_BTN_IsVisible()
    //                     }
    //                     if (self.flag > 6){
    //                         return false
    //                     }else{
    //                         self.CreateNote_BTN_IsVisible();
    //                     }         
    //                 }
    //             }))
    //         }))
    //     }))
    // }

    CreateNote_BTN_IsDetached() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsDetached(this.CreateNote_BTN).then((value) => {
            if (value != true) {
                return true
            } else {
                genericFunctions_abh.wait(2000)
                self.flag++;
                if (self.flag > 5) {
                    return false
                } else {
                    cy.log("Flag :::: " + self.flag)
                    self.CreateNote_BTN_IsDetached();
                }
            }
        }))
    }

    CreateNote_BTN_Click() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh();
        this.CreateNote_BTN_IsVisible().then((check) => {
            if (check == true) {
                genericFunctions_abh.ClickForecefully(self.CreateNote_BTN)
            }
        })
    }

    DoNotShowMeAgain_TXT_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickOnElementUsingText(this.DoNotShowMeAgain_TXT);
    }

    DoNotShowMeAgain_TXT_IsVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.IsVisibleWithContains(this.DoNotShowMeAgain_TXT));
    }

}