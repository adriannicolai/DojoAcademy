class Student < ApplicationRecord
  	belongs_to :dojo
  	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :email, presence: true,  uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates :first_name, :last_name, presence: true

	# DOCU: finds the student with the corresponding student_id
    # Triggered by: dojos_controller > show, students_controller > show, students_controller > edit
	# Requires: student_id
    # Returns: returns selected records, false
    # Owner: Adrian
	def self.find_student_by_id(student_id)
		return 		ActiveRecord::Base.connection.select_one(
						ActiveRecord::Base.send(:sanitize_sql_array,
						["SELECT * FROM students 
							WHERE id = ?;",
							student_id]
						)
					)
	end

	# DOCU: creates a new student
    # Triggered by: students_controller > create
	# Requires: dojo_id, params["first_name"], params["last_name"], params["email"]
    # Returns: created record, false
    # Owner: Adrian
	def self.create_student(params, dojo_id)
		response        =   { :status => false, :result => {}, :error => nil }

		date_time_now = Time.now.utc.strftime("%Y-%m-%d %H:%M:%S")
		student_id	  = ActiveRecord::Base.connection.insert(
							ActiveRecord::Base.send(:sanitize_sql_array,
							["INSERT INTO students (first_name, last_name, email, dojo_id, created_at, updated_at)
								VALUES(?, ?, ?, ?, '#{date_time_now}', '#{date_time_now}');",
								params["first_name"], params["last_name"], params["email"], dojo_id]
							)
						)

		student = self.find_student_by_id(student_id)

		if(student.present?)
			response[:status] = true
			response[:result] = { student: student }
		else
			response[:error] = "Student not found"
		end
	
		return response
	rescue Exception => ex
		return { :status => false, :error => ex.message }
	end

	# DOCU: updates student with the corresponding student_id 
    # Triggered by: students_controller > update
	# Requires: student_id, dojo_id, params["first_name"], params["last_name"], params["email"]
    # Returns: updated record, false
    # Owner: Adrian
	def self.update_student(student_id, params, dojo_id)
		response = { :status => false, :result => {}, :error => nil }

		ActiveRecord::Base.connection.update(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["UPDATE students
				SET first_name = ?, last_name = ?, email = ?, dojo_id = ?
				WHERE id = ?;",
				params["first_name"], params["last_name"], params["email"], dojo_id, student_id]
			)
		)

		student = self.find_student_by_id(student_id)

		if(student.present?)
			response[:status] 	= true
			response[:result] 	= { student: student }
		else
			response[:error] 	= "Student not found"
		end

		return response
    rescue Exception => ex
		return { :status => false, :error => ex.message }
	end

	# DOCU: Deletes the student by id
    # Triggered by: students_controller > destroy
    # Requires: id
    # Owner: Adrian
    def self.delete_student_by_id(student_id)
		ActiveRecord::Base.connection.delete(
			ActiveRecord::Base.send(:sanitize_sql_array,
			  ["DELETE FROM students
				WHERE id = ?;",
				student_id]
			)
		)
    end

	def self.delete_students_by_dojo_id(dojo_id)

		ActiveRecord::Base.connection.delete(
            ActiveRecord::Base.send(:sanitize_sql_array,
              ["DELETE FROM students
                WHERE dojo_id = ?;",
                dojo_id]
            )
        )
	end
end
