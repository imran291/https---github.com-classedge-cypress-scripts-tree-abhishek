/// <reference types="cypress" />

import GenericFunctions from "../support/GenericFunctions"
import Assignment from "../support/Assignment"

export default class AssignmentComplete{

    AllCompletedTodayAssignment_WE = ".ng-star-inserted:nth-child(1) .completed h3"
    TodayCompletedAssignment_TXT = "//p[contains(text(),'completed today')]"

    AllCompletedTodayAssignment_WE_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.AllCompletedTodayAssignment_WE))
    }

    TodayCompletedAssignment_TXT_GetText(){
        let text = ""
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElementUsingXpath(this.TodayCompletedAssignment_TXT).then((txt) => {
            text = txt.replace(" assignments completed today", "")
            if(isNaN(parseInt(text)) != false){
                return 0
            }else{
                return parseInt(text)
            }
        }))
    }

    BackButton_WE_Click(){
        const genericFunctions = new GenericFunctions()
        const assignment = new Assignment()
        genericFunctions.ClickForecefully(assignment.BackButton_WE)
    }

}