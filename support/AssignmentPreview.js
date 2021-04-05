import GenericFunctions from "../support/GenericFunctions"

export default class AssignmentPreview{

    Title_TXT = ".d-flex.justify-content-start.align-items-center span"
    TestType = ".form-group:nth-child(1) p"
    DifficultyLevel_TXT = ".form-group:nth-child(2) p"
    Duration_TXT = ".form-group:nth-child(3) p"
    DueDate_TXT = ".form-group:nth-child(4) p"

    DifficultyLevel_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.DifficultyLevel_TXT))
    }

    CompareValues(value1, value2){
        const genericFunctions = new GenericFunctions()
        value1 = genericFunctions.toLowerCase(value1)
        value2 = genericFunctions.toLowerCase(value2)
        if(value2.includes(value1)){
            return true
        }else{
            return false
        }
    }

    Duration_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.Duration_TXT))
    }

    Title_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.Title_TXT))
    }

    CompareDate(){
        let generatedDate = this.ConvertDateFormatForCompare()
        return (this.DueDate_TXT_GetText().then((date) => {
            if(generatedDate == date){
                return true;
            }else{
                return false
            }
        }))
    }

    DueDate_TXT_GetText(){
        const genericFunctions = new GenericFunctions()
        return (genericFunctions.GetTextFromElement(this.DueDate_TXT))
    }

    ConvertDateFormatForCompare(){
        let Date;
        const genericFunctions = new GenericFunctions()
        Date = genericFunctions.Select_YY_MM_DD_Format()
        Date = Date.split("-")
        return (Date[2]+"/"+Date[1]+"/"+Date[0])  
    }

}