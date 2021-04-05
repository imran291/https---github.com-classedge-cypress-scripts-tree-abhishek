import GenericFunctions from "../support/GenericFunctions"

export default class Revision{

    flag = 0
    CreateNote_BTN = "span.icon.icon-add-note-white"
    DoNotShowMeAgain_TXT = "DO NOT SHOW ME AGAIN"
    VideoSection_WE = "div.video-section"
    ContinueButtonForCue_BTN = ".caption-btn-sec button.btn.btn-sm"
    ContinueButtonVisibility_WE = "button.vjs-play-control.vjs-control.vjs-button"
    Back_BTN = "span.icon.icon-back"
    SureWantToGoAway_Yes_BTN = " Yes "
    VideoCueAndCreateNote_WE = "div.vjs-notes-btn.ng-star-inserted"
    VideoLoader_WE = "div.video-js.vjs-big-play-centered"

    ContinueButtonForCue_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.ContinueButtonForCue_BTN)
    }

    VideoCueAndCreateNote_WE_IsVisible(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsVisible(this.VideoCueAndCreateNote_WE))
    }

    VideoCueAndCreateNote_WE_GetAttributText(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(3000)
        return (genericFunctions.CompareAttributeOfSingleElement(this.VideoCueAndCreateNote_WE, 0, "class").then(function(attributeValue){
            if(attributeValue.includes("hidden")){
                return "hidden"
            }else{
                return "icon"
            }
        }))
    }

    ContinueButtonForCue_BTN_IsVisible(){
        const self = this
        const genericFunctions = new GenericFunctions();
        genericFunctions.IsVisible(this.ContinueButtonForCue_BTN).then((check) => {
            if(check == true){
                genericFunctions.ElementScrollIntoView(self.ContinueButtonForCue_BTN, 0, 1)
                self.ContinueButtonForCue_BTN_Click()
            }
        })
    }

    SureWantToGoAway_Yes_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickOnElementUsingText(this.SureWantToGoAway_Yes_BTN)
    }
    
    Back_BTN_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Click(this.Back_BTN)
    }

    VideoLoader_WE_Wait(){
        const self = this
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(3000)
        genericFunctions.CompareAttributeOfSingleElement(this.VideoLoader_WE, 0, "class").then(function(elementWait){
            if((!elementWait.includes("inactive")) || (!elementWait.includes("active"))){
                genericFunctions.wait(1000)
                self.VideoLoader_WE_Wait()
            }
        })
    }

    VideoLoader_WE_CueAndCreate_Wait(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.CompareAttributeOfSingleElement(this.VideoLoader_WE, 0, "class").then(function(elementWait){
            if((elementWait.includes("inactive")) && (elementWait.includes("paused"))){
                return "cue"
            }else if((elementWait.includes("active")) && (elementWait.includes("playing"))){
                return "button"
            }
        })
    }

    CreateNote_BTN_IsVisible(){
        const self = this
        this.VideoLoader_WE_Wait()
        return (this.VideoCueAndCreateNote_WE_GetAttributText().then((attributeValue) => {
            if(attributeValue == "hidden"){
                self.ContinueButtonForCue_BTN_IsVisible()
                self.CreateNote_BTN_IsVisible()
            }else if(attributeValue == "icon"){
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
    
    CreateNote_BTN_IsDetached(){
        const self = this
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsDetached(this.CreateNote_BTN).then((value) => {
            if(value != true){
                return true
            }else{
                genericFunctions.wait(2000)
                self.flag++;
                if (self.flag > 5){
                    return false
                }else{
                    cy.log("Flag :::: "+self.flag)
                    self.CreateNote_BTN_IsDetached();
                }         
            }
        }))
    }

    CreateNote_BTN_Click(){
        const self = this
        const genericFunctions = new GenericFunctions();
        this.CreateNote_BTN_IsVisible().then((check) => {
            if(check == true){
                genericFunctions.ClickForecefully(self.CreateNote_BTN)
            }
        })   
    }

    DoNotShowMeAgain_TXT_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickOnElementUsingText(this.DoNotShowMeAgain_TXT);
    }

    DoNotShowMeAgain_TXT_IsVisible(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.IsVisibleWithContains(this.DoNotShowMeAgain_TXT));
    }

}