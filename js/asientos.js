var datosv = JSON.parse(localStorage.getItem('peliculaActual'));
if (datosv == null) {
    window.location.href = 'index.html'
}
var imagen;
var titulo;
var sinopsis;
var horario = datosv.hora;
var dia = datosv.dia;
var npersonas = datosv.personas;
peliculas.forEach(element => {
    if (datosv.idPelicula == element.id) {
        imagen = element.img;
        titulo = element.titulo;
        sinopsis = element.sinopsis;

    }
});


var Portada = document.getElementById('Portada');
var infoPeli = document.getElementsByClassName('infoPeli')[0];
var infoUsuario = document.getElementsByClassName('infoUsuario')[0];
Portada.setAttribute('src', 'img/' + imagen);
infoPeli.innerHTML = '<h2>' + titulo + '</h2> <br>' + sinopsis;
infoUsuario.innerHTML = '<h3>' + npersonas + ' personas el  ' + dia + ' próximo a las ' + horario + '<br><button type="button"  class="btn btn-success btn-large"  onclick="guardarReserva()">Ir a pagar</button> </h3>';
var contador = 0;

function cargarButacasOcupadas() {
    var uses = document.querySelectorAll("use");

    var reservasLS = JSON.parse(localStorage.getItem("reservas")) || [];

    reservasLS.forEach(element => {
        if (element.idPelicula == datosv.idPelicula) {
            element.horarios.forEach(h => {
                if (h.dia == datosv.dia && h.hora == datosv.hora) {
                    h.asientos.forEach(a => {
                        document.getElementById(a).setAttribute("style", "stroke: #2B2A29;stroke-width: 150;fill: red;");
                    });
                }
            });
        }
    });
}

cargarButacasOcupadas();
agregarid()

function agregarid(){
var uses = document.querySelectorAll("use");
    for (let i = 0,f = 0; i < uses.length; i++) {
        uses[i].setAttribute('id', i);
        uses[i].setAttribute('fila', f);
        if (i % 8 == 0 ) {
            f++;
            
        }
    }
}

function cambiar(b) {
    g = document.getElementById(b);

    if (g.getAttribute('style') == 'stroke: #2B2A29;stroke-width: 150;fill: red;') {

    } else {
        if (contador != npersonas) {
            if (g.getAttribute('style') == 'stroke: #2B2A29;stroke-width: 150;fill: white;') {
                contador++;
                g.setAttribute('style', 'stroke: #2B2A29;stroke-width: 150;fill: green;');

            } else {
                g.setAttribute('style', 'stroke: #2B2A29;stroke-width: 150;fill: white;');
                contador--;
            }
        } else {
            if (g.getAttribute('style') == 'stroke: #2B2A29;stroke-width: 150;fill: green;') {
                g.setAttribute('style', 'stroke: #2B2A29;stroke-width: 150;fill: white;');
                contador--;
            }
        }
    }
}

function pagar() {
    if (contador == npersonas) {
        datosv.asientos =
            window.location.href = 'pago.html'
    }
}

var reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function guardarReserva() {

    if (contador != npersonas) {
        alert("Te faltan " + (npersonas - contador) + " asientos por seleccionar")
    } else if (contador > npersonas) {
        alert("Me estas hackeando")

    } else {
        var idPelicula = datosv.idPelicula;
        var dia = datosv.dia;
        var hora = datosv.hora;
        var asientosReservados = [];

        var asientosReservadosActual = [];

        var uses = document.querySelectorAll("use");
        uses.forEach(element => {
            if (element.getAttribute('style') == "stroke: #2B2A29;stroke-width: 150;fill: green;") {
                asientosReservados.push(element.getAttribute("id"));

                var objetoA = {
                    fila: element.getAttribute('fila'),
                    asiento: element.getAttribute('id')
                }
                asientosReservadosActual.push(objetoA);

            }
        });

        datosv.asientos = asientosReservadosActual;
        localStorage.setItem('peliculaActual', JSON.stringify(datosv));



        var objReservaActual = {
            dia: dia,
            hora: hora,
            asientos: asientosReservados
        }

        var existe = false;
        var existeDia = false;
        reservas.forEach(element => {
            if (element.idPelicula == idPelicula) {
                element.horarios.forEach(h => {
                    if (h.dia == dia && h.hora == hora) {
                        existeDia = true;
                        asientosReservados.forEach(a => {
                            h.asientos.push(a);
                        });
                    }
                });
                if (!existeDia) {
                    element.horarios.push(objReservaActual);
                }
                existe = true;
            }
        });

        if (!existe) {
            var obj = {
                idPelicula: idPelicula,
                horarios: [objReservaActual]
            }
            reservas.push(obj);
        }

        console.log(reservas);


        localStorage.setItem("reservas", JSON.stringify(reservas));
        window.location.href = 'pago.html';
    }
}


// var uses = document.querySelectorAll("use");

// uses.forEach(element => {
//     element.addEventListener("click", () => {
//         console.log(e);

//     },false);
// });