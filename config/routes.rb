Rails.application.routes.draw do
  get 'students/show'
  get 'dojos/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'dojos/:id/destroy' => 'dojos#destroy'
  resources :dojos
  resources :students

  root 'dojos#index'
end
