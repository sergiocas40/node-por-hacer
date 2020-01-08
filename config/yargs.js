/*
- Configuramos los comando que podra recibir la aplicacion en consola
- .command('crear', 'Crear un elemento por hacer' donde:
-   crear: es el comando
-   Crear un elemento por hacer: es la descripcion de lo que hace
-   alias: 'd': es lo que ve despues del comando crear
-   El comando seria asi: cmd -> node app crear -d "Esta es una tarea nueva"
*/

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })

/*
- Respecto a lo anterior, entonces este comando seria asi
-   cmd -> node app actualizar -d "Esta es una tarea nueva" -c true
- Si no se especifica -c true, por defecto su valor sera true
*/

.command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion, 
        completado
    })
.command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}