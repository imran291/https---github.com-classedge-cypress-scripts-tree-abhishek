import GenericFunctions from "../support/GenericFunctions"

export default class Assignment_IntroTQ{

    delay = 0
    Video_WE = "video .vjs-tech"
    Close_BTN = "#Oval"
    AllTQ_TXT = ".flex-grow-1"
    AllTQVideo_WE = ".icon.icon-w-video"
    VideoTotalTime_WE = ".total-time"

    AllTQ_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.AllTQ_TXT))
    }

    AllTQVideo_WE_Click(){
        const self= this
        const genericFunctions = new GenericFunctions()
        genericFunctions.CountOfAllElements(this.AllTQVideo_WE).then((count) => {
            if(count>1){
                genericFunctions.ClickOnSingleElement(self.AllTQVideo_WE, 0)
            }else{
                genericFunctions.ClickForecefully(self.AllTQVideo_WE)
            }
        })
    }

    VideoTotalTime_WE_GetText(){
        const self = this
        const genericFunctions = new GenericFunctions()
        return (this.VideoTotalTime_WE_IsVisible().then((visibility) => {
            if(visibility == true){
                return (genericFunctions.GetTextFromElement(self.VideoTotalTime_WE).then((duration) => {
                    if(duration == "00.00"){
                        self.VideoTotalTime_WE_GetText()
                    }else{
                        return true
                    }
                }))
            }else{
                genericFunctions.wait(2000)
                self.delay++
                if(self.delay <= 6){
                    self.VideoTotalTime_WE_GetText()
                }
            }
        }))
    }

    VideoTotalTime_WE_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.VideoTotalTime_WE))
    }

    Close_BTN_GetCount(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.CountOfAllElements(this.Close_BTN))
    }

    Video_WE_IsVisible(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.IsVisible(this.Video_WE))
    }


} 