/// <reference types="cypress" />

import Config from "./Config"

export default class GetUrl{

    Qa = "https://afs-qa-learn.testedgeonline.com/"
    Dev = "https://afs-dev.testedgeonline.com/app/"
    PreDev = "http://13.235.224.60/app/"
    LiveEnv = "https://beta.tatastudi.com/"

    
    GetUrlForAutomation(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"authentication/sign-in/(step:enter-username/child)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"authentication/sign-in/(step:enter-username/child)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"authentication/sign-in/(step:enter-username/child)"
        }else{
            return this.PreDev+"authentication/sign-in/(step:enter-username/child)"
        }
    }
    
    GetUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa
        }else if (conf.envirounment === "dev"){
            return this.Dev
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv
        }else{
            return this.PreDev
        }
    }    

    GetAssignmentCompletedLink(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"assignment/task-completed/(comp:d)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"assignment/task-completed/(comp:d)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"assignment/task-completed/(comp:d)"
        }else{
            return this.PreDev+"assignment/task-completed/(comp:d)"
        }
    }

    GetChaptersPageUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"browseBook/chapters/(comp:d)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"browseBook/chapters/(comp:d)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"browseBook/chapters/(comp:d)"
        }else{
            return this.PreDev+"browseBook/chapters/(comp:d)"
        }
    }

    GetBookShelfPageUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"browseBook/subjects/(comp:d)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"browseBook/subjects/(comp:d)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"browseBook/subjects/(comp:d)"
        }else{
            return this.PreDev+"browseBook/subjects/(comp:d)"
        }
    }

    GetIntroPageUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"lesson/player?player=revise&module=browseBook"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"lesson/player?player=revise&module=browseBook"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"lesson/player?player=revise&module=browseBook"
        }else{
            return this.PreDev+"lesson/player?player=revise&module=browseBook"
        }
    }

    GetPracticeIntroPageUrl(){
        const conf = new Config();
        if(conf.envirounment === "qa"){
            return this.Qa+"lesson/player?player=practice&module=browseBook"
        }else if(conf.envirounment === "dev"){
            return this.Dev+"lesson/player?player=practice&module=browseBook"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"lesson/player?player=practice&module=browseBook"
        }else{
            return this.PreDev+"lesson/player?player=practice&module=browseBook"
        }
    }
    
    GetAssignmentListUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"assignment/list/(comp:d)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"assignment/list/(comp:d)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"assignment/list/(comp:d)"
        }else{
            return this.PreDev+"assignment/list/(comp:d)"
        }
    }

    StudyPlanUrl(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"study-plan/my-lesson"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"study-plan/my-lesson"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"study-plan/my-lesson"
        }else{
            return this.PreDev+"study-plan/my-lesson"
        }
    }
    
    CreateStudyPlan(){
        const conf = new Config();
        if (conf.envirounment === "qa"){
            return this.Qa+"study-plan/create/(comp:1)"
        }else if (conf.envirounment === "dev"){
            return this.Dev+"study-plan/create/(comp:1)"
        }else if(conf.envirounment === "LiveEnv"){
            return this.LiveEnv+"study-plan/create/(comp:1)"
        }else{
            return this.PreDev+"study-plan/create/(comp:1)"
        }
    }

}
