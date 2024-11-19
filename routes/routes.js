var express = require("express");
var router = express.Router();
var uploader = require('../config/configMulter.js')

var conexion = require("../db/db");

router.get('/', function (req, res, error) {
    const titulo = "Pagina Restaurante"
    conexion.query("Select * from secciones", function (error, resultados, campos) {
        if (error){
            console.log("Error = " + error);
        }
        
        if (resultados.length < 0) {
            return error;
        }
        
        res.render("pagina.ejs", { titulo, resultados});
    });
})

router.get('/caracteristicasProducto', function (req, res, error) {
    conexion.query("Select * from menu", function (error, resultados, campos) {
        if (error){
            console.log("Error = " + error);
        }
        
        if (resultados.length < 0) {
            return error;
        }
        
        res.render("caracteristicasProducto.ejs", {resultados});
    });
})

router.get('/configuracion', function (req, res, error) {
    const titulo = "Configuración"
    conexion.query("Select * from secciones", function (error, resultados, campos) {
        if (error){
            console.log("Error = " + error);
        }

        if (resultados.length < 0) {
            return error;
        }
        
        res.render("configuracion.ejs", { titulo, resultados});
    });
})

router.get('/tipoPlatos', function (req, res, error) {
    const titulo = "Tipo Platos"
    conexion.query("Select * from tipoPlatos", function (error, resultados, campos) {
        if (error){
            console.log("Error = " + error);
        }

        if (resultados.length < 0) {
            return error;
        }
        
        res.render("tipoPlatos.ejs", { titulo, resultados});
    });
})

// Ruta para manejar la creación de un nuevo menú
router.post('/guardarMenu', uploader.single('file-upload'), (req, res) => {
    // Accede a los campos del formulario
    const { id, nombreSeccion} = req.body;

    // Obtiene el nombre del archivo subido
    const imagen = req.file ? req.file.filename : null; // Esto guardará el nombre del archivo

    // Ejemplo de consulta SQL para insertar los datos en la base de datos
    let sql = `INSERT INTO secciones (nombreSeccion, imagenSeccion) VALUES (?, ?)`;
    if (id > 0)
        sql = `UPDATE secciones SET nombreSeccion=?, imagenSeccion=? WHERE idSeccion = ?`;
    
    conexion.query(sql, [nombreSeccion, imagen, id], (err, result) => {
        if (err) throw err;
        res.redirect('/secciones'); // Redirige a la página donde se muestran los menús
    });
});

router.delete('/eliminarMenu/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM secciones WHERE idSeccion = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el menú');
        }
        console.log('Menú eliminado');
        res.status(200).send('Menú eliminado con éxito');
    });
});

// Ruta para obtener un menú específico por ID
router.get('/getMenu/:id', (req, res) => {
    const id = req.params.id;

    // Consulta para obtener el menú por ID
    const sql = 'SELECT * FROM secciones WHERE idSeccion = ?';
    conexion.query(sql, [id], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el menú' });
        }

        if (resultados.length > 0) {
            res.json(resultados[0]); // Enviar el primer resultado como JSON
        } else {
            res.status(404).json({ error: 'Menú no encontrado' });
        }
    });
});

// Ruta para manejar la creación de un nuevo menú
router.post('/guardarTipoPlato', uploader.single('file-upload'), (req, res) => {
    const { id, nombreTipo, idSeccion } = req.body; // Asegúrate de recibir idSeccion
    const imagen = req.file ? req.file.filename : null;

    let sql = `INSERT INTO tipoPlatos (nombreTipo, imagenTipoPlato, idSeccion) VALUES (?, ?, ?)`;
    if (id > 0)
        sql = `UPDATE tipoPlatos SET nombreTipo=?, imagenTipoPlato=?, idSeccion=? WHERE idTipo=?`;

    conexion.query(sql, [nombreTipo, imagen, idSeccion, id], (err, result) => {
        if (err) throw err;
        res.redirect('/tipoPlatos');
    });
});


router.delete('/eliminarTipoPlato/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM tipoPlatos WHERE idTipo = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el menú');
        }
        console.log('Menú eliminado');
        res.status(200).send('Menú eliminado con éxito');
    });
});

// Ruta para obtener un menú específico por ID
router.get('/getTipoPlato/:id', (req, res) => {
    const id = req.params.id;

    // Consulta para obtener el menú por ID
    const sql = 'SELECT * FROM tipoPlatos WHERE idTipo = ?';
    conexion.query(sql, [id], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el menú' });
        }

        if (resultados.length > 0) {
            res.json(resultados[0]); // Enviar el primer resultado como JSON
        } else {
            res.status(404).json({ error: 'Menú no encontrado' });
        }
    });
});

router.get('/secciones/list', (req, res) => {
    const sql = 'SELECT idSeccion, nombreSeccion FROM secciones';
    conexion.query(sql, (err, resultados) => {
        if (err) throw err;
        res.json(resultados);
    });
});


router.get('/menuDesayunos', function (req, res, error) {
    conexion.query("Select * from menu", function (error, resultados, campos) {
        if (error) throw error;

        if (resultados.length < 0) {
            return error;
        }
        
        res.render("menuDesayunos.ejs", {resultados});
    });

})

router.get('/menus', (req, res) => {
    const titulo = "Menus"

    const sql = `
        SELECT s.nombreSeccion, tp.nombreTipo, tp.imagenTipoPlato
        FROM secciones s
        LEFT JOIN tipoPlatos tp ON s.idSeccion = tp.idSeccion
        ORDER BY s.nombreSeccion;
    `;

    conexion.query(sql, (err, resultados) => {
        if (err) throw err;

        // Organizar los resultados por secciones
        const data = resultados.reduce((acc, row) => {
            const { nombreSeccion, nombreTipo, imagenTipoPlato } = row;
            if (!acc[nombreSeccion]) {
                acc[nombreSeccion] = [];
            }
            acc[nombreSeccion].push({ nombreTipo, imagenTipoPlato });
            return acc;
        }, {});

        res.render('menus', { titulo, data });
    });
});


module.exports = router;