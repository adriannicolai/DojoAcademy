Rails.application.routes.draw do
    #students
    get 'students/show'
    get 'students/:id/destroy' => 'students#destroy'



    #dojos
    get 'dojos/index'
    get 'dojos/:id/destroy' => 'dojos#destroy'
    post 'dojos/:id' => 'dojos#set_show'


    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    resources :dojos
    resources :students

    root 'dojos#index'
end
