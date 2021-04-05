/// <reference types="cypress" />

import ApiConfig from "../support/ApiConfig"

export default class GetApiFunctions{
 


    BookShelfIntroTQ_Json(){ // delete later .. will not do api call from fixture
      return  (cy.fixture("GetApi.json").then((data) => {  
            this.data = data;
            cy.server();
            cy.route({method:"GET", url:this.data.api_v1_BookShelfIntroTQ}).as("token")
            cy.wait(5000)
            cy.get('@token').its('response').then((res) => {
                return res;
            })
        }))
    }

    BookShelfIntroTQ_Json(){
        const apiConfig = new ApiConfig()
            cy.server();
            cy.route({method:"GET", url:apiConfig.activity_1_api_v1_bookshelf_GET()}).as("token")
            cy.wait(5000)
            return (cy.get('@token').its('response').then((res) => {
                return res;
            }))
    }

    activity_1_api_v1_bookshelf_GET(){
        const apiConfig = new ApiConfig()
        cy.server();
        cy.route({method:"GET", url:apiConfig.activity_1_api_v1_bookshelf_GET_Duplicate()}).as("token")
        cy.wait(5000)
        return (cy.get('@token').its('response').then((res) => {
            return res;
        }))
    }

    activity_1_api_v1_assignment_task_GET(){
        const apiConfig = new ApiConfig()
        cy.server();
        cy.intercept({method:"GET", url:apiConfig.activity_1_api_v1_assignment_task_GET()}).as('tok')
        cy.wait('@tok')
        return (cy.get('@tok').its("response").then((response) => {
            return response.body
        }))
    }

    activity_1_api_v1_notes_context_GET(visibility){
        const apiConfig = new ApiConfig()
        cy.server();
        cy.route({method:"GET", url:apiConfig.activity_1_api_v1_notes_context_GET()}).as("token")
        cy.wait(3000)
        visibility
        cy.wait("@token")
        return (cy.get("@token").its("response").then((response) => {
            return (response)
        }))
    }

    
}