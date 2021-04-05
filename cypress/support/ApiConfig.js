/// <reference types="cypress" />

import Config from "../support/Config"
import GetUrl from "./GetUrl"

export default class ApiConfig {

    Url(){
        const apiUrl = new GetUrl();
        const config = new Config();
        if(config.envirounment === "qa"){
            return apiUrl.Qa
        }else if (config.envirounment === "dev"){
            return apiUrl.Dev.replace("/app/", "/") 
        }else{
            return apiUrl.PreDev.replace("/app/", "/") 
        }
    }

    activity_1_api_v1_bookshelf_GET(){ // working
        return  "https://afs-qa.myclassedge.in/activity/1/api/v1/bookshelf/book-00000000-0000-0000-0000-000000001111/revise/bsle-a9b1e1e3-e39c-4a44-ac12-dcdfeead6c2b"
    }

    activity_1_api_v1_bookshelf_GET_Duplicate(BookId, LessonId){
        return  (this.Url()+"/activity/1/api/v1/bookshelf/+"+BookId+"+/revise/"+LessonId);
    }

    content_1_api_v1_library_WithBookId_GET(BookId){
        return (this.Url()+"/content/1/api/v1/library/"+BookId);
    }

    activity_1_api_v1_assignment_task_GET(){
        const config = new Config();
        const apiUrl = new GetUrl();
        if(config.envirounment == "qa"){
            return apiUrl.Qa+"activity/1/api/v1/assignment/task*"
        }else if(config.envirounment == "dev"){
            return "**activity/1/api/v1/assignment/*"
        }else{
            return "**activity/1/api/v1/assignment/*"
        }
    }

    activity_1_api_v1_notes_context_GET(){
        const config = new Config();
        if(config.envirounment == "qa"){
            return "activity/1/api/v1/notes/*"
        }else if(config.envirounment === "dev"){
            return "**activity/1/api/v1/notes/*";
        }else{
            return "**activity/1/api/v1/notes/*"
        }
    }
    
}