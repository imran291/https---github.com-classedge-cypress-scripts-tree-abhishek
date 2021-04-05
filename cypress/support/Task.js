import GenericFunctions from "../support/GenericFunctions"

export default class Task{

   AttachmentIcon_WE = "button.btn.btn-icon.btn-file" 

   AttachmentIcon_WE_IsDisplayed(){
    const genericFunctions = new GenericFunctions();
    return (genericFunctions.IsVisible(this.AttachmentIcon_WE))
   }

}