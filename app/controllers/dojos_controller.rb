class DojosController < ApplicationController
	# (GET) /dojos1
	# Displays the index page with all of the dojos
 	def index
		@dojos = Dojo.all_dojos
  	end
	
	# (GET) /dojos/new
	# Displays a form for creating a new dojo
	def new
		html = render_to_string partial: "dojos/templates/dojo_modal", locals: {dojo: nil}
		render :json => {html: html}
	end

	# (POST) /dojos
	# Creates a new dojo
	# params: [:dojo][:branch], [:dojo][:city], [:dojo][:street], [:dojo][:state]
	def create
		dojo_id 	= Dojo.create_new_dojo(dojos_params)
		dojo 		= Dojo.find_dojo_by_id(dojo_id)
		html 		= render_to_string :partial => "dojos/templates/dojo_row", :locals => {:dojo => dojo}
		response 	= { dojo: dojo, html: html }
		render :json => response
	end

	# (GET) /dojos/:id
	# Shows the selected dojo
	# params: id
	def show
		session[:current_dojo] = params[:id]
		@dojo 	  = Dojo.find_dojo_by_id(params[:id])
		@students = Dojo.find_students_by_dojo_id(params[:id])
	end

	# (GET) /dojos/:id/edit
	# Edit the selected dojo
	# params: id, [:dojo][:branch], [:dojo][:city], [:dojo][:street], [:dojo][:state]
	def edit
		dojo = Dojo.find_dojo_by_id(params[:id])
		html = render_to_string partial: "dojos/templates/dojo_modal", locals: {dojo: dojo}
		render :json => {html: html, dojo: dojo}
	end

	# (POST) /dojos/:id/edit
	# Describe what the method does
	# params: id, 
	def update
		Dojo.update_dojo(params[:id], dojos_params)
		dojo = Dojo.find_dojo_by_id(params[:id])
		html = render_to_string :partial => "/dojos/templates/dojo_row", :locals => { :dojo => dojo }
		render :json => {dojo: dojo, html: html}
	end

	# (GET) /dojos/:id/destroy
	# Destroys the selected dojo
	# params: id
	def destroy
		Dojo.delete_dojo_by_id(params[:id])
	end

	private
	def dojos_params
		params.require(:dojo).permit(:branch, :city, :street, :state)
	end
	  
end
