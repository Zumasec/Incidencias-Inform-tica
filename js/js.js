var token = "c52f46bf3aa5c2441847e9fdee3f4583fb77e7aaca0995826d45bc165940fac4";
var idtablero = "5bd6e4728be14d40e88c64fc"
var idlist = "5bd6e4728be14d40e88c64fd"
var appkey = "a358184ea95073f09071d85c1ede7453"

function incidencias(){
    var empresa = document.getElementById('empresa').value;
    var nombre = document.getElementById('nombre').value;
    var mcorreo = document.getElementById('mcorreo').value;
    var telefono = document.getElementById('telefono').value;
    var asunto = document.getElementById('asunto').value;
    var comentario = document.getElementById('incidencia').value;

    var fecha = new Date();
    var fechaTrello = fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2);
    var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    var desc = 'Fecha ' + fechaTrello + ' a las ' + hora + '\n' + ' Empresa: ' + empresa + '\n' + ' Nombre: ' + nombre + '\n' + ' Correo: ' + mcorreo + '\n' + ' Telefono: ' + telefono + '\n' + ' asunto: ' + asunto + '\n' + ' Comentario: ' + comentario;
    crearCarta(desc)
}

function crearCarta(desc) {
    if (empresa.value == "" || nombre.value == "" || mcorreo.value == "" || telefono.value == "" || asunto.value == "") {
        swal({
            text: "Rellena todos los campos!",
            icon: "warning",
            button: "Volver a intentar!",
        });
    } 
    else {
        swal({
            text: "Perfecto nos pondremos en contacto con usted",
            icon: "success",
            button: "Volver",
        }).then((value) => {
                var data = null;
                var name = 'Contactar con:';
                var xhr = new XMLHttpRequest();
                var url = "https://api.trello.com/1/cards?name=" + encodeURI(name) + "&desc=" + encodeURI(desc) + "&pos=top&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;
                url = url.replace(/#/g, '%23');
                xhr.open("POST", url);
                xhr.send(data);
                setTimeout(function(){ location.reload(); }, 1000);
            });
    }

}