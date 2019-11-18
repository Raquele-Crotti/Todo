FactoryBot.define do
  factory :user do
    
  end

  factory :task do
    title { "Do the dishes" }
    done {false}
  end
end