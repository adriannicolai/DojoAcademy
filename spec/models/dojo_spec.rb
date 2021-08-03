require 'rails_helper'

RSpec.describe Dojo, type: :model do
    context "with valid credentials" do
        it "shoud save" do
            expect(build(:dojo)).to be_valid
        end
    end

    context "with invalid attributes" do
        it "should not save if branch is blank" do
            expect(build(:dojo, branch: nil)).to be_invalid
        end

        it "should not save if street is blank" do
            expect(build(:dojo, street: nil)).to be_invalid
        end

        it "should not save if city is blank" do
            expect(build(:dojo, city: nil)).to be_invalid
        end

        it "should not save if state is blank" do
            expect(build(:dojo, state: nil)).to be_invalid
        end
    end

    
end