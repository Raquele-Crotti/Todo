class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t| #task model in database to support creating todos
      t.string :title #what is the task
      t.boolean :done, default: false #checkbox with default unchecked
      t.timestamps
    end
  end
end
