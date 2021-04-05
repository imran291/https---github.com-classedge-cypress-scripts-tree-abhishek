import GenericFunctions from "../support/GenericFunctions"

export default class BookShelf {

    flag = 0
    AllSubjects_WE = "h4.card-title";
    BookShelfTitle_TXT = ".heading2.primary"

    BookShelfTitle_TXT_GeText() {
        const genericFunctions = new GenericFunctions();
        return (genericFunctions.GetTextFromElement(this.BookShelfTitle_TXT))
    }

    SelectRandomBook() {
        let value = 0;
        const self = this;
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        genericFunctions.IsVisible(this.AllSubjects_WE).then((val) => {
            if (val == true) {
                genericFunctions.CountOfAllElements(this.AllSubjects_WE).then((count) => {
                    value = genericFunctions.RandomValueFromCount(count);
                    genericFunctions.ClickOnSingleElement(self.AllSubjects_WE, (value - 1))
                })
            } else {
                self.flag++;
                if (self.flag < 6) {
                    self.SelectRandomBook()
                }
            }
        })
    }

    AllSubjects_WE_GetCount() {
        const genericFunctions = new GenericFunctions();
        genericFunctions.wait(2000)
        return (genericFunctions.CountOfAllElements(this.AllSubjects_WE))
    }

}