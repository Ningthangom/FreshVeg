



// $("#login-button").on('click', function() {
//     var username = $("#username-l").val().trim();
//     var password = $("#pwd-l").val().trim();

//     $.get("/api/users", function(data){
//         console.log(data);
//         if (username === data.username && username === data.password) {
//             reRoute(); 
//         } else {
//             console.log("that does not exist");
//         }
//     });
// });

// function getUser(userData) {
//     $.get("/api/users", userData).then(reRoute());
//   }

// function reRoute() {
//     window.location.href = "/users";
// }