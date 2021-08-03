require 'rails_helper'

# DOCU:         test cases for students_controller
# Owner:        Adrian
# Run using:    rspec spec/controllers/students_controller_spec.rb
RSpec.describe StudentsController do
    describe "renders the index" do
        it "renders the :index view" do 
            get :index
            expect(response).to render_template :index
        end

        itt "renders "
    end

end