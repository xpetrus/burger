$(function(){
    $(".devour").on("click", function(event){
        var id = $(this).data("id");
        var ate = $(this).data("ate");

        var ateState = {
            devoured: ate
        };

        $.ajax("/api/burger/" +id,{
            type: "PUT",
            data: ateState
        }).then(
            function(){
                console.log("Changed devoured to", ate);
                location.reload();
            }
        );
    });

    $(".add-burger").on("submit", function(event){
        event.preventDefault();
        console.log("clicked submit");

        var newBurger = {
            burger_name: $("#burgerfield").val().trim(),
            
        };

        $.ajax("/api/burger", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("added new burger");
                location.reload();
            }
        );
    });




})