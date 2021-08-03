require 'rails_helper'

RSpec.describe Student, type: :model do
    before do
        @dojo       = build(:dojo)
    end

    context "With valid credentials" do
        it "should save" do
            expect(build(:student, dojo: @dojo)).to be_valid
        end
    end

    context "With invalid credentials" do
        it "should not save with empty first_name" do
            expect(build(:student, dojo: @dojo, first_name: nil)).to be_invalid
        end

        it "should not save with empty last_name" do
            expect(build(:student, dojo: @dojo, last_name: nil)).to be_invalid
        end

        it "should not save with empty or invalid email" do
            expect(build(:student, dojo: @dojo, email: nil)).to be_invalid
            expect(build(:student, dojo: @dojo, email: "asdasdawsdas")).to be_invalid
        end

        it "should not save with empty dojo" do
            expect(build(:student)).to be_invalid
        end

    end
end