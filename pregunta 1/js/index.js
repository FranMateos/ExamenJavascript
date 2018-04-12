(function () {
    var ac = document.getElementsByTagName('form');
    for(var i=0;i<ac.length;i++){
        ac[i].addEventListener('submit', validar, true);
        ac[i].addEventListener('change', validar, false);
    }
    // document.addEventListener('click', validar, false);
    // document.addEventListener('change', val, false);
    // validatePasswd(document.getElementById('password'));
})();

function validar(event) {
    var field = event.target;
    if(field.textContent == "Connect"){
        var email = field.getElementById('email_login').value.toString();
        var pass = field.getElementById('password_login').value.toString();
        var usuario = new Usuario(null, null, email, pass);
        login(usuario);
    }else{
    var bol = validatePasswd(field.getElementById('password').value.toString());
    console.log("bol vale: " + bol);
    if(bol){
    if (field.getElementById('email-confirm') != field.getElementById('email')) {
        bol = false;
        // field.getElementById('email-confirm').validity.patternMismatch = true;
        // field.getElementById('email').validity.patternMismatch = true;
        // field.getElementById('email').focus();
        field.getElementById('email').setCustomvalidity("Los emails no coinciden");
        event.preventDefault();
    } else
    if (field.getElementById('password-confirm').value.toString() != event.target.getElementById('password').value.toString()) {
        bol = false;
        // field.getElementById('password-confirm').validity.patternMismatch = true;
        // event.target.getElementById('password').validity.patternMismatch = true;
        // event.target.getElementById('password').focus();
        field.getElementById('password').setCustomValidity("Los passwords no coinciden");
        event.preventDefault();
    }
    if (bol) {
        var nombre = field.getElementById('first_name').value.toString();
        var apellido = field.getElementById('last_name').value.toString();
        var email = field.getElementById('email').value.toString();
        var contrasenia = field.getElementById('password').value.toString();
        var usuario = new Usuario(nombre, apellido, email, contrasenia);
        registrar(usuario); 
    }}}else{
        field.getElementById('password').setCustomValidity("El password no tiene el formato esperado");
        event.preventDefault();
    }
    return bol;
}

/*función que recibe un objeto usuario y guarda en una cookie 
 el correo electrónico y la contraseña en una cookie*/
function registrar(usuario) {
    if(usuario instanceof Usuario){
    document.cookie = "nombre:"+usuario.nombre+";apellido:"+usuario.apellido+";email:"
            +usuario.email+";contrasenia:"+usuario.contrasenia;}
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
    return (/[a-zñ]/g.test(passwd) && /[A-ZÑ]/g.test(passwd) && /[0-9]/g.test(passwd) && /\W/g.test(passwd));
}

function val(event) {
    if (event.target.id == 'password' || event.target.id == 'password-confirm') {
        console.log('Entra en validacion');
        if (document.getElementById('password-confirm') != document.getElementById('password')) {
            document.getElementById('password-confirm').validity.valid = false;
            document.getElementById('password-confirm').title = 'Las contraseñas han de coincidir';
        } else {
            document.getElementById('password-confirm').validity.valid = true;
        }
    }
}