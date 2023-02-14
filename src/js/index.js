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
        render(actividades);
    }

    // BOTON DE AGREGAR
    add_button.addEventListener('click', () => {
        // e.preventDefault();
        // Funcion de agregar elementos
        const actividades = JSON.parse( localStorage.getItem("actividades")) || [];
        const asociado = asociado_input.value;
        const actividad = actividad_input.value;
        const wo = wo_input.value;

        const tareas = {
            "asociado": asociado,
            "actividad": actividad,
            "wo": wo
        }
        actividades.push(tareas);
        localStorage.setItem("actividades", JSON.stringify(actividades))
        //Limpia contenido
        content_div.innerHTML = '';
        // llena contenido del div
        render(actividades);

    })

    // BOTON DE BORRAR TODO EL CONTENIDO
    delete_button.addEventListener('click', () => {
        localStorage.setItem("actividades",JSON.stringify([]));

        content_div.innerHTML = "";

        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay Actividades Agregadas")

        parrafo.appendChild(text_parrafo);
        content_div.append(parrafo);

    })
    function render(actividades){
        for (let i = 0; i < actividades.length; i++) {

            const div_tareas = document.createElement("div");
            const text_actividad_asociado_wo = document.createTextNode(`${actividades[i].asociado}-${actividades[i].actividad}-${actividades[i].wo}`);
            const button_delete = document.createElement("button")
            const text_button_delete = document.createTextNode("Eliminar Actividad");

            button_delete.appendChild(text_button_delete);

            const button_update = document.createElement('button');
            const text_button_update = document.createTextNode('Actualizar');
            button_update.appendChild(text_button_update)
            
            button_delete.onclick = () =>{
                deleteLocalstorage(i,actividades)
            }

            button_update.onclick = () =>{
                // cargar elementos en formulario
                asociado_input.value = actividades[i].asociado;
                actividad_input.value = actividades[i].actividad;
                wo_input.value = actividades[i].wo;

                // Deshabilita boton agregar
                add_button.disabled = true;
                button_update.disabled = true;
                button_delete.disabled = true;
                delete_button.disabled = true;

                // Boton guardar
                const button_save = document.createElement('button');
                const text_button_save = document.createTextNode("Guardar");

                button_save.appendChild(text_button_save)
                button_save.id = i;
                button_save.onclick = (e) => {
                    e.preventDefault();
                    const tareas = {
                        "asociado": asociado_input.value,
                        "actividad": actividad_input.value,
                        "wo": wo_input.value
                    }
                    actividades.splice(i, 1, tareas);
                    localStorage.setItem('actividades', JSON.stringify(actividades));
            
                    content_div.innerHTML = "";
                    render(actividades);

                    button_save.hidden = true;
                    add_button.disabled = false;
                    delete_button.disabled = false;
                }
                form.appendChild(button_save)
            }
            div_tareas.appendChild(text_actividad_asociado_wo);
            div_tareas.appendChild(button_update);
            div_tareas.appendChild(button_delete);
            
            content_div.appendChild(div_tareas);
        }
    }
    function deleteLocalstorage(i,actividades) { 
        actividades.splice(i, 1);
        localStorage.setItem('actividades', JSON.stringify(actividades));
        // primero limpiar
        content_div.innerHTML = '';
        //luego llenar el div
        render(actividades);
    }
})