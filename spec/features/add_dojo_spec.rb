require 'rails_helper'

feature "A user adds a new dojo" do
    before(:each) do
        visit "/dojos"
    end

    scenario "Successfulyl creates a new dojo" do
        
        click_button "Create a new Dojo"


       wait_for_ajax
         
        fill_in "user_first_name", with: "shane"

    
    
    end


end