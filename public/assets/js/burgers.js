// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delete-button").on("click", function (event) {
    console.log("Delete worked");
    console.log(this);
    let button = $(this);
    // grabs id from button
    let id = button.attr("data-id");
    $.ajax("/api/burger/" + id, {
      type: "DELETE"
    }).then(
      function (results) {
        console.log(results);
        location.reload();
      }
    );
  });
  $(".change-devaoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newDevoured");
    var newDevouredState = newDevoured;
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca").val().trim(),
      devoured:0
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
