const asociado_input = document.querySelector("#asociado");
const actividad_input = document.querySelector("#actividad");
const wo_input = document.querySelector("#wo");

const add_button = document.querySelector("#add");
const add_submit = document.querySelector("#add_submit");
const delete_button = document.getElementById("delete-all");

const form = document.querySelector('form');

const content_div = document.getElementById("content");

document.addEventListener('DOMContentLoaded', () => {



    // Obtencion de local storage

    const actividades = JSON.parse(localStorage.getItem("actividades"));


    if (actividades === null) {
        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay Actividades Agregadas")

        parrafo.appendChild(text_parrafo);

        content_div.append(parrafo);
    } else {
        
    }

    add_button.addEventListener('click', (e) => {
        
        e.preventDefault();
    })


})