class Student < ApplicationRecord
  	belongs_to :dojo
  	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :email, presence: true,  uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates :first_name, :last_name, presence: true

	# returns the the student with id equal to the given id 
	def self.find_student_by_id(id)
		return Student.find(id)
	end

	# creates a new studennt
	def self.create_student(student_params, dojo_id)
		student 	   = Student.new(student_params)
		student.dojo   = Dojo.find_dojo_by_id(dojo_id) 
		student.save
	end

	# updates the selected student with the given parameters
	def self.update_student(student_id, student_params, dojo_id)
		dojo = Dojo.find_dojo_by_id(dojo_id)
		Student.find(student_id).update(student_params)
		Student.find(student_id).update(dojo: dojo)
	end
end
