// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delete-button").on("click", function (event) {
    console.log("Delete worked");
    console.log(this);
    let button = $(this);
    // grabs id from button
    let id = button.attr("data-id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function (results) {
        console.log(results);
        location.reload();
      }
    );
  });
  $(".change-devaoure").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoure = $(this).data("newdevoure");
    var newDevoureState = {
      devoure:newDevoure
    };
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevoureState
    }).then(
      function() {
        console.log("changed devoure to", newDevoure);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#bu").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
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
