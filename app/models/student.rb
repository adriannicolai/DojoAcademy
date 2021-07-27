class Student < ApplicationRecord
  	belongs_to :dojo
  	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :email, presence: true,  uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates :first_name, :last_name, presence: true

    # DOCU: Finds the student with the corresponding student_id
    # Triggered by:  dojos_controller > show, student_controller > show, student_controller > edit
    # Requires: student_id
    # Returns: selected record, false
    # Owner: Adrian
	def self.find_student_by_id(student_id)
		ActiveRecord::Base.connection.select_one(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["SELECT * FROM students 
				WHERE id = ?;",
				student_id]
			)
		)
		
	rescue Exception
		return  false
	end

    # DOCU: Finds the student with the corresponding dojo_id
    # Triggered by: student_controller > create
    # Requires: dojo_id, params["first_name"], params["last_name"], params["email"]
    # Returns: created record, false
    # Owner: Adrian
	def self.create_student(params, dojo_id)
		date_time_now = Time.now.utc.strftime("%Y-%m-%d %H:%M:%S")
		ActiveRecord::Base.connection.insert(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["INSERT INTO students (first_name, last_name, email, dojo_id, created_at, updated_at)
				VALUES(?, ?, ?, ?, '#{date_time_now}', '#{date_time_now}');",
				params["first_name"], params["last_name"], params["email"], dojo_id]
			)
		)

	rescue Exception
		return  false
	end

    # DOCU: updsates student with the corresponding student_id
    # Triggered by: student_controller > create
    # Requires: student_id, dojo_id, params["first_name"], params["last_name"], params["email"]
    # Returns: created record, false
    # Owner: Adrian
	def self.update_student(student_id, params, dojo_id)
		ActiveRecord::Base.connection.update(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["UPDATE students
				SET first_name = ?, last_name = ?, email = ?, dojo_id = ?
				WHERE id = ?;",
				params["first_name"], params["last_name"], params["email"], dojo_id, student_id]
			)
		)
	end
end