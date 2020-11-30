


$("#add-btn").on("click",handleVegeFormSubmit);


function handleVegeFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    let nameInput = $("#nameInput").val().trim()
    let priceInput = $("#priceInput").val().trim()


    upsertveg({
      name: nameInput,

      product_availability: true,

      price_kg: priceInput

        
    });
  }
  // A function for creating an author. Calls getAuthors upon completion
  function upsertveg(vegeData) {
    $.post("/api/farmer/addvege", vegeData)
      .then(getVege);
  }