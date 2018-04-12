$(function () {
    // restData();
    // var listado =  jqueryData();
    var listado =  ["primero", "segundo"];
    document.getElementById('autocomplete').addEventListener('keyup', function(){
        $('input.autocomplete').autocomplete({
     data: listado
     });
    }, false);
});

function jqueryData(){
     var list = [];
    $.getJSON("http://192.168.1.40:3000/tasks", function (json) {
       
        for(var i=0;i<json.length;i++){
            list.push(json[i].task);
        }
    });
    return list;
}

function restData() {
    // Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();
    var listado = [];
// Handle state changes for the request.
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
                // Parse the JSON
                var json = JSON.parse(request.responseText);
                for (var i = 0; i < json.length; i++) {
                    listado.push(json[i]);
                }
                charge(listado);
        } else {
                // An error occured :(
                alert("Error");
            }
    };

// Update the placeholder text.
// input.placeholder = "Loading options...";

// Set up and make the request.
    request.open('GET', 'http://192.168.1.40:3000/tasks', true);
    request.send;
}