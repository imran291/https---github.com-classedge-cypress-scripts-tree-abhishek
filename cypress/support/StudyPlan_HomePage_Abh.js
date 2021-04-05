import GenericFunctions_Abh from "../support/GenericFunctions_Abh"
import StudyPlan_MyLesson_Abh from "../support/StudyPlan_myLesson_Abh"
import CreateStudyPlan from "../support/CreateStudyPlan"

export default class StudyPlan_HomePage_Abh {

    Homepage_Url = "https://afs-qa-learn.testedgeonline.com/menu"
    StudyPlan_BTN = "button.card.ng-star-inserted:nth-child(1) h5"
    StudyPlanContaingDate_TXT = "button.card.ng-star-inserted:nth-child(1) p.card-text"
    ResumePlan_TXT = " Resume Plan "
    StudyPlanTitle_TXT = "h2.heading1.text-truncate"
    StudyPlan_Syllabus_Assignment_Tab = ".card.ng-star-inserted"
    Syllabus_Tab_Text = "Syllabus"


    StudyPlanTitle_TXT_GeText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.wait(2000)
        return (genericFunctions_abh.GetTextFromElement(this.StudyPlanTitle_TXT))
    }

    ResumePlan_TXT_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.ClickOnElementUsingText(this.ResumePlan_TXT)
    }

    StudyPlan_BTN_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.Click(this.StudyPlan_BTN)
    }

    StudyPlanContaingDate_TXT_Click() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        genericFunctions_abh.Click(this.StudyPlanContaingDate_TXT)
    }

    StudyPlanContaingDate_TXT_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.StudyPlanContaingDate_TXT))
    }

    StudyPlan_BTN_Check_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.StudyPlan_BTN).then(PlanText => {
            if (PlanText.includes("Plan:")) {
                return true
            } else {
                return false
            }
        }))
    }

    StudyPlan_BTN_GetText() {
        const genericFunctions_abh = new GenericFunctions_Abh();
        return (genericFunctions_abh.GetTextFromElement(this.StudyPlan_BTN))
    }

    AllUserTypes() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh()
        return (this.StudyPlanContaingDate_TXT_GetText().then((CurrentText) => {
            genericFunctions_abh.wait(2000)
            if (CurrentText.includes("Completing on")) {
                return (self.CheckDateForStudyPlan().then((output) => {
                    if (output == true) {
                        return "Active Plan"
                    } else if (output == false) {
                        return "InActive Plan"
                    }
                }))
            } else if (CurrentText.includes("Paused on")) {
                return (self.CheckDateForStudyPlan().then((output) => {
                    if (output == true) {
                        return "Paused Activce Plan"
                    } else if (output == false) {
                        return "Paused InActive Plan"
                    }
                }))
            } else {
                return "New Plan"
            }
        }))
    }

    ReviewPlaCheck() {
        const genericFunctions_abh = new GenericFunctions_Abh()
        this.AllUserTypes().then((userType) => {
            if ((userType == "Active Plan")) {
                self.StudyPlan_BTN_Click()
                genericFunctions_abh.wait(2000)
            }
        })
    }

    HandlingNewuserAndExistingUser() {
        const self = this
        const genericFunctions_abh = new GenericFunctions_Abh()
        const studyPlan_MyLesson_abh = new StudyPlan_MyLesson_Abh()
        const createStudyPlan = new CreateStudyPlan()
        return (this.AllUserTypes().then((data) => {
            if ((data == "Active Plan") || (data == "InActive Plan") || (data == "Paused Activce Plan") || (data == "Paused InActivce Plan")) {
                return (self.StudyPlan_BTN_GetText().then((maintext) => {
                    self.StudyPlan_BTN_Click()
                    genericFunctions.wait(2000)
                    return (studyPlan_MyLesson.PageTitle_TXT_GetText().then((getValue) => {
                        if (maintext.includes(getValue)) {
                            return true
                        } else {
                            return false
                        }
                    }))
                }))
            } else if (data == "New Plan") {
                self.StudyPlan_BTN_Click()
                genericFunctions.wait(2000)
                return (createStudyPlan.CreatePlanTitle_TXT_GetText().then((getValue) => {
                    if (getValue.includes("Create Study Plan")) {
                        return true
                    } else {
                        return false
                    }
                }))
            }
        }))
    }

    CheckDateForStudyPlan() {
        let TodayDate = ""
        let TodayMonth = ""
        let CompareDate = ""
        let CompareMonth = ""
        const genericFunctions_abh = new GenericFunctions_Abh();
        TodayDate = genericFunctions_abh.GenerateDate("today")
        TodayDate = TodayDate.split(" ")
        TodayMonth = genericFunctions_abh.MonthInNumeric(TodayDate[1])
        TodayDate = TodayDate[3] + "-" + TodayMonth + "-" + TodayDate[2]
        return (this.StudyPlanContaingDate_TXT_GetText().then((cmpdate) => {
            CompareDate = cmpdate
            CompareDate = CompareDate.split(" ")
            CompareMonth = genericFunctions_abh.MonthInNumeric(CompareDate[3])
            CompareDate = CompareDate[4] + "-" + CompareMonth + "-" + CompareDate[2]
            return (genericFunctions_abh.CompareTwoDate(TodayDate, CompareDate))
        }))
    }

    BookNameCode(bookName) {
        if (bookName == "Geography") {
            return "GEOG"
        } else if (bookName == "Mathematics") {
            return "MATH"
        } else if (bookName == "PoliticalScience") {
            return "POLSC"
        } else if (bookName == "Science") {
            return "SCI"
        } else if (bookName == "EnglishReader") {
            return "ENG-RDR"
        } else if (bookName == "EnglishLiterature") {
            return "ENG-LIT"
        } else if (bookName == "EnvironmentalScience") {
            return "EVS"
        } else if (bookName == "Geography") {
            return "GEOG"
        } else if (bookName == "History") {
            return "HIST"
        }
    }

}