(function () {
    document.getElementById('enviar').addEventListener('click', function () {
        var tar = document.getElementById('tarea').value.toString();
        if (tar != "") {
            addTaskDOM(tar);
        }
    }, false);
    document.getElementById('eliminar').addEventListener('click', deleteCompletedTasksDOM, false);
    selectTask();
})();

function chargeTaskDOM(tarea) {
    for (var i = 0; i < tarea.length; i++) {
        var ul = document.getElementById('listado');
        var li = document.createElement('li');
        var chbox = document.createElement("input");
        var sp = document.createElement("span");
        chbox.setAttribute("type", "checkbox");
        chbox.setAttribute("class", "tareas");
        chbox.setAttribute("onchange", "subrayar(event);");
        sp.class = 'text_tarea';
        sp.textContent = tarea[i].task;
        li.append(chbox, sp);
        ul.appendChild(li);
    }
}

/*función que añade  una tarea mediante DOM*/
function addTaskDOM(tarea) {
    saveTask(tarea);
    var ul = document.getElementById('listado');
    var li = document.createElement('li');
    var chbox = document.createElement("input");
    var sp = document.createElement("span");
    chbox.setAttribute("type", "checkbox");
    chbox.setAttribute("class", "tareas");
    chbox.setAttribute("onchange", "subrayar(event);");
    sp.class = 'text_tarea';
    sp.textContent = tarea;
    li.append(chbox, sp);
    ul.appendChild(li);
}

function subrayar(event) {
    var li = event.target.nextSibling;
    if (event.target.checked) {
        li.style.textDecoration = 'line-through';
    } else {
        li.style.textDecoration = 'none';
    }
}

/*función que elimina todas las tareas completadas mediante DOM */
function deleteCompletedTasksDOM() {
    var tars = document.getElementsByTagName('li');
    for (var i = 0; i < tars.length; i++) {
        if (tars[i].firstChild.checked) {
            tars[i].parentNode.removeChild(tars[i]);
            dropTask(tars[i].lastChild.textContent.toString());
        }
    }
}

// PERSISTENCIA DE DATOS

/*función que añade una tarea a json-server*/
function selectTask() {

    var datos = [];
    $.getJSON("http://192.168.1.40:3000/tasks", function (json) {
        chargeTaskDOM(json.list);
    });
    /*$.getJSON("http://192.168.1.40:3000/tasks")
            .done(function (result, textStatus, jqXHR) {

                $.each(result.data, function (i, result) {
                    datos.push(result.task);
                });
                 chargeTaskDOM(datos);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Las tareas no han podido ser cargadas");
            }); */
}


/*función que añade una tarea a json-server*/
function saveTask(tarea) {

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://192.168.1.40:3000/tasks",
        data: {"tarea": tarea}
    })
            .done(function (result, textStatus, jqXHR) {
                alert("La tarea ha sido añadida correctamente");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("La tarea no ha podido ser añadida");
            });

}

/*función que elimina una tarea de json-server */
function dropTask(tarea) {

    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "http://192.168.1.40:3000/tasks/" + tarea
    })
            .done(function (result, textStatus, jqXHR) {
                // $("#usuarios").append("<h3>Borrado correctamente el usuario: "+idUsuario+"</h3>");
                alert("La tarea ha sido borrada correctamente");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("La tarea no ha sido borrada");
            });
}

