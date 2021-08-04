require 'rails_helper'

# DOCU:         test cases for dojo model
# Owner:        Adrian
# Run using:    rspec spec/models/dojo_spec.rb
RSpec.describe Dojo, type: :model do
    context "with valid credentials" do
        it "shoud save" do

            # expects the record to save with valid credentials 
            expect(build(:dojo)).to be_valid
        end
    end

    context "with invalid attributes" do
        it "should not save if branch is blank" do

            # expects the record to not save
            expect(build(:dojo, branch: nil)).to be_invalid
        end

        it "should not save if street is blank" do

            # expects the record to not save
            expect(build(:dojo, street: nil)).to be_invalid
        end

        it "should not save if city is blank" do

            # expects the record to not save
            expect(build(:dojo, city: nil)).to be_invalid
        end

        it "should not save if state is blank" do

            # expects the record to not save
            expect(build(:dojo, state: nil)).to be_invalid
        end
    end
end