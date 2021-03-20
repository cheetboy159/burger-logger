// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delete-button").on("click", function(event) {
    console.log("Delete worked");
    console.log(this);
    var button = $(this);
    // grabs id from button
    var id = button.attr("data-id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function(results) {
        console.log(results);
        location.reload();
      }
    );
  });
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burgers");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
