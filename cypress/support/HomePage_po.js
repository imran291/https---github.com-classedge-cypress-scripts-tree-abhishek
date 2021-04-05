import GenericFunctions from "../support/GenericFunctions"
import GetApiFunctions from "../support/GetApiFunctions"

export default class HomePage{

    flag = 0;
    allElemets_WE = "h5.heading4.primary";
    Syllabus_WE = ".ng-star-inserted:nth-child(2) h5.heading4.primary" 
    Assignment_WE = ".ng-star-inserted:nth-child(3) h5.heading4.primary"

    SelectSingleElementFromAllElements(value){
        const self = this
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        genericFunctions.IsVisible(this.allElemets_WE).then(function(elementVisible){
            if(elementVisible == true){
                genericFunctions.ClickOnSingleElementFromAllElements(self.allElemets_WE, value);
            }
        })
    }

    Syllabus_WE_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.Syllabus_WE)
    }

    Assignment_WE_Click(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.ClickForecefully(this.Assignment_WE)
    }

    allElemets_WE_GetText(){
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.allElemets_WE))
    }

    Api_GetBookID_content_1_api_v1_library_GET(){
           const getApiFunctions = new GetApiFunctions();
           return (getApiFunctions.content_1_api_v1_library_GET().then((body) => {
            return (body.body.grades[0].subjects[0].books);
           }))
    }

}
