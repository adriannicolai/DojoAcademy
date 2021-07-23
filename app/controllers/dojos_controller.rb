class DojosController < ApplicationController
 	def index
		@dojos = Dojo.all
  	end
	
	def new
	end

	def create
		dojo = Dojo.create(dojos_params)
		flash[:errors] = dojo.errors.full_messages if dojo.errors
		redirect_to '/dojos'
	end

	def show
		@dojo = Dojo.find(params[:id])
		@students = @dojo.students
		session[:return_to] = "/dojos/#{params[:id]}"
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Dojo not found"]
		redirect_to '/dojos'
	end

	def edit
		@dojo = Dojo.find(params[:id])
		redirect_to '/dojos'
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Dojo not found"]
		redirect_to '/dojos'
	end

	def update
		dojo = Dojo.find(params[:id]).update(dojos_params)
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Dojo not found"]
		redirect_to '/dojos'
	end

	def destroy
		dojo = Dojo.find(params[:id]).destroy
		redirect_to '/dojos'
	rescue ActiveRecord::RecordNotFound
		flash[:errors] = ["Dojo not found"]
		redirect_to '/dojos'
	end

	private

	def dojos_params
		params.require(:dojo).permit(:branch, :city, :street, :state)
	end
	  
end
