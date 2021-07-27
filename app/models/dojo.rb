class Dojo < ApplicationRecord
    has_many :students
    validates :branch, :street, :city, :state, presence: true

    # Select all records from dojos table
    # to return all records in dojos table
    def self.all_dojos
        return ActiveRecord::Base.connection.exec_query(
                                "SELECT * FROM dojos"
                                )
    end

    # Create a new Dojo
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
    end

    # returns the the dojo with id equal to the given id 
    def self.find_dojo_by_id(dojo_id)
        ActiveRecord::Base.connection.select_one(
            ActiveRecord::Base.send(:sanitize_sql_array,
                ["SELECT * FROM dojos
                WHERE ID = ?;",
                dojo_id])
        )
    rescue Exception
		return  false
    end

    def self.find_students_by_dojo_id(dojo_id)
        ActiveRecord::Base.connection.execute(
            ActiveRecord::Base.send(:sanitize_sql_array,
                ["SELECT * FROM students 
                WHERE dojo_id = ?;",
                dojo_id])
        )
    rescue Exception
		  return  false
    end

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
