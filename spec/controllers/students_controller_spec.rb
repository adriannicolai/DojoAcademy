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
        # RED TEST CASE
        it "Should not load if the student is not found" do
            post :show, params: { id: 312312123 }

            json = JSON.parse(response.body)

            #expects the page to render a json with status of false 
            expect(json["status"]).to be_falsey    
        end

        # GREEN TEST CASE
        it "Should show the selected student along with his cohorts" do
            post :show, params: { id: @student.id }
            
            #expects the http status to be 200 ok
            expect(response).to have_http_status(200)
            
            # expects the show template to be rendered
            expect(response).to render_template :show
        end
    end

    describe "updating a student" do
        # RED TEST CASE
        it "Should not update the student" do

            post :update, params: { id: "asdasddas", student: "asasdas", student: { dojo: 1201041520153} }

            json = JSON.parse(response.body)

            #expects the status to be false
            expect(json["status"]).to be_falsey    
        end

        # GREEN TEST CASE   
        it "Should render the tempplate for updating a dojo adn returna a status of true" do
            post :edit, params: { id: @student.id }

            json = JSON.parse(response.body)
            
            #expects the status to be true
            expect(json["status"]).to be_truthy

            # expects the template for student row to be rendered
            expect(response).to render_template(partial: "students/templates/_student_modal") 
        end

        # GREEN TEST CASE
        it "Should update the student successfully" do

            post :update, params: { id: @student.id, student: @student_params, student: {dojo: @student.dojo.id} }

            json = JSON.parse(response.body)

            #expects the status to be true
            expect(json["status"]).to be_truthy

            # expects the template for student modal to be rendered
            expect(response).to render_template(partial: "students/templates/_student_row") 
        end
    end
end