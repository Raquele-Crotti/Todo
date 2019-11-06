    // The taskHtml method takes in a JavaScript representation
    // of the task and produces an HTML representation using
    // <li> tags
    function taskHtml(task) {
      var checkedStatus = task.done ? "checked" : "";
      var liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
        " data-id='" + task.id + "'" +
        checkedStatus +
        '><label>' +
         task.title +
         '</label></div></li>';

      return liElement;
    }

    // toggleTask takes in an HTML representation of the
    // an event that fires from an HTML representation of
    // the toggle checkbox and  performs an API request to toggle
    // the value of the `done` field
    function toggleTask(e) {
      var itemId = $(e.target).data("id");


      var doneValue = Boolean($(e.target).is(':checked'));


      $.post("/tasks/" + itemId, {
        _method: "PUT",
        task: {
          done: doneValue
        }
      });
    }

    $.get("/tasks").success( function( data ) {
      var htmlString = "";

      $.each(data, function(index,  task) {
        htmlString += taskHtml(task);
      });
      var ulTodos = $('.todo-list');
      ulTodos.html(htmlString);

      $('.toggle').change(toggleTask);

    });

     $(function() { //when page loads, use jQuery to find HTML element of new-form. Register a callback to happen when the form is submitted. Use jQuery's preventDeafult method to stop default behavior of erloading the page on form submission. Log message to the console.
    $('#new-form').submit(function(event) {
      event.preventDefault();
      var textbox = $('.new-todo'); //use jQuery with the class of new-todo to extract value from textbox. Check value using jQuery's val method.
      var payload = { //build a variable to contain the payload of the request that we will be making. 
        task: {
          title: textbox.val()
        }
      };
      $.post("/tasks", payload).success(function(data) {
        var htmlString = taskHtml(data); //Call taskHtml method to convert the JavaScript representation of a task into an HTML representation of one.
        var ulTodos = $('.todo-list'); //have jQuery extract item from the page using append method to append HTML element to the bottom of the list.
        ulTodos.append(htmlString);
        $('toggle').click(toggleTask); //set up click handler to sync to API after we push new items onto the page.
      })
    });


  });