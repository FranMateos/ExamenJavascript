(function () {
    var ac = document.getElementsByTagName('input');
    for(var i=0;i<ac.length;i++){
        // ac[i].lastChild.addEventListener('click', validar, false);
        ac[i].addEventListener('change', validar, false);
    }
    var but = document.getElementsByTagName('button');
    for(var j=0;j<but.length;j++){
        but[j].addEventListener('submit', validar, false);
    }
})();

function validar(event) {
    var field = event.target;
    if(field.textContent == "Connect"){
        var email = document.getElementById('email_login').value.toString();
        var pass = document.getElementById('password_login').value.toString();
        var usuario = new Usuario(null, null, email, pass);
        login(usuario);
    }else{
    var bol = validatePasswd(document.getElementById('password').value.toString());
    bol = validatePasswd(document.getElementById('password-confirm').value.toString());
    console.log("bol vale: " + bol);
    if(bol){
        document.getElementById('password').setCustomValidity("");
        document.getElementById('password-confirm').setCustomValidity("");
        document.getElementById('email').setCustomValidity("");
        document.getElementById('email-confirm').setCustomValidity("");
    if (document.getElementById('email-confirm').value.toString() != document.getElementById('email').value.toString()) {
        bol = false;
        document.getElementById('email').setCustomValidity("Los emails no coinciden");
        document.getElementById('email-confirm').setCustomValidity("Los emails no coinciden");
        document.getElementById('email').focus();
        event.preventDefault();
    } else
    if (document.getElementById('password-confirm').value.toString() != document.getElementById('password').value.toString()) {
        bol = false;
        document.getElementById('password').setCustomValidity("Los passwords no coinciden");
        document.getElementById('password').focus();
        event.preventDefault();
    }else{
        document.getElementById('password').setCustomValidity("");
        document.getElementById('password-confirm').setCustomValidity("");
        document.getElementById('email').setCustomValidity("");
        document.getElementById('email-confirm').setCustomValidity("");
        bol = true;
    }
    if (bol) {
        var nombre = document.getElementById('first_name').value.toString();
        var apellido = document.getElementById('last_name').value.toString();
        var email = document.getElementById('email').value.toString();
        var contrasenia = document.getElementById('password').value.toString();
        var usuario = new Usuario(nombre, apellido, email, contrasenia);
        registrar(usuario); 
    }}else{
        document.getElementById('password').setCustomValidity("El password no tiene el formato esperado, debe contener al menos una letra mayúscula, otra minúscula, un número y un símbolo");
        document.getElementById('password-confirm').setCustomValidity("El password no tiene el formato esperado, debe contener al menos una letra mayúscula, otra minúscula, un número y un símbolo");
        event.preventDefault();
    }}
    return bol;
}

/*función que recibe un objeto usuario y guarda en una cookie 
 el correo electrónico y la contraseña en una cookie*/
function registrar(usuario) {
    if(usuario instanceof Usuario){
    document.cookie = "nombre:"+usuario.nombre+";apellido:"+usuario.apellido+";email:"
            +usuario.email+";contrasenia:"+usuario.contrasenia;
    alert("Usuario registrado correctamente");
}
}

/*función que devuelve true si el usuario y la contraseña del objeto usuario 
 coinciden y existen en la cookie, en caso contrario devuelve false*/
function login(usuario){
    var cok=document.cookie;
    if(usuario instanceof Usuario){
    if(cok.toString().split(":")[2].toString().split(";")[0].toString() == usuario.email &&
            cok.toString().split(":")[3].toString() == usuario.contrasenia){
        alert("Bienvenido");
        return true;
    }else{
        alert("Por favor, introduzca un nombre de usuario y clave correctos. Observe que ambos campos pueden ser sensibles a mayúsculas.");
        document.getElementById('email_login').focus();
        return false;
    }}
}

/*función que devuelve true si la contraseña es válida 
 y false en caso contrario*/
function validatePasswd(passwd) {
    var min = /[a-zñ]/g.test(passwd);
    var may = /[A-ZÑ]/g.test(passwd);
    var num = /[0-9]/g.test(passwd);
    var sim = /\W/g.test(passwd);
    return ( min && may && num && sim);
}