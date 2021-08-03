require 'rails_helper'

feature "A user adds a new dojo" do
    before(:each) do
        visit "/dojos"
    end

    scenario "Successfulyl creates a new dojo" do

        click_button "Create a new Dojo"


        sleep 3

      

        # within('#dojoModal') do
        #     fill_in "dojo_branch", with: "branch"
        # end
        expect(current_path).to eq"/dojos"

    end


end