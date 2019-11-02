class TasksController < ApplicationController
  def index
    render json: Task.all #load tasks from database in JSON format (not HTML)
  end
end
