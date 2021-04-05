// import { reject, resolve } from "cypress/types/bluebird";

export default class genericfunctions_Abh {

    ClickWithCustomeTime(element, time) {
        cy.get(element, { timeout: `${time}` }).click();
    }

    ClickForecefullyWithTime(element, time) {
        cy.get(element, { timeout: `${time}` }).click({ force: true });
    }

    ClickOnFirstElement(elements) {
        cy.get(elements).first().click({force:true})
    }

    ClickOnElementUsingTextWithTime(text, time) {
        cy.contains(text, { timeout: `${time}` }).click({ force: true });
    }

    ClickOnElementUsingTextWithTimeWithoutForce(value, time) {
        cy.contains(value, { timeout: `${time}` }).click();
    }

    GetTextFromSpecificElement(element, value) {
        return (cy.get(element).eq(value).then(($ele) => {
            return $ele.text()
        }))
    }

    IsVisibleForSingleElementWithText(element, value, text) {
        return (cy.get(element).eq(value).contains(text).should("be.visible"))
    }

    IsVisibleForMultiElements(elements) {
        return (cy.get(elements, { multiple: true }).should("be.visible"))
    }

    GetSpecificElement(element, value) {
        return (cy.get(element).eq(value))
    }

    GetElementWithTimeout(element, time) {
        return (cy.get(element, { timeout: `${time}` }))
    }

    GetSpecificElementWithTimeout(element, value, time) {
        return (cy.get(element, { timeout: `${time}` }).eq(value))
    }

    AssertCurrentUrlWithText(text) {
        return (cy.url().should("include", `${text}`))
    }

    GetTextFromSpecificElementWithSlicing(element, value, x, y) {
        return (cy.get(element).eq(value).then(($ele) => {
            return $ele.text().slice(x, y)
        }))
    }

    IsVisibleWithTimeout(element, time) {
        return (cy.get(element, { timeout: `${time}` }).then(($el) => {
            return cy.wrap($el).should("be.visible")
        }))
    }

    ClickWithScollIntoView(element) {
        cy.get(element).scrollIntoView().wait(1000).click();
    }

    GetElementWithText(text) {
        return (cy.contains(text))
    }

    ElementIsVisible(element) {
            var x  = document.querySelector(element)
            cy.log(x)
            if (x !== null) {
                return true
            }
            else {
                return false
            }
    }

    CheckIfEleExists(ele) {
        return new Promise((resolve, reject) => {
            cy.get('body').find(ele).its('length').then(res => {
                if (res > 0) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        })
    }

    ShouldbeVisible(ele){
        cy.get(ele).should("be.visible")
    }

    GetFirstElement(element) {
        return (cy.get(element).first())
    }


    //from old genericFunction

    Click(element) {
        cy.get(element).click();
    }

    ClickForecefullyWithMultiple(element) {//{ multiple: true }
        cy.get(element).click({ multiple: true, force: true });
    }

    ClickForecefully(element) {//{ multiple: true }
        cy.get(element).click({ force: true });
    }

    ClickOnSingleElement(elements, value) {
        cy.get(elements).eq(value).scrollIntoView().wait(1000).click();
    }

    ClickOnSingleElementWithoutForce(elements, value) {
        cy.get(elements).eq(value).scrollIntoView().wait(1000).click();
    }

    ClickOnElementUsingText(value) {
        cy.contains(value).click({ force: true });
    }

    ReloadPage() {
        cy.reload()
    }

    ScrollToBottom() {
        cy.wait(3000)
        cy.scrollTo('bottom')
        cy.wait(3000)
    }

    ClickOnElementUsingTextWithoutForce(value) {
        cy.contains(value).click();
    }

    ClickOnSingleElementFromAllElements(elements, value) {
        cy.get(elements).each(($el, index, $list) => {
            if ($el.text().includes(value)) {
                $el.click();
            }
        })
    }

    GetTextFromElement(element) {
        return (cy.get(element).then(($ele) => {
            return $ele.text()
        }))
    }

    GetTextFromElementUsingXpath(element) {
        return (cy.xpath(element).then(($ele) => {
            return $ele.text()
        }))
    }

    GetTextFromAllElements(elements) {
        return (cy.get(elements).each(($el, index, $list) => {
            return $el.text();
        }))
    }

    Clear(element) {
        cy.get(element).clear()
    }

    CountOfAllElements(elements) {
        return (cy.get(elements).then((elements) => {
            return elements.length
        }))
    }

    FindIfElementExistsInDom(parent, child) {
        return (cy.get(parent).find(child).length)

    }

    ClearCookies() {
        cy.clearCookies()
    }

    ClearLocalStorage() {
        cy.clearLocalStorage()
    }

    ElementScrollIntoView(element, value, count) {
        if (count <= 15) {
            cy.get(element).eq(value).scrollIntoView({ duration: (count * 1000) })
        } else if (count > 15 && count <= 50) {
            cy.get(element).eq(value).scrollIntoView({ duration: ((count * 1000) + 5000) })
        } else {
            cy.get(element).eq(value).scrollIntoView({ duration: ((count * 1000) + 10000) })
        }
    }

    GetTextFromDefinedElement(element, value) {
        return (cy.get(element).eq(value).then((textOfDefinedElement) => {
            return textOfDefinedElement;
        }))
    }

    GetCurrentPageUrl() {
        this.wait(2000)
        return cy.url()
    }

    GetUrl(page) {
        cy.visit(page)
    }

    IsVisible(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isVisible($el)
        }))
    }

    IsElement(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isElement($el)
        }))
    }

    IsDom(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isDom($el)
        }))
    }

    IsFocusable(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isFocusable($el)
        }))
    }

    IsDetached(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isDetached($el)
        }))
    }

    IsHidden(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isHidden($el)
        }))
    }

    IsAttached(element) {
        return (cy.get(element).then(($el) => {
            return Cypress.dom.isAttached($el)
        }))
    }

    IsDisabled(element) {
        return (cy.get(element).then(($el) => {
            return ($el).prop('disabled')
        }))
    }

    IsVisibleWithContains(text) {
        return (cy.contains(text).then(($el) => {
            return Cypress.dom.isVisible($el)
        }))
    }

    IsVisibleForSingleElement(element, value) {
        return (cy.get(element).eq(value).then((el) => {
            return Cypress.dom.isVisible(el)
        }))
    }

    RandomValueFromCount(value) {
        return Math.floor((Math.random() * value) + 1);
    }

    Type(element, value) {
        cy.get(element).type(value);
    }

    CompareAttributeOfSingleElement(elements, value, attribute) {
        return (cy.get(elements).eq(value).invoke("attr", attribute))
    }

    RemoveAttributeFromSingleElement(element, attribute) {
        cy.get(element).invoke("removeAttr", attribute)
    }

    wait(time) {
        cy.wait(time)
    }

    UnRegisterServiceWorkerOfBrowser() {
        if (window.navigator && navigator.serviceWorker) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                registrations.forEach((registration) => {
                    registration.unregister()
                })
            })
        }
    }

    SelectDate(days) {
        let date = new Date();
        return (new Date(date.getTime() + (days * 24 * 60 * 60 * 1000)))
    }

    Select_YY_MM_DD_Format(value) {
        if (value == "today") {
            return (this.SelectDate(0)).toISOString().split('T')[0]
        } else if (value == "yesterday") {
            return (this.SelectDate(-1)).toISOString().split('T')[0]
        } else if (value == "future") {
            return (this.SelectDate(1)).toISOString().split('T')[0]
        } else {
            return (this.SelectDate(5)).toISOString().split('T')[0]
        }
    }

    GenerateDate(value) {
        let date = ""
        if (value == "today") {
            date = date + this.SelectDate(0)
            date = date.replace(" GMT+0530 (India Standard Time)", "")
            return (date)
        } else if (value == "yesterday") {
            date = date + this.SelectDate(-1)
            date = date.replace(" GMT+0530 (India Standard Time)", "")
            return (date)
        } else if (value == "future") {
            date = date + this.SelectDate(1)
            date = date.replace(" GMT+0530 (India Standard Time)", "")
            return (date)
        } else {
            date = date + this.SelectDate(5)
            date = date.replace(" GMT+0530 (India Standard Time)", "")
            return (date)
        }
    }

    MonthInNumeric(Month) {
        if (Month == "Jan" || Month == "January") {
            return "01"
        } else if (Month == "Feb" || Month == "February") {
            return "02"
        } else if (Month == "Mar" || Month == "March") {
            return "03"
        } else if (Month == "Apr" || Month == "April") {
            return "04"
        } else if (Month == "May" || Month == "May") {
            return "05"
        } else if (Month == "Jun" || Month == "June") {
            return "06"
        } else if (Month == "Jul" || Month == "July") {
            return "07"
        } else if (Month == "Aug" || Month == "August") {
            return "08"
        } else if (Month == "Sep" || Month == "September") {
            return "09"
        } else if (Month == "Oct" || Month == "October") {
            return "10"
        } else if (Month == "Nov" || Month == "November") {
            return "11"
        } else if (Month == "Dec" || Month == "December") {
            return "12"
        }
    }

    RejexToGetOnlyDigitFromString(value) {
        let count = value
        count = count.replace(/[^0-9]/g, "")
        count = count.replace(" ", "")
        return count
    }

    toLowerCase(String) {
        String = this.RemoveSpace(String)
        String = String.replace(" ", "")
        String = String.replace(/\s/g, '');
        return (String.toLowerCase())
    }

    RemoveSpace(String) {
        return (String.replace(/\s+/, ""))
    }

    ReplaceWord(String, OldValue, NewValue) {
        return (String.replace(OldValue, NewValue))
    }

    CompareTwoDate(date1, date2) {
        const dt1 = new Date(date1)
        const dt2 = new Date(date2)
        if (dt1 <= dt2) {
            return true
        } else if (dt1 > dt2) {
            return false
        }
    }

    CustomWaitAndClick(element, value) {
        const self = this
        this.IsVisible(element).then((val) => {
            if (val == true) {
                self.wait(3000)
                self.ClickOnSingleElementFromAllElements(element, value);
            } else {
                self.wait(3000)
                self.flag++;
                if (self.flag < 6) {
                    self.CustomWaitAndClick(element, value)
                }
            }
        })
    }

    GetIndexValueFromElementText(element, elementname) {
        return (cy.get(element).each(($el, index, $list) => {
            if ($el.text() == elementname) {
                return index
            }
        }))
    }

    GetElement(element) {
        return (cy.get(element))
    }

}
