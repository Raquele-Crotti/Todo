Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#index' #make static pages inddex into root page of app
  resources :tasks
end
