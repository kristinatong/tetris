class GameSerializer < ActiveModel::Serializer
  attributes :id, :score
  has_one :user
end
