require 'rails_helper'

# DOCU:         test cases for students_controller
# Owner:        Adrian
# Run using:    rspec spec/controllers/students_controller_spec.rb
RSpec.describe StudentsController do
    before do
        @dojo           = create(:dojo)
        @student        = create(:student, dojo: @dojo)
        @student_params = { 
            first_name:     "fname test",
            last_name:      "lname test",
            email:          "test@example.com"
        }
    end

    describe "showing a student" do
        # GREEN TEST VASE
        it "will show the selected student along with his cohorts" do
            post :show, params: { id: @student.id }
            
            #expects the http status to be 200 ok
            expect(response).to have_http_status(200)
        end

        # RED TEST CASE
        it "will not load if the student is not found" do
            post :show, params: { id: 312312123 }

            json = JSON.parse(response.body)

            #expects the page to render a json with status of false 
            expect(json["status"]).to_not be_truthy
        end
    end

    describe "updating a student" do
        # GREEN TEST CASE   
        it "renders the tempplate for updating a dojo adn returna a status of true" do
            post :edit, params: { id: @student.id }

            json = JSON.parse(response.body)
            
            #expects the status to be true
            expect(json["status"]).to be_truthy
        end

        # GREEN TEST CASE
        it "updates the student successfully" do

            post :update, params: { id: @student.id, student: @student_params, student: {dojo: @student.dojo.id} }

            json = JSON.parse(response.body)

            #expects the status to be true
            expect(json["status"]).to be_truthy
        end

        # RED TEST CASE
        it "updates the student unsuccessfully" do

            post :update, params: { id: "asdasddas", student: "asasdas", student: {dojo: 1201041520153} }

            json = JSON.parse(response.body)

            #expects the status to be false
            expect(json["status"]).to_not be_truthy
        end
    end



end