Rails.application.routes.draw do

  #dojos
  get   'dojos/index'
  get   'dojos/:id/destroy'    => 'dojos#destroy'

  post  'dojos/:id/show'       => 'dojos#set_show'
  post  'dojos/new'            => 'dojos#new'
  post  'dojos/:id/edit'       => 'dojos#edit'
  post  'dojos/:id/destroy'    => 'dojos#destroy'

  #students
  get   'students/show'
  get   'students/:id/destroy' => 'students#destroy'

  post 'students/new'          => 'students#new'
  post 'students/:id'          => 'students#set_show'
  post 'students/:id/destroy'  => 'students#destroy'
  post 'students/:id/edit'     => 'students#edit'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :dojos
  resources :students

  root 'dojos#index'
end
