/*
- En este archivo guardaremos las tareas creadas 
*/

const fs = require('fs');

// Areglo donde se guardan las tareas
let listadoPorHacer = [];

// Guardamos la tarea en data.json en formato json
const guardarDB = () => {

    // Convertimos la tarea creada en formato tipo Json
    let data = JSON.stringify(listadoPorHacer);

    // Grabamos 
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

// Funcion = lee los datos de data.json y los guarda en listadoPorHacer
const cargarDB = () => {

    try {

        // Guardamos en listadoPorHacer lo que hay en data.json
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}

/*
- En esta funcion, recibimos el titulo de la tarea
- creamos un objeto ( porHacer ), donde:
- guardamos el titulo
- y la ponemos en false, lo cual indica que no esta terminada
*/

const crear = (descripcion) => {

    // Cargamos la base de datos en el arreglo listadoPorHacer
    // para que se agregue la nueva tarea y despues se guarde
    // en data.json, de esta forma no estamos sobre escribiendo la BD
    cargarDB();


    let porHacer = {
        descripcion,
        completado: false
    };

    // Agregamos el objeto o tarea creada al arreglo listadoPorHacer
    listadoPorHacer.push(porHacer);

    // Llamamos a la funcion guardarDB para guardar la tarea en data.json
    guardarDB();

    // Regresamos el objeto o tarea creada
    return porHacer;

}

// Funcion que devuelve la BD, cuando el comando es:
//      cmd -> node app listar 
const getListado = () => {

    cargarDB();
    return listadoPorHacer;

}

// Funcion que actualiza el campo completado a true/false de una tarea al ejecutar el comando
//      cmd -> node app actualizar -d Descricpion -c true
const actualizar = (descripcion, completado = true) => {
    // Se recibe la descripcion que se quiere cambiar y el valor del comlpletado

    // Lamamos a la funcion que carga en el objeto listadoPorHacer toda la base de datos
    cargarDB();

    // buscamos en listadoPorHacer el ID de la descricion que se recibe en esta funcion
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    // En tarea se guarda cada objeto a la vez del arreglo listadoPorHacer
    // es decir tarea es = a "descripcion":"comer","completado":false
    // y se compara la descripcion de ese objeto con la descripcion recibida
    // -1 indica que no lo encontro

    // Validamos el valor de index
    if (index >= 0) {

        // Actualizamos el campo completado con el valor recibido
        listadoPorHacer[index].completado = completado;

        // Grabamos en la base de datos
        guardarDB();

        return true;

    } else {

        return false;

    }

}

const borrar = ( descripcion ) => {

    // Lamamos a la funcion que carga en el objeto listadoPorHacer toda la base de datos
    cargarDB();

    // Con filter diremos que: del arreglo listadoPorHacer excluya el objeto que cumpla con
    // la misma descripcion que estamos recibiendo, y lo guardamos en un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);

    // Vaolidamos el tamanio de ambos arreglos para saber si se encontro el objeto deseado
    if ( listadoPorHacer.length === nuevoListado.length ) {
        return false
    } else {

        // Si se excluyo el elemento; actualizamos el arreglo listadoPorHacer
        // y actualizamos la base de datos tambien
        listadoPorHacer = nuevoListado
        guardarDB();
        return true;

    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}