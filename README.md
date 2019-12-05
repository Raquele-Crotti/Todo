# ToDo - A To-Do List Application
Application features a fluid user interface through advanced concepts in Javascript which allows users to rapidly add content.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)
* [Sources](#sources)
* [Contact](#contact)

## General info
Application features a To Do List that allows users to add tasks and check off completion status. Also incorporates user log-in/log-out and registration pages. 


## Technologies 
Project is created with:
* [AJAX](https://api.jquery.com/jquery.ajax/)
* [DOM(Document Object Model)](https://www.w3schools.com/js/js_htmldom.asp)
* [jQuery](https://github.com/rails/jquery-rails)
* [JSON(JavaScript Object Notation)](https://www.json.org/json-en.html)
* [ruby gem RSpec](https://github.com/rspec/rspec-rails)
* [ruby '2.5.3'](https://github.com/university-bootcamp/coding-environment/blob/master/README.md#coding-environment-installation-guide)
* [gem 'rails', '~> 5.2.3'](https://github.com/rails/rails)
* [Heroku](https://signup.heroku.com/t/platform?c=70130000001xDpdAAE&gclid=CjwKCAiAzuPuBRAIEiwAkkmOSM8vVAtL7RKLqoIVrshH7VuxMysxD2e1555A3dwyDU4sOSOxy6zujxoCXBIQAvD_BwE)
* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
* [CSS](https://www.w3schools.com/html/html_css.asp)
* [AWS](https://aws.amazon.com/)
* [Bootstrap](https://github.com/twbs/bootstrap-rubygem)
* [gem simpleform](https://github.com/plataformatec/simple_form)
* [Devise gem](https://github.com/plataformatec/devise)
* [FactoryBot gem](https://github.com/thoughtbot/factory_Bot/blob/master/GETTING_STARTED.md)
* [Carrierwave](https://github.com/carrierwaveuploader/carrierwave)
## Setup   
Set up a development environment and start a new project

**Getting Started**

Go to one of the terminals within your coding environment and type the following:
  ```
  $ cd /vagrant/src
  ```
Create a new application that uses postgres
  ```
  $ rails new todo --database=postgresql --skip-turbolinks --skip-test-unit
  ```
We used the --skip-turbolinks and --skip-test-unit tags because we won't be using either in our project (we'll be using rspec and not test:unit). These tags specify that our new app should not have either option.

Open newly created todo application in your text editor and go to database.yml file and edit:
  ```
  username: postgres
  password: password
  host: localhost
  ```
comment out last two lines on file for username and password.

Change directory into your todo project
  ```
  $ cd /vagrant/src/todo
  ```
Create your initial database
  ```
  $ rake db:create
  ```
Start the server:
  ```
  $ rails server -b 0.0.0.0 -p 3000
  ```
In the second terminal window, type following command to move into todo folder:
  ```
  $ cd /vagrant/src/todo
  ```
Set up web development pipeline:
  
    create new Github repository

    create project in heroku and then deploy it to heroku

## Set Up a Static Page and Task API

In order to have a static page in our application, we will need to have a controller that is configured for the page. Run the following command to create a static_pages controller that we can use for our application.
```
$ rails generate controller static_pages
```
Edit app/controllers/static_pages_controller.rb to include an index action, by making the following code change:
```
class StaticPagesController < ApplicationController
  def index
  end
end
```
Next, create the file app/views/static_pages/index.html.erb with the following code in it.
```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main">

  </section>
</section>
```
Save the file.

Finally, configure the static_pages#index to be the page displayed for the root URL the application. Edit config/routes.rb to include the following code.
```
Rails.application.routes.draw do
  root 'static_pages#index'
end
```
Save the file.

Visit the root URL of the application and look at the header displayed in the web browser.

If our application supports creating to-dos, then we need a database table to support this. Run the following command to generate a task model in our database.
```
$ rails generate model task
```
The tasks table should contain two fields: title and done. Edit the migration file in db/migrate/XXXXXXXX_create_tasks.rb to contain the following code:
```
class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :done, default: false
      t.timestamps
    end
  end
end
```
Save the file.

Run the database migration by running the following command:
```
$ bundle exec rake db:migrate
```
At this point, our database tables don't contain any elements yet. We should add a few example tasks in our database.

Enter the rails console.
```
$ rails console
```
Then run the commands inside the rails console to add some example items into the database. Let's start with the to-do item example like Do laundry.
```
Task.create(title: "Do laundry", done: false)
```
Next, run this command to add something like Make bed to the tasks database.
```
Task.create(title: "Make bed", done: false)
```
We now have a database table that contains a couple of to-do tasks. Our next step will be to expose these on a JSON endpoint. The goal will be to make it so when we perform an HTTP GET request to URLs that look like this:
```
/tasks
```
It will produce JSON in the following format.
```
[{
  id: 1,
  title: "Do laundry",
  done: true,
  created_at: "2016-04-13T21:09:56.083Z",
  updated_at: "2016-04-20T18:56:45.601Z"
},
{
  id: 2,
  title: "Make bed",
  done: true,
  created_at: "2016-04-13T21:09:59.064Z",
  updated_at: "2016-04-20T18:56:46.378Z"
}]
```
We will want to make this happen following a test-driven approach. Let's set up a standard testing environment for our application, including both rspec and FactoryBot

To do this we'll implement the feature using TDD in the Rails app. Add rspec to the project by modifying Gemfile to include the following:
```
group :development, :test do
  gem 'rspec-rails', '~> 3.5'
end
```
Then run the following command to install the gem in the project.
```
$ bundle install
```
Then restart the server. Then run the command to install rspec.
```
$ rails generate rspec:install
```
The folder it created was the spec one. All of our tests will live in that folder since we're using rspec. Ruby on Rails comes with the test folder by default, for people using Test::Unit, but we are not going to use that tool. Delete that folder since we won't put anything in it.
```
$ rm -rf test
```
Let's write a quick test for the index action. Before we do this, we need to include a few sample tasks. Let's add FactoryBot and configure it to work with the tasks database table.

To install the gem, include the gem in our Gemfile:
```
group :development, :test do
  gem 'rspec-rails', '~> 3.5'
  gem "factory_bot_rails"
end
```
Because this is in the section group for development and test, this gem also won't be usable on production (Heroku), but that's OK because we won't need to use it outside our specs.

Save the file. Then run the bundle install command.
```
$ bundle install
```
Build a new file located in spec/factories.rb and put the following code in it:
```
FactoryBot.define do
  factory :task do
    title { "Do the dishes" }
    done { false }
  end
end
```
Create a tasks controller.
```
$ rails generate controller tasks
```
Write a test that the index action properly lists out all the tasks. Add the following to spec/controllers/tasks_controller_spec.rb.
```
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the database" do
    end
  end
end
```
Next, when we trigger the action, we should make sure there are a couple items in the database. Because we've connected FactoryBot, pushing them into the database will be easy. Add the following lines to the file.
```
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the database" do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)
    end
  end
end
```
Next, add the code to trigger the index controller action.
```
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the database" do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)
      get :index
    end
  end
end
```
Next, let's make sure the HTTP request performs successfully.
```
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the database" do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)
      get :index
      expect(response).to have_http_status :success
    end
  end
end
```
Save the file.

We can also access the actual response from the app in @response. This should produce a string of text that is in the JSON format spec/controllers/tasks_controller_spec.rb.
```
require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "tasks#index" do
    it "should list the tasks in the database" do
      task1 = FactoryBot.create(:task)
      task2 = FactoryBot.create(:task)
      get :index
      expect(response).to have_http_status :success
      response_value = ActiveSupport::JSON.decode(@response.body)
      expect(response_value.count).to eq(2)
    end
  end
end
```
Then run the test suite by running the following command:
```
$ bundle exec rspec
```
Remove the pending test by editing spec/helpers/tasks_helper_spec.rb to remove the lines of code that set up the pending test.

Save the file.

Run the test suite again.
```
$ bundle exec rspec
```
This will produce an error message indicating that the route cannot be found.

In order to fix this problem, configure the controller to respond to RESTful routes, by adding the following line to config/routes.rb:
```
Rails.application.routes.draw do
  root 'static_pages#index'
  resources :tasks
end
```
Save the file.

Run `$ bundle exec rspec` again.

Next, the test will fail. The error message indicates that the index action is missing from the TasksController.

To fix this problem, add the following to app/controllers/tasks_controller.rb:
```
class TasksController < ApplicationController
  def index
    render json: Task.all
  end
end
```
Save the file.

Run the test suite. The test suite should pass. Visit localhost:3000/tasks and notice the tasks listed in the JSON format. 

**Load the Tasks onto the Page**

We will now incorporate JavaScript in order to load items from our JSON API and render HTML for the page.

Check your Gemfile to see if you have the jquery-rails gem. If you don't, add it to the bottom of your Gemfile:
```
gem 'jquery-rails'
```
then run 
```
$ bundle install
```
Next, open assets/javascripts/application.js and add the following two lines above turbolinks like below:
```
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
```
restart rails server.
```
$ rails server -b 0.0.0.0 -p 3000
```
Our HTML should be structured such that after the page is fully loaded, the to-dos are listed in the following format.
```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus="">
  </header>
  <section class="main">
    <ul class="todo-list">
      <li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>Do laundry</label>
        </div>
      </li>
    </ul>
  </section>
</section>
```
And our JavaScript code will generate a list element for each item in the application. To start with, add an empty unordered list to the page in the main section by adding the following to app/views/static_pages/index.html.erb:
```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main">
    <ul class="todo-list">

    </ul>
  </section>
</section>
```
The next part of our code will have us dynamically generate list elements for each of the tasks in the following format.
```
<li>
  <div class="view">
    <input class="toggle" type="checkbox">
    <label>Do laundry</label>
  </div>
</li>
```
To start dynamically adding these list elements to the ul we will need to execute JavaScript code. The next step will be to trigger some JavaScript code after the page fully loads. The following code change to app/views/static_pages/index.html.erb will give us a place to execute JavaScript code, and will log the message "Hello, JavaScript" into the console.
```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main">
    <ul class="todo-list">

    </ul>
  </section>
</section>


<script>
  $(function() {
    console.log("Hello, JavaScript");
  });
</script>
```
Reload the page. Open the JavaScript developer tools, and reload the page. Notice the value "Hello, JavaScript" is present in the console after the page loads.

Next, visit /tasksLink opens in new tab in a browser. Rather than our application producing an HTML document that is generated, making GET requests to this URL produces a JSON representation of the tasks in our database. We can pull these values from the server into our application by doing an AJAX request, with the jQuery.getLink opens in new tab method.

Make the following code change to load all the tasks and log them into the console.
```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main">
    <ul class="todo-list">

    </ul>
  </section>
</section>



<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      console.log(data);
    });
  });
</script>
```
Save the file. Open the JavaScript developer console and refresh the page. You will see the contents of our database logged to the console.

Use jQuery's $.each method and make the following change to app/views/static_pages/index.html.erb
```
<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      $.each(data, function(index,  task) {
        console.log(task.title);
      });
    });
  });
</script>
```
Next, think about the HTML we want to add. If we loop through each of the items and wrap the title in an <li></li> tag, we can add this HTML into the <ul> above. And remember that it should be in the format of:
  ```
  <li>
  <div class="view">
    <input class="toggle" type="checkbox">
    <label>Do laundry</label>
  </div>
</li>
```
Although this is a lot of HTML to build the string for, initially there are three parts to the HTML component. The first part is the beginning of the HTML constant.
```
<li>
  <div class="view">
    <input class="toggle" type="checkbox">
    <label>
```
The next part we want to include is the task's title (in this example "Do Laundry"). The last part is the closing part of the HTML.
```
   </label>
  </div>
</li>
```
To start with, adjust the code to generate the HTML li elements we can add to the page. Make the following change to app/views/static_pages/index.html.erb.
```
<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      $.each(data, function(index,  task) {
        var liElement = '<li><div class="view"><input class="toggle" type="checkbox"><label>' +
         task.title +
         '</label></div></li>';
        console.log(liElement);
      });
    });
  });
</script>
```
Next, build a single variable to contain the full list of the various list elements in the same variable. Make the following change to the code.

```
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
  </header>

  <section class="main">
    <ul class="todo-list">

    </ul>
  </section>
</section>


<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, function(index,  task) {
        var liElement = '<li><div class="view"><input class="toggle" type="checkbox"><label>' +
         task.title +
         '</label></div></li>';
        htmlString += liElement;
      });
      console.log(htmlString);

    });
  });
</script>
```
Save the file.

Reload the page. In the console, an HTML string looking like the following displayed.
```
<li><div class="view"><input class="toggle" type="checkbox"><label>Do laundry</label></div></li><li><div class="view"><input class="toggle" type="checkbox"><label>Make bed</label></div></li>
```
This successfully loads the data into the application and builds some HTML that we want to push into the application. We can push this into the HTML for the list elements inside the unordered list that has the class todo-list. Add the following line of code to extract the DOM element with the class of todo-list from the page.
```
<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, function(index,  task) {
        var liElement = '<li><div class="view"><input class="toggle" type="checkbox"><label>' +
         task.title +
         '</label></div></li>';
        htmlString += liElement;
      });
      var ulTodos = $('.todo-list');

    });
  });
</script>
```
Now take the HTML string we've just built (htmlString) and push it into the HTML element that just built(ulTodos). Make the following change to app/views/static_pages/index.html.erb.
```
<script>
  $(function() {
    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, function(index,  task) {
        var liElement = '<li><div class="view"><input class="toggle" type="checkbox"><label>' +
         task.title +
         '</label></div></li>';
        htmlString += liElement;
      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);
    });
  });
</script>
```
Save the file.

Refresh the page. The different to-do items will be listed on the page!

So even though the page's HTML had the following value when the page initially loaded:
```
<ul class="todo-list">

</ul>
```
Inside the web browser, we load the various tasks from our site. Then, when the tasks are loaded, we build an HTML string and push it into the ul, causing the item to be added into the original ul. The result of the HTML on the page after it fully loads is the following:
```
<ul class="todo-list">
   <li>
      <div class="view"><input class="toggle" type="checkbox"><label>Do laundry</label></div>
   </li>
   <li>
      <div class="view"><input class="toggle" type="checkbox"><label>Make bed</label></div>
   </li>
</ul>
```

## Status
Project is fluid, user-friendly, and thoroughly tested. You can find it deployed on heroku via: [Todo Application](https://todoster-raquele-crotti.herokuapp.com/)


## Sources
This app was created during my time completing UC Berkeley Extension's  Coding Bootcamp Program.

## Contact 
* [Portfolio](https://www.raquelecrotti.com/)
* [LinkedIn](https://www.linkedin.com/in/raquele-crotti/)
* [Github](https://github.com/Raquele-Crotti)
