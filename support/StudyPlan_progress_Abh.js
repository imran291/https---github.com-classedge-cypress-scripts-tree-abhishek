import GenericFunctions_Abh from "./GenericFunctions_Abh"
import GetUrl from "./GetUrl"

export default class StudyPlan_Progress{

    Url = "https://afs-qa-learn.testedgeonline.com/study-plan/progress"
    Progress_Graph = ".graph .study-plan-progress-graph"
    Portion_Progress_Bar = "div.subj-card .progress"
    Modify_Pause_Text = ".create-cards .head h4"//0-Modify,1-Pause
    Modify_Text = "Modify"
    Pause_Text = "Pause"
    Deadline_Portion_Pause_Tab = ".create-cards .card"// 0-deadline,1-Portion,2-Pause
    DeadlineTab_Heading = "Deadline"
    PortionTab_Heading = "Portion"
    PauseTab_Heading = "Plan:"
    Graph_Dates = ".apexcharts-xaxis-texts-g tspan"
    Planned_vs_Required_vs_Actual_Flow_Box = ".apexcharts-active"
    Portion_Subjects = "div.subjectBlock"
    Plan_Detail_tab = "div.sub-footer"
    CurrentWeek_Info = ".footer-info h3"
    DailyStudyGoal_And_PlanEndDate_info = ".footer-info p"
    Studyplan_Subject_Science = ".subject-yellow-theme"
    Bookshelf_Political_Science = ".subject-purple-theme"
    Bookshelf_Geography = ".subject-blue-theme"
    Bookshelf_Mathematics = ".subject-pink-theme"
    Bookshelf_History = ".subject-orange-theme"
    Subject_Topics_Selected_Text = "p.small-text"
    Pause_Plan_Proceed_BtnText = "Proceed "
    Activate_Plan_Button =".card.asn-card"
}