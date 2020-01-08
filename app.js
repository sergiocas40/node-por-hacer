/*
- Vamos a capturar el comendo que se agrego en la consola cuando se teclea:
-   cmd: node app crear, listar o actualizar cosa
- este se almacena en el objeto _:['crear']
- Este lo validamos en un Switch
*/

const argv = require('./config/yargs').argv;
const colors = require('colors');

// Exportamos del archivo por-hacer.js la funcion para guardar una tarea
const porHacer = require('./por-hacer/por-hacer');

// Recibimos el comando escrito en consola
let comando = argv._[0];

// Validamos el comando recibido
switch (comando) {

    case 'crear':
        // Llamamos a la funcion porHacer del archivo por-hacer.js 
        // Pasando el nombre de la tarea, esta se encuentra en 
        // argv.descripcion
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':

        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('==========Por hacer=========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('============================='.green);
        }

        break;

    case 'actualizar':
        //Mandamos a llamar a la funcion actualizar cuando se ejecute el comando
        //      cmd -> cmd -> node app actualizar -d Descricpion -c true
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);

        break;

    case 'borrar':

        let borrado = porHacer.borrar( argv.descripcion );
        console.log( borrado );

        break;

    default:
        console.log('Comando no reconocido');
        break;

}