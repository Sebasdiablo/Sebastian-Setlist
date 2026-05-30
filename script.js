let inputCancion = document.getElementById("nombreCancion");
let inputArtista = document.getElementById("artistaCancion");
let inputCapo = document.getElementById("capoCancion");
let inputAcordes = document.getElementById("acordesCancion");
let inputRasgueo = document.getElementById("rasgueoCancion");
let botonAgregar = document.getElementById("botonAgregar");
let cajaCanciones = document.getElementById("cajaCanciones");

let canciones = [];

let datos = localStorage.getItem("canciones");

if (datos != null) {
    canciones = JSON.parse(datos);
}
else {
    canciones = [];
}

function actualizarLista() {
    cajaCanciones.innerHTML = "<h2>Canciones</h2>";

    for (let i = 0; i < canciones.length; i++) {
        let tarjeta = document.createElement("div");
        let titulo = document.createElement("h3");
        let info = document.createElement("div");

        info.style.display = "none";

        titulo.textContent = "▶ " + canciones[i].nombre;
        titulo.addEventListener("click", function() {
            if (info.style.display == "none") {
                info.style.display = "block";
                titulo.textContent = "▼ " + canciones[i].nombre;
            }
            else {
                info.style.display = "none";
                titulo.textContent = "▶ " + canciones[i].nombre;
            }
        });

        let infoArtista = document.createElement("p");
        infoArtista.textContent = "Artista: " + canciones[i].artista;
        let infoCapo = document.createElement("p");
        infoCapo.textContent = "Capo: " + canciones[i].capo;
        let infoAcordes = document.createElement("p");
        infoAcordes.textContent = "Acordes: " + canciones[i].acordes;
        let infoRasgueo = document.createElement("p");
        infoRasgueo.textContent = "Rasgueo: " + canciones[i].rasgueo;

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "ELIMINAR";

        botonEliminar.addEventListener("click", function() {
            canciones.splice(i, 1);
            actualizarLista();
        });

        info.appendChild(infoArtista);
        info.appendChild(infoCapo);
        info.appendChild(infoAcordes);
        info.appendChild(infoRasgueo);
        info.appendChild(botonEliminar);

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(info);

        cajaCanciones.appendChild(tarjeta);
    }

    localStorage.setItem("canciones", JSON.stringify(canciones));
}

actualizarLista()

botonAgregar.addEventListener("click", function() {
    if (inputCancion.value.trim() == "") {
        return;
    }

    let nuevaCancion = {
        nombre: inputCancion.value,
        artista: inputArtista.value,
        capo: inputCapo.value,
        acordes: inputAcordes.value,
        rasgueo: inputRasgueo.value
    }
    canciones.push(nuevaCancion);
    actualizarLista();

    inputCancion.value = "";
    inputArtista.value = "";
    inputCapo.value = "";
    inputAcordes.value = "";
    inputRasgueo.value = "";
});
