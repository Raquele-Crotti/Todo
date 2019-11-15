class TasksController < ApplicationController
  before_action :set_task, only: [:show]
  def index
    @tasks = Task.all
    render json: Task.order(:id) #load tasks from database in JSON format (not HTML) and in the oder in which they were created
  end

  def show
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(task_params)
    render json: task
  end

  def create
    task = Task.create(task_params)
    render json: task
  end

  private

  def task_params
    params.require(:task).permit(:done, :title)
  end

  def set_task
    @task = Task.find(params[:id])
  end

end
