/*
 SERVIDOR EXPRESS para la prueba de concepto de la API
 CONFIGURACIÓN DE MÓDULOS:
 -Se requiere "type": "module" en package.json para usar import
 -Este es el punto de entrada para la API
 */

// importante importar estas librerías
import express from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000; // Puerto donde ANgular debe apuntar


// Configuraciones: Toño respeta estas reglas xfa :) 
/* Cors permite que angular pueda hacer peticiones a este servidor, edto hay que modificarlo despues */
/* el Body-Parser procesa el cuerpo de las peticiones entrantes (POST, PUT) en formato JSON, esto permite leer `req.body` en las rutas */
app.use(cors());
app.use(BodyParser.json());

//Muestra cada petición en la consola del servidor
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


/*
 -Este arreglo simula la base de datos
  Tarea: { id: string, text: string, completed: boolean }
 -Nota para pancho:
  Este código lo vamos a reemplazar por la conexión a MySQL, hay que mantener la persistencia de la logica CRUD
 */
let tar = [
    {id: '1', text: 'Configurar el servidor Node.js y desarrollar la APi', completed: true},
    {id: '2', text: 'Conectar los componentes Angular', completed: false},
    {id: '3', text: 'Conectar el FE/BE con el HttpClient', completed: false}
];

let proxId = 4; //generador de ID 

// rutas api Rest (ahora si se vienen los bugs :D )
const URL_BASE = '/api/tar'; // URL base

/*
 -[GET] /api/tar
 -Toño: Usa esta ruta para obtener la lista completa de tareas al iniciar la app.
 -Retorna 200 OK con el arreglo de tareas
 */
app.get(URL_BASE, (req, res) => {
    res.status(200).json(tar);
});

/*
-[POST] /api/tar
 -Toño: Envía un objeto { text: "Nueva tarea" }
 -Retorna 201 CREATED con el objeto de la nueva tarea para las actualizaciones en angular 
 */
app.post(URL_BASE, (req, res) => {
    const {text: txt} = req.body; //Esto para evitar confusiones 

    if (!txt || typeof txt !== 'string' || txt.trim().length === 0) {
        return res.status(400).json({error: 'Texto inválido. El campo "text" es obligatorio.'});
    }

    const nvaTar = { //nvaTar = Nueva Tarea
        id: (proxId++).toString(),
        text: txt.trim(),
        completed: false
    };

    tar.push(nvaTar);
    res.status(201).json(nvaTar);
});

/*
 -[PUT] /api/tar/:id
 -Toño: Envía el ID en la URL y el cuerpo puede contener { text: string } o { completed: boolean }
 -Retorna 200 OK con el objeto de la tarea actualizada
 */
app.put('/api/tar/:id', (req, res) => {
    const idTar = req.params.id;
    //Se usa 'txt' y 'comp' para consistencia con el POST, extrayendo las claves 'text' y 'completed'
    const {text: txt, completed: comp} = req.body; 
    
    const tarAct = tar.findIndex(i => i.id === idTar);
    
    if (tarAct === -1) {
        return res.status(404).json({error: `Tarea con ID ${idTar} no encontrada`});
    }

    //1109
    if (typeof txt === 'string' && txt.trim().length > 0) {
        tar[tarAct].text = txt.trim();
    }
    
    if (typeof comp === 'boolean') {
        tar[tarAct].completed = comp;
    }
    
    res.status(200).json(tar[tarAct]);
});

/*
 -[DELETE] /api/tar/:id
 -Toño: Llama a esta ruta para eliminar una tarea específica
 -Retorna 204 NO CONTENT si la eliminación fue exitosa
 */
app.delete('/api/tar/:id', (req, res) => {
    const idTar = req.params.id;
    const longTar = tar.length;
    tar = tar.filter(i => i.id !== idTar);
    if (tar.length === longTar) {
        return res.status(404).json({error: `Tarea con ID ${idTar} no encontrada`});
    }

    res.status(204).send();
});

// Inicia el servidor

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`API Base: ${URL_BASE}`);
});
