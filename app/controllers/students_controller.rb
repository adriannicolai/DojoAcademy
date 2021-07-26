class StudentsController < ApplicationController
	# (GET) /students/:id
	# displays the selected student 
	# params: id
  	def show
    	@student = Student.find_student_by_id(params[:id])

  	rescue ActiveRecord::RecordNotFound
    	flash[:errors] = ["Student not found"]
		redirect_to session[:return_to]

  	end

	# (GET) /students/:id/edit
	# displays the form to edit the selected student
	# params: id
	# Output of the method
  	def edit
		@student = Student.find_student_by_id(params[:id])
		@dojos 	 = Dojo.all_dojos

	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Student not found"]
		redirect_to session[:return_to]

	end

	# (POST) /students/:id
	# updaes the selected student
	# params: id, [:student][:dojo], [:student][:first_name], [:student][:dojo], [:student][:last_name], [:student][:dojo], [:student][:email]
	# Output of the method
	def update
		student = Student.update_student(params[:id], student_params, params[:student][:dojo])

	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Record not found"]
		redirect_to session[:return_to]
	end

	# (GET) /students/new
	# Displays the form to create a new student
	def new
		@dojos = Dojo.all_dojos
	end

	# (POST) /students
	# Creates a new student
	# params: [:student][:dojo], [:student][:first_name], [:student][:last_name], [:student][:email]
	# Output of the method
	def create
		student = Student.create_student(student_params, params[:student][:dojo])
		redirect_to '/dojos'
	end

	private

	def student_params
		params.require(:student).permit(:first_name, :last_name, :email)
	end
end
