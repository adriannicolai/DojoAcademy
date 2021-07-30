class StudentsController < ApplicationController
	# (GET) /students/:id
	# displays the selected student 
	# params: id
  	def show
    	@student = Student.find_student_by_id(params[:id])
		@cohorts = Dojo.find_students_by_dojo_id(@student["dojo_id"])
		@dojo	 = Dojo.find_dojo_by_id(@student["dojo_id"])
  	end

	# (GET) /students/:id/edit
	# displays the form to edit the selected student
	# params: id
  	def edit
		student = Student.find_student_by_id(params[:id])
		dojos 	= Dojo.all_dojos
		html = render_to_string partial: "students/templates/student_modal", locals: { type: "edit_student", dojos: dojos, student: student, current_dojo: session[:current_dojo]}

		render json: {html: html}
	end

	# (POST) /students/:id
	# updaes the selected student
	# params: id, [:student][:dojo], [:student][:first_name], [:student][:dojo], [:student][:last_name], [:student][:dojo], [:student][:email]
	def update
		Student.update_student(params[:id], student_params, params[:student][:dojo])
		student  = Student.find_student_by_id(params[:id])
		html = render_to_string partial: 'students/templates/student_row', locals: { cohort: student}
		render :json => { student: student, current_dojo: session[:current_dojo], html: html }
	end

	# (GET) /students/new
	# Displays the form to create a new student
	def new
		html = render_to_string partial: "students/templates/student_modal", locals: { dojos: Dojo.all_dojos, current_dojo: session[:current_dojo], type: 'new_student' }

		render :json => {html: html}
	end

	# (POST) /students
	# Creates a new student
	# params: [:student][:dojo], [:student][:first_name], [:student][:last_name], [:student][:email]
	def create
		student_id  = Student.create_student(student_params, params[:student][:dojo])
		student 	= Student.find_student_by_id(student_id)
		html = render_to_string partial: 'students/templates/student_row_dojos_page', locals: { student: student}

		render :json => {student: student, html: html, current_dojo: session[:current_dojo]}
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
