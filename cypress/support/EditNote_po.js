import GenericFunctions from "../support/GenericFunctions" 

export default class EditNote{

    Editor_TXT = "div.ql-container.ql-bubble div.ql-editor"

    Editor_TXT_Clear(){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Clear(this.Editor_TXT)
    }

    Editor_TXT_Type(value){
        const genericFunctions = new GenericFunctions();
        genericFunctions.Type(this.Editor_TXT, value)
    }

}