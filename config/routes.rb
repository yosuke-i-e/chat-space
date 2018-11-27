Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resources :groups, only: [:new, :create, :edit, :update]
  resources :users, only: [:edit, :update]
end
