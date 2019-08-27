var zms = document.getElementById('btnzms');
var fed = document.getElementById('btnfed');
var cns = document.getElementById('btncns');
var mrk = document.getElementById('btnmrk');
var emp = "";
let spiner = document.getElementById('spiner');

zms.addEventListener('click', function () {
    emp = 'zms';
    $('#exampleModalCenter').modal('show');
}, false)

fed.addEventListener('click', function () {
    emp = 'fed';
    $('#exampleModalCenter').modal('show');
}, false)

cns.addEventListener('click', function () {
    emp = 'cns';
    $('#exampleModalCenter').modal('show');
}, false)

mrk.addEventListener('click', function () {
    emp = 'mrk';
    $('#exampleModalCenter').modal('show');
}, false)

var token = "c52f46bf3aa5c2441847e9fdee3f4583fb77e7aaca0995826d45bc165940fac4";
var appkey = "a358184ea95073f09071d85c1ede7453";

var fecha = new Date();
var fechaTrello = fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2);
var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();


function donde() {
    var departamento = document.getElementById('Departamento').value;
    if (departamento == 'ADM' && emp == 'fed') {
        var idtablero = "5bd8a1d81b406d727095a414";
        var idlist = "5bd8a1e2c6b1cc6e94473a06";
        incidencias(idtablero, idlist);
    }

    if (departamento == 'ADM' && emp == 'cns') {
        var idtablero = "5bd8a49da945a73e147703ca";
        var idlist = "5bd8a4e30a1ea80ebe4cea4c";
        incidencias(idtablero, idlist);
    }

    if (departamento == 'ADM' && emp == 'mrk') {
        var idtablero = "5bd96d6bb2304159ca06c3b7";
        var idlist = "5bd96f560f85c765d1cff919";
        incidencias(idtablero, idlist);
    }

    if (departamento == 'ADM' && emp == 'zms') {
        var idtablero = "5bdac8c235762315b08523a4";
        var idlist = "5bdace52ec9cab8a2ecafe2a";
        incidencias(idtablero, idlist);
    }

    if (departamento == 'RRHH') {
        var idtablero = "5d65052a93607343ff355124";
        var idlist = "5bd6e4728be14d40e88c64fd";
        var tipo = document.getElementById('info').text
        incidencias(idtablero, idlist, tipo);
    }

    if (departamento == 'DD') {
        var idtablero = "5d65052a93607343ff355124";
        var idlist = "5bd6e4728be14d40e88c64fd";
        var tipo = document.getElementById('inci').text
        incidencias(idtablero, idlist, tipo);
    }
}



function incidencias(idtablero, idlist, tipo) {
    var departamento = document.getElementById('Departamento').value;
    var nombre = document.getElementById('nombre').value;
    var mcorreo = document.getElementById('mcorreo').value;
    var telefono = document.getElementById('telefono').value;
    var asunto = document.getElementById('asunto').value;
    var comentario = document.getElementById('incidencia').value;
    var captura = document.getElementById('captura')
    if (departamento == "RRHH" || departamento == "DD") {
        var desc = 'Empresa '+ emp + '\n' +'Fecha ' + fechaTrello + ' a las ' + hora + '\n' + ' Empresa: ' + emp + '\n' + ' Nombre: ' + nombre + '\n' + ' Correo: ' + mcorreo + '\n' + ' Telefono: ' + telefono + '\n' + ' Asunto: ' + asunto + '\n' + ' Comentario: ' + comentario ;
        crearCarta(desc, idtablero, idlist, tipo)
    }else{
        var desc = 'Fecha ' + fechaTrello + ' a las ' + hora + '\n' + ' Empresa: ' + emp + '\n' + ' Nombre: ' + nombre + '\n' + ' Correo: ' + mcorreo + '\n' + ' Telefono: ' + telefono + '\n' + ' Asunto: ' + asunto + '\n' + ' Comentario: ' + comentario ;
        crearCarta(desc, idtablero, idlist, tipo)
    }
    
}

function crearCarta(desc, idtablero, idlist, tipo) {

    var h = "";
    var data= null
    var name = fechaTrello + ' Notificación ' + emp + '\n' + tipo ;
    var xhr = new XMLHttpRequest();
    var url = "https://api.trello.com/1/cards?name=" + encodeURI(name) + "&desc=" + encodeURI(desc) + "&pos=top&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;
    url = url.replace(/#/g, '%23');
    xhr.open("POST", url);
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //recogemos el id de la carta creada
            var dt = this.responseText;
            h = JSON.parse(dt).id;
            spiner.style.cssText = 'display:block';
            
            if (archivos.length > 0) {
                adjuntos(h, name);
                usuarioPredefinido(h, name);
            }else{
                spiner.style.cssText = 'display:none';
                swal({
                    text: "Perfecto nos pondremos en contacto con usted",
                    icon: "success",
                    button: "Volver",
                }).then((value) => {
                    swal(location.reload());
                });
            
            }
       
        }
    });

  
}

var archivos = []
var rutas = []
var cont = 0;

function cambio(e) {
    var chooser = document.getElementById("" + e)
    var fileSize = chooser.files[0].size;
    var siezekiloByte = parseInt(fileSize / 1024);
    if (siezekiloByte > chooser.getAttribute('size')) {
        swal({
            title: "Error!",
            text: "Imagen muy grande",
            icon: "error",
            button: "Volver a intentar",
        });
        return false;
    } else {

        chooser.files[0];

        var path = document.getElementById("" + e).files[0].name;
        rutas.push(path)
        var archivoCorrecto = true;
        if (archivos.length == 0) {
            archivos.push(chooser.files[0]);
            var info = document.getElementById('infofile');
            info.innerHTML += '<b> ' + path + '  <i class="fas fa-trash" aria-hidden="true" id="papelera ' + cont + '" style="color:red" onclick="eliminar(id)"></i><b>';
            cont++;
        } else if (archivos.length > 0) {
            for (let i = 0; i < archivos.length; i++) {
                if (chooser.files[0].name == archivos[i].name) {
                    archivoCorrecto = false;
                }
            }
            if (archivoCorrecto == true) {
                archivos.push(chooser.files[0]);
                var info = document.getElementById('infofile');
                info.innerHTML += '<b> | ' + path + '  <i class="fas fa-trash" aria-hidden="true" id="papelera ' + cont + '" style="color:red" onclick="eliminar(id)"></i><b>';
                cont++;
            } else {
                swal({
                    title: "Error!",
                    text: "No puedes agregar otro archivo con el mismo nombre",
                    icon: "error",
                    button: "Volver a intentar",
                });

            }
        }
    }
    document.getElementsByClassName('chooser')[0].value = '';
}

function eliminar(e) {
    var eliminarPapelera = document.getElementById(e);
    eliminarPapelera.parentElement.remove();
    e = e.slice(9)
    archivos.splice(e, 1);

}

function adjuntos(data, name) {
    var arrData = [];
    var formData = new FormData();
    formData.append("token", token);
    formData.append("key", appkey);
    for (let i = 0; i < archivos.length; i++) { //recorremos todos los archivos seleccionados y los vamos enviando uno a uno
        formData.append("file", archivos[i]);
        var request = new XMLHttpRequest();
        request.open("POST", "https://api.trello.com/1/cards/" + data +"/attachments?key=" + appkey + "&token=" + token);
        request.send(formData);
        spiner.style.cssText = 'display:block';
        request.addEventListener("readystatechange", function () {

            if (this.readyState === this.DONE) {
                var finalizado = true;

                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].readyState !== this.DONE) { //cuando esté finalizado mensaje de completado
                        finalizado = false;
                    }
                }
                if (finalizado == true) {
                    spiner.style.cssText = 'display:none';
                    swal({
                        text: "Perfecto nos pondremos en contacto con usted",
                        icon: "success",
                        button: "Volver",
                    }).then((value) => {
                        swal(location.reload());
                    });
                }
            }
        });
    }
}
// + "/idMembers?value=5aabca240fa2e0ee00d049ce" 
var usuario1 = "5aabca240fa2e0ee00d049ce";

function usuarioPredefinido(data, name) {
    var ArrUsu = [usuario1]
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();
    for (let i = 0; i < ArrUsu.length; i++) {
        usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + ArrUsu[i] + "&key=" + appkey + "&token=" + token);
        usuRQ1.send(datas);
    }
    usuRQ1.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true && archivos.length == 0) {
                spiner.style.cssText = 'display:none';
                swal({
                        title: "Completado!",
                        text: 'Incidencia ' + name,
                        icon: "success",
                        button: "Cerrar",
                    })
                    .then(function (value) {
                        swal(location.reload());
                    });
            }
        }
    });
}