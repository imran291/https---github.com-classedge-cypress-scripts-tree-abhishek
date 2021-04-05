import GenericFunctions from "./GenericFunctions"

export default class IntroWithTQ{

    BeginReviseAndReviseAgain_BTN = "button.btn.btn-outline-primary:nth-child(1)";
    BackButton_BTN = "span.icon.icon-back"
    AllTq_WE = "div.info.body-bold-light.normal"
    ChapterName_TXT = "h2.heading1.text-truncate"
    
    HandleBeginReviseAndReviseAgain(){
        const generic = new GenericFunctions();
        generic.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((text) => {
            generic.ClickOnElementUsingText(text);
        })
    }

    BeginReviseAndReviseAgainTextVisible(){
        const generic = new GenericFunctions();
           return (generic.GetTextFromElement(this.BeginReviseAndReviseAgain_BTN).then((txt) => {
                if(txt.includes("Revise again") || txt.includes("Begin Revision")){
                    return true;
                }else{
                    return false;
                }
            }))
        }

    BackButton_BTN_Click(){
        const generic = new GenericFunctions();
        generic.Click(this.BackButton_BTN);
    }

    BeginReviseAndReviseAgain_BTN_IsVisible(){
        const generic = new GenericFunctions();
        return generic.IsVisible(this.BeginReviseAndReviseAgain_BTN)
    }

    CountOf_AllTq_WE(){
        const generic = new GenericFunctions();
        return (generic.CountOfAllElements(this.AllTq_WE))
    }

    AllTq_WE_GetText(){
        const generic = new GenericFunctions();
        return (generic.GetTextFromElement(this.AllTq_WE))
    }

    ChapterName_TXT_GetText(){
        const generic = new GenericFunctions();
        return (generic.GetTextFromElement(this.ChapterName_TXT))
    }

}