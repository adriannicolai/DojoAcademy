class StudentsController < ApplicationController
  	def show
    	@student = Student.find(params[:id])
  	rescue ActiveRecord::RecordNotFound
    	flash[:errors] = ["Student not found"]
		redirect_to session[:return_to]
  	end

  	def edit
		@student = Student.find(params[:id])
		@dojos = Dojo.all
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Student not found"]
		redirect_to session[:return_to]
	end

	def update
		dojo = Dojo.find(params[:student][:dojo])
		Student.find(params[:id]).update(student_params)
		Student.find(params[:id]).update(dojo: dojo)
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Record not found"]
		redirect_to session[:return_to]
	end

	def new
		@dojos = Dojo.all
	end

	def create
		student 	   = Student.new(student_params)
		student.dojo   = Dojo.find(params[:student][:dojo]) 
		student.save
		redirect_to '/dojos'
	end

	private

	def student_params
		params.require(:student).permit(:first_name, :last_name, :email)
	end
end
