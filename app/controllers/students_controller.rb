class StudentsController < ApplicationController
	# (post) /students/:id
	# displays returns the redirect_url for the selected student
	# params: id
  	def set_show
		render :json => { redirect_url: "/students/#{params[:id]}", status: true }
  	end

	# (GET) /students/:id
	# displays the selected student 
	# params: id
  	def show
    	@student = Student.find_student_by_id(params[:id])
		@cohorts = Dojo.find_students_by_dojo_id(@student["dojo_id"])
		@dojo	 = Dojo.find_dojo_by_id(@student["dojo_id"])

	rescue Exception
		render :json => { :status => false } 
  	end

	# (GET) /students/:id/edit
	# displays the form to edit the selected student
	# params: id
  	def edit
		student = Student.find_student_by_id(params[:id])
		dojos 	= Dojo.all_dojos
		html = render_to_string partial: "students/templates/student_modal", locals: { dojos: dojos, student: student, current_dojo: session[:current_dojo]}

		render json: { html: html, status: true }
	rescue Exception
		render :json => { :status => false } 
	end

	# (POST) /students/:id
	# updaes the selected student
	# params: id, [:student][:dojo], [:student][:first_name], [:student][:dojo], [:student][:last_name], [:student][:dojo], [:student][:email]
	def update
		student = Student.update_student(params[:id], student_params, params[:student][:dojo])
		html 	= render_to_string partial: 'students/templates/student_row', locals: { cohort: student[:result][:student]}

		render :json => { student: student[:result][:student], current_dojo: session[:current_dojo], html: html, status: true } if student[:status]
		render :json => { :status => false } unless  student[:status]
	rescue Exception 
		render :json => { :status => false } 
	end

	# (GET) /students/new
	# Displays the form to create a new student
	def new
		html = render_to_string partial: "students/templates/student_modal", locals: { dojos: Dojo.all_dojos, current_dojo: session[:current_dojo], student: nil }

		render :json => {html: html, status: true}
	end

	# (POST) /students
	# Creates a new student
	# params: [:student][:dojo], [:student][:first_name], [:student][:last_name], [:student][:email]
	def create
		student  = Student.create_student(student_params, params[:student][:dojo])
		html	 = render_to_string partial: 'students/templates/student_row_dojos_page', locals: { student: student[:result][:student] }

		render :json => {student: student[:result][:student], html: html, current_dojo: session[:current_dojo]}
	rescue Exception => ex
		Error.record_error_return(ex.message, params)
		render :json => { :status => false, :error_message => ex.message } 
	end

	# (POST) /students/:id
	# Creates a new student
	# params: id
	def destroy
		Student.delete_student_by_id(params[:id])

		render :json => params[:id]
	end

	private

	def student_params
		params.require(:student).permit(:first_name, :last_name, :email)
	end
end
