class Dojo < ApplicationRecord
    has_many :students
    validates :branch, :street, :city, :state, presence: true

    # DOCU: Gets all records in the dojos table 
    # Triggered by: dojos_controller > index, students_controller > edit, students_controller > new
    # Returns: All records from dojos table, false
    # Owner: Adrian
    def self.all_dojos
        return ActiveRecord::Base.connection.exec_query(
                    "SELECT * FROM dojos"
                )
	rescue Exception
		  return  false
    end

    # DOCU: Create a new Dojo
    # Triggered by: dojos_controller > create
    # Requires: branch, street, city, state
    # Returns: created dojo, false
    # Owner: Adrian
    def self.create_new_dojo params
        date_time_now = Time.now.utc.strftime("%Y-%m-%d %H:%M:%S")
        ActiveRecord::Base.connection.execute(
            ActiveRecord::Base.send(:sanitize_sql_array, 
                ["INSERT INTO dojos (branch, street, city, state, created_at, updated_at) 
                VALUES (?, ?, ?, ?,'#{date_time_now}', '#{date_time_now}');", 
                params["branch"], params["street"], params["city"], params["state"]]
            )
        )
        return { :status => true }
	  rescue Exception
		  return  false

    end

    # DOCU: Finds the dojo with the corresponding dojo id
    # Triggered by:  dojos_controller > show, dojos_controller > edit, dojos_controller > update, dojos_controller > destroy
    # Requires: dojo_id
    # Returns: selected record, false
    # Owner: Adrian
    def self.find_dojo_by_id(dojo_id)
        ActiveRecord::Base.connection.select_one(
            ActiveRecord::Base.send(:sanitize_sql_array,
                ["SELECT * FROM dojos
                WHERE ID = ?;",
                dojo_id]
            )
        )

    rescue Exception
		  return  false
    end

    # DOCU: Finds the students with the corresponding dojo_id
    # Triggered by:  dojos_controller > show
    # Requires: dojo_id
    # Returns: selected records, false
    # Owner: Adrian
    def self.find_students_by_dojo_id(dojo_id)
        ActiveRecord::Base.connection.execute(
            ActiveRecord::Base.send(:sanitize_sql_array,
                ["SELECT * FROM students 
                WHERE dojo_id = ?;",
                dojo_id]
              )
        )
    rescue Exception
		  return  false
    end

    # DOCU: Finds the dojo with the corresponding dojo id
    # Triggered by:  dojos_controller > show, dojos_controller > edit, dojos_controller > update, dojos_controller > destroy
    # Requires: dojo_id
    # Owner: Adrian
	def self.delete_dojo_by_id(dojo_id)
		ActiveRecord::Base.connection.delete(
			ActiveRecord::Base.send(:sanitize_sql_array,
                ["DELETE FROM dojos
                WHERE id = ?;",
                dojo_id])
        )

	rescue Exception
		return  false
	end

    # DOCU: Updates the record for the selected dojo
    # Triggered by:  dojos_controller > update
    # Requires: dojo_id
    # Owner: Adrian
	def self.update_dojo(dojo_id, params)
		ActiveRecord::Base.connection.update(
            ActiveRecord::Base.send(:sanitize_sql_array,
                ["UPDATE dojos
                SET branch = ?, street = ?, city = ?, state = ?
                WHERE id = ?;",
                params["branch"], params["street"], params["city"], params["state"], dojo_id]
            )
		)
	end
end
