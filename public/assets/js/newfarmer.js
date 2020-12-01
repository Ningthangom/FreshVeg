// const { default: swal } = require("sweetalert");

// const { default: swal } = require("sweetalert");

// const { default: swal } = require("sweetalert");

// const { default: swal } = require("sweetalert");

$(document).ready(function() {

    $("#submitBtn").on('click', function(event) {
        event.preventDefault();

        if (($("#first_name").val().length == 0) || ($("#last_name").val().length == 0)) {
            swal("Sorry", "Not a valid input", "warning");
        } else {
            try {
                $.ajax("/api/addvege", {
                    type: 'POST',
                    data: {
                        firstName: $("#first_name").val().trim(),
                        lastName: $("#last_name").val().trim()
                    },
                  }).then(function(res, data) {
                    console.log(res)
                    swal(`New Farmer Added`, `Thank you`, "success");
                  });
            }catch (error) {
                throw error;
            }
        }

        
        
    });

});

