Rails.application.routes.draw do
  root 'home#index'

  resources :lists, only: [:index, :show, :create, :update, :destroy]
end
