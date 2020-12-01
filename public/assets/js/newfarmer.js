// const { default: swal } = require("sweetalert");

$(document).ready(function() {

    $("#submitBtn").on('click', function(event) {
        event.preventDefault();

        $.ajax("/api/addvege", {
            type: 'POST',
            data: {
                firstName: $("#first_name").val().trim(),
                lastName: $("#last_name").val().trim()
            },
          }).then(function(res, data) {
              console.log(`New farmer ${res} added!`);
              swal(`New Farmer Added`, `Thank you`, "success");
          })
    });


    

});

