import GenericFunctions_Abh from "../support/GenericFunctions_Abh"

export default class BookShelf_Abh {


    flag = 0
    AllSubjects_Tabs = ".card.cursor.subj-card"
    Status_Icon = "svg.icon"
    AllSubjects_WE = "h4.card-title"
    BookShelfTitle_TXT = ".heading2.primary"
    Bookshelf_Url = "https://afs-qa-learn.testedgeonline.com/browseBook/subjects/(comp:d)"
    CreateAssignSection = "div.create-cards.ng-star-inserted"
    Icon_Back = "span.icon-back"
    //Class
    NotStudiedStatusClass = "icon icon-notstudied ng-star-inserted"
    LowConfStatusClass = "icon icon-conf-low ng-star-inserted"
    MidConfStatusClass = "icon icon-conf-mid ng-star-inserted"
    HighConfStatusClass = "icon icon-conf-high ng-star-inserted"
    ExcludedfromSyllabusClass = "icon icon-iconexclude ng-star-inserted"
    CompletedInSchool_Class = "icon icon-completed-inschool ng-star-inserted"

    Icon_NotStudied = "svg.icon-notstudied"
    Icon_LowConf = "svg.icon-conf-low"
    Icon_MidConf = "svg.icon-conf-mid"
    Icon_HighConf = "svg.icon-conf-high"
    Icon_ExcludedfromSyllabus = "svg.icon-iconexclude"
    Icon_CompletedInSchool = "svg.icon-completed-inschool"


    CheckTypeOfStatusIconsVisible() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetFirstElement(this.Status_Icon).then(($e) => {
            cy.get($e).invoke('attr', "class").then(($el) => {
                cy.wait(2000)
                if ($el.includes(this.NotStudiedStatusClass)) {
                    cy.get(this.Icon_NotStudied).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
                if ($el.includes(this.AllTopic_LowConf_Class)) {
                    cy.get(this.Icon_LowConf).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
                if ($el.includes(this.AllTopic_MidConf_Class)) {
                    cy.get(this.Icon_MidConf).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
                if ($el.includes(this.AllTopic_HighConf_Class)) {
                    cy.get(this.Icon_HighConf).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
                if ($el.includes(this.AllTopic_CompInSchool_Class)) {
                    cy.get(this.Icon_CompletedInSchool).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
                if ($el.includes(this.AllTopic_ExcludeFromSyllabus_Class)) {
                    cy.get(this.Icon_ExcludedfromSyllabus).scrollIntoView().wait(1000).should("be.visible")
                    cy.wait(1000)
                }
            })
        })
    }

    SelectBookContainNotStudiedChapter() {
        const genericFunctions_abh = new GenericFunctions_Abh();

    }

    GetRandomBook() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.GetElement(bookshelf_abh.AllSubjects_Tabs).then(($ele) => {
            var L = $ele.length
            var N = genericFunctions_abh.RandomValueFromCount(`${L}`) - 1
            genericFunctions_abh.GetSpecificElement($ele, `${N}`).find(bookshelf_abh.Status_Icon).each(($el, index) => {
                cy.get($el).invoke('attr', "class").then(($el) => {
                    if ($el.includes(bookshelf_abh.NotStudiedStatusClass)) {
                        chapter_index.push(index)
                    }
                })
            })
        })
    }

    //old
    BookShelfTitle_TXT_GeText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.BookShelfTitle_TXT))
    }

    SelectRandomBook() {
        let value = 0
        var V = []
        const self = this;
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(2000)
        genericFunctions_abh.IsVisible(this.AllSubjects_WE).then((val) => {
            if (val == true) {
                genericFunctions_abh.CountOfAllElements(this.AllSubjects_WE).then((count) => {
                    value = genericFunctions_abh.RandomValueFromCount(count);
                    genericFunctions_abh.ClickOnSingleElement(self.AllSubjects_WE, (value - 1))
                    V.push(value - 1)
                    cy.wait(1000)
                })
            } else {
                self.flag++;
                if (self.flag < 6) {
                    self.SelectRandomBook()
                }
            }
        })
        return V
    }

    AllSubjects_WE_GetCount() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(2000)
        return (genericFunctions_abh.CountOfAllElements(this.AllSubjects_WE))
    }

}