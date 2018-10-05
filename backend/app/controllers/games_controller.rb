class GamesController < ApplicationController
  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.create(score:params[:score],user_id:params[:user][:id])
    render json: @game, status: :accepted
  end
end
