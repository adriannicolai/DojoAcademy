class DojosController < ApplicationController
	# (GET) /dojos1
	# Displays the index page with all of the dojos
 	def index
		@dojos = Dojo.all_dojos
  	end
	
	# (GET) /dojos/new
	# Displays a form for creating a new dojo
	def new
	end

	# (POST) /dojos
	# Creates a new dojo
	# params: [:dojo][:branch], [:dojo][:city], [:dojo][:street], [:dojo][:state]
	def create
		Dojo.create_new_dojo(dojos_params)
		dojo 			= Dojo.find_dojo_after_creation(dojos_params)
		number_of_dojos = Dojo.all_dojos
		response = {
			dojo: dojo, 
			number_of_dojos: number_of_dojos
		}
		render :json => response
	end

	# (GET) /dojos/:id
	# Shows the selected dojo
	# params: id
	def show
		@dojo 	  = Dojo.find_dojo_by_id(params[:id])
		@students = Dojo.find_students_by_dojo_id(params[:id])
	end

	# (GET) /dojo:id/edit
	# Edit the selected dojo
	# params: id, [:dojo][:branch], [:dojo][:city], [:dojo][:street], [:dojo][:state]
	def edit
		@dojo = Dojo.find_dojo_by_id(params[:id])
		render :json => @dojo
	end

	# (POST) URL
	# Describe what the method does
	# params: id, 
	# Output of the method
	def update
		Dojo.update_dojo(params[:id], dojos_params)
		dojo = Dojo.find_dojo_by_id(params[:id])
		render :json => dojo
	end

	# (GET) /dojos/:id/destroy
	# Destroys the selected dojo
	# params: id
	def destroy
		Dojo.delete_dojo_by_id(params[:id])
		number_of_dojos = Dojo.all
		response = {
			id: params[:id],
			number_of_dojos: number_of_dojos
		}
		render :json => response
	end

	private
	def dojos_params
		params.require(:dojo).permit(:branch, :city, :street, :state)
	end
	  
end
