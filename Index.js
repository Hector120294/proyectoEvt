const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Madreteamo012',
    database: 'mi_base_de_datos'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Ruta para servir el formulario
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el guardado de datos
app.post('/guardar', (req, res) => {
    const { fecha, hora, Nombre, Hotel } = req.body;
    const sql = 'INSERT INTO datos (fecha, hora, Nombre, Hotel) VALUES (?, ?, ?, ?)';
    db.query(sql, [fecha, hora, Nombre, Hotel], (err, result) => {
        if (err) throw err;
        res.redirect('/mostrar');
    });
});

// Ruta para mostrar los datos guardados
app.get('/mostrar', (req, res) => {
    const sql = 'SELECT * FROM datos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
