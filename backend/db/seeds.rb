require 'faker'

10.times do
  User.create({name:Faker::Friends.character})
end
