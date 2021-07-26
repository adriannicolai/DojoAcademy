class Student < ApplicationRecord
  	belongs_to :dojo
  	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :email, presence: true,  uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates :first_name, :last_name, presence: true

	# returns the the student with id equal to the given id 
	def self.find_student_by_id(student_id)
		ActiveRecord::Base.connection.select_one(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["SELECT * FROM students 
				WHERE id = ?;",
				student_id]
			)
		)
	end

	# creates a new studennt
	def self.create_student(params, dojo_id)
		date_time_now = Time.now.utc.strftime("%Y-%m-%d %H:%M:%S")
		ActiveRecord::Base.connection.insert(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["INSERT INTO students (first_name, last_name, email, dojo_id, created_at, updated_at)
				VALUES(?, ?, ?, ?, '#{date_time_now}', '#{date_time_now}');",
				params["first_name"], params["last_name"], params["email"], dojo_id]
			)
		)
	end

	# updates the selected student with the given parameters
	def self.update_student(student_id, params, dojo_id)
		ActiveRecord::Base.connection.update(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["UPDATE students
				SET first_name = ?, last_name = ?, email = ?, dojo_id = ?
				WHERE id = ?;",
				params["first_name"], params["last_name"], params["email"], dojo_id, student_id]
			)
		)
		# dojo = Dojo.find_dojo_by_id(dojo_id)
		# Student.find(student_id).update(student_params)
		# Student.find(student_id).update(dojo: dojo)
	end
end
