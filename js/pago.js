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
var asientos = datosv.asientos;
peliculas.forEach(element => {
    if (datosv.idPelicula == element.id) {
        imagen = element.img;
        titulo = element.titulo;
        sinopsis = element.sinopsis;

    }
});
var dinero = npersonas*5;

var Portada = document.getElementById('Portada');
var infoPeli = document.getElementsByClassName('infoPeli')[0];
var infoUsuario = document.getElementsByClassName('infoUsuario')[0];
Portada.setAttribute('src', 'img/' + imagen);
infoPeli.innerHTML = '<h2>' + titulo + '</h2> <br>' + sinopsis;
infoUsuario.innerHTML = '<h4>' + npersonas + ' personas el  ' + dia + ' próximo a las ' + horario + '</h4><b>TOTAL: '+dinero+'€</b><br><br>';
var contador = 0;
asientos.forEach(element => {
    infoUsuario.innerHTML += '<b> Fila:'+element.fila+' - Asiento '+element.asiento+'</b><br><br>';
});

function pagar(){
    contador =0;
   var nombre = $('#nombre').val(); 
   var apellido = $('#apellido').val(); 
    var email =  $('#email').val(); 
  var telefono =  $('#telefono').val();
  var cuenta =  $('#cuenta').val(); 
  var CCC =  $('#CCC').val(); 
  var fecha =  $('#fecha').val(); 
    var ar = [];
    ar.push(nombre,apellido,email,telefono,cuenta,CCC,fecha);
    for (let i = 0; i < ar.length; i++) {
        if(ar[i]!= ''){
            contador++;
        }
        
    }
    if(contador == 7){
        $('#modal1').modal('open');
    }
}