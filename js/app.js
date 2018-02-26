
var contenedor = document.getElementsByClassName('containerMovies')[0];
function crearCartas(id, img, titulo) {
    var dvPelicula = document.createElement('div');
    dvPelicula.setAttribute('class', 'pelicula');

    var dvimgPelicula = document.createElement('div');
    dvimgPelicula.setAttribute('class', 'dvimgPelicula');

    var imgPelicula = document.createElement('img');
    imgPelicula.setAttribute('src', 'img/' + img)
    imgPelicula.setAttribute('class', 'imgPelicula');
    dvimgPelicula.appendChild(imgPelicula);
    dvPelicula.appendChild(dvimgPelicula);

    var dvtituloPelicula = document.createElement('div');
    dvtituloPelicula.setAttribute('class', 'tituloPelicula');
    var ptitle = document.createElement('p');
    ptitle.setAttribute('id', 'tituloPelicula');
    ptitle.innerHTML = titulo;

    dvtituloPelicula.appendChild(ptitle);
    dvPelicula.appendChild(dvtituloPelicula);

    var btnReserva = document.createElement('button');
    btnReserva.setAttribute('type', 'button');
    btnReserva.setAttribute('class', 'btn btn-primary');
    btnReserva.setAttribute('data-toggle', 'modal'); //data-target
    btnReserva.setAttribute('data-target', '#modalHorario');
    btnReserva.innerHTML = 'Reservar';
    btnReserva.addEventListener('click', function () {
        cargarModal(id);
    }, false)
    dvPelicula.appendChild(btnReserva);
    contenedor.appendChild(dvPelicula);

}

peliculas.forEach(element => {
    crearCartas(element.id, element.img, element.titulo);
});

function cargarModal(id) {
    var imagenModal = document.getElementById('modimagen');
    var modtitle = document.getElementById('modtitle');
    var modsinopsis = document.getElementById('modsinopsis');
    var modId = document.getElementById('modId');

    //option
    var selectDia = document.getElementById('selectDia');
    var selectHora = document.getElementById('selectHora')

    peliculas.forEach(element => {
        if (id == element.id) {
            imagenModal.setAttribute('src', 'img/' + element.img);
            modtitle.innerHTML = element.titulo;
            modsinopsis.innerHTML = element.sinopsis;
            modId.value = id;

            selectDia.innerHTML = '';

            var optionDefault = document.createElement('option');
            optionDefault.innerHTML = 'Elige día';
            selectDia.appendChild(optionDefault);

            selectDia.addEventListener('change', function () {
                cargarHora(id, selectDia.value);
            }, false)
            element
                .horario
                .forEach(element => {
                    var option = document.createElement('option');
                    option.value = element.dia;
                    option.innerHTML = element.dia;
                    selectDia.appendChild(option);
                });
        }
    });
}
function cargarHora(id, dia) {
    var selectHora = document.getElementById('selectHora');
    selectHora.innerHTML = '';
    var optionDefault = document.createElement('option');
    optionDefault.innerHTML = 'Choose..';
    selectHora.appendChild(optionDefault);
    peliculas.forEach(element => {
        if (id == element.id) {
            element
                .horario
                .forEach(e => {
                    if (dia == e.dia) {
                        e
                            .horas
                            .forEach(h => {
                                var option = document.createElement('option');
                                option.value = h;
                                option.innerHTML = h;
                                selectHora.appendChild(option);

                            });
                    }
                });
        }
    });
}

function peliculaActual() {
    var npersonas = document
        .getElementById('Npersonas')
        .value;
    var modId = document
        .getElementById('modId')
        .value;
    var selectDia = document
        .getElementById('selectDia')
        .value;
    var selectHora = document
        .getElementById('selectHora')
        .value;
    if (npersonas < 1 || npersonas > 10 || selectDia == 'Elige día' || selectHora == 'Choose..') {
        alert('Rellena los campos correctamente');
    } else {
        var objeto = {
            idPelicula: modId,
            personas: npersonas,
            dia: selectDia,
            hora: selectHora,
            asientos: []
        }
        localStorage.setItem('peliculaActual', JSON.stringify(objeto));

        window.location.href = 'asientos.html';
    }

}
