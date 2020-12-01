$(document).ready(function() {

    $("#submitBtn").on('click', function(event) {
        event.preventDefault();
        //statement check to ensure fields are empty, both need to be filled
        try {
        $.ajax("/api/addvege", {
            type: 'POST',
            data: {
                firstName: $("#first_name").val().trim(),
                lastName: $("#last_name").val().trim()
            },
          }).then(function(res) {
              console.log(`New farmer ${res} added!`);

            //clear input fields
            clearForm();
              
              //notify user if successful
              alert(`Successfully added ${res} to the database`);
              
          })
        } catch (error) {
            throw error;
        }
    });

    clearForm = () => {
        $("#first_name").replace($("#first_name").val(), '')

        $("#last_name").replace($("#first_name").val(), '')  
    }

    

});

