require 'rails_helper'

# DOCU:         test cases for dojos_controller
# Owner:        Adrian
# Run using:    rspec spec/controllers/dojos_controller_spec.rb
RSpec.describe DojosController do
    before do
        @dojo = create(:dojo)
        @dojos_params = {
            branch: "branch",
            street: "street",
            city: "city",
            state: "state"
        }
    end

    describe "renders the index" do
        # GREEN  TEST CASE
        it "renders the :index view" do 
            get :index

            #expects the response to render the index page of dojos
            expect(response).to render_template :index
        end
    end

    describe "updating a dojo" do
        # RED TEST CASE
        it "Should not update the dojo" do
            post :edit, params: { id: "ASDAS" }

            json = JSON.parse(response.body)
            
            #expects the status to be false
            expect(json["status"]).to be_falsey    
        end

        # GREEN TEST CASE
        it "Should render the tempplate for updating a dojo and returna a status of true" do
            post :edit, params: { id: @dojo.id }

            json = JSON.parse(response.body)
            
            #expects the status to be true
            expect(json["status"]).to be_truthy

            # expects the template for doho modal to be loaded
            expect(response).to render_template(partial: "dojos/templates/_dojo_modal") 
        end

        # GREEN TEST CASE
        it "Should update the dojo" do
            post :update, params: { id: @dojo.id, dojo: @dojos_params }

            json = JSON.parse(response.body)

            # expects the status to be true
            expect(json["status"]).to be_truthy

            # expects he parial to be loaded
            expect(response).to render_template(partial: "dojos/templates/_dojo_row") 
        end
    end

    describe "showing a dojo" do
        # RED TEST CASE
        it "Should not load if the dojo is not found" do
            post :show, params: { id: 12312312312312312 }
            
            json = JSON.parse(response.body)

            #expects the page to render a json with status of false 
            expect(json["status"]).to be_falsey    

            # expects the error message for dojo no found
            expect(json["error_message"]).to eq"Dojo not found"  
        end

        # GREEN TEST CASE
        it "Should redirect the page if the dojo is valid" do
            post :show, params: { id: @dojo.id }
            
            #expects the http status to be 200 ok
            expect(response).to have_http_status(200)
        end
    end
end