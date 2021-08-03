require 'rails_helper'

# DOCU:         test cases for dojos_controller
# Owner:        Adrian
# Run using:    rspec spec/controllers/dojos_controller_spec.rb
RSpec.describe DojosController do
    describe "renders the index" do
        # GREEN  TEST CASE
        it "renders the :index view" do 
            get :index

            #expects the response to render the index page of dojos
            expect(response).to render_template :index
        end
    end

    describe "updating a dojo" do
        # GREEN TEST CASE
        it "renders the tempplate for updating a dojo" do
            dojo = create(:dojo)
            post :edit, params: { id: dojo.id }

            json = JSON.parse(response.body)
            
            #expects the status to be true
            expect(json["status"]).to be_truthy
        end

        # GREEN TEST CASE
        it "updates the dojo successfully" do
            dojos_params = {
                branch: "branch",
                street: "street",
                city: "city",
                state: "state"
            }
            dojo = create(:dojo)
            post :update, params: { id: dojo.id, dojo: dojos_params }

            json = JSON.parse(response.body)

            #expects the status to be true
            expect(json["status"]).to be_truthy
        end

        # RED TEST CASE
        it "updates the dojo unsuccessfully" do
            dojo = create(:dojo)
            post :edit, params: { id: "ASDAS" }

            json = JSON.parse(response.body)
            
            #expects the status to be false
            expect(json["status"]).to_not be_truthy
        end
    end

    describe "showing a dojo" do
        # GREEN TEST CASE
        it "redirects the page if the dojo is valid" do
            dojo = create(:dojo)
            post :show, params: { id: dojo.id }
            
            #expects the http status to be 200 ok
            expect(response).to have_http_status(200)
        end

        # RED TEST CASE
        it "will not load if the dojo is not found" do
            post :show, params: { id: 12312312312312312 }
            
            json = JSON.parse(response.body)

            #expects the http status to be 200 ok
            expect(json["status"]).to_not be_truthy
        end
    end
end