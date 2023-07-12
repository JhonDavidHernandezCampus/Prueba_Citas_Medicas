import express from 'express';
import conx from './../config/db.js';
const routes = express.Router();

//Obtener todos los pacientes alfabéticamente
routes.get('/orden', (req, res)=>{
    let query = `SELECT * FROM usuario ORDER BY usu_nombre`;
    conx.query(query, (err, respuesta, fil)=>{
        if (err) {
            console.log("error en la consulta");
            res.send({"Message":"Error en la consulta", "Error":err})
        }else{
            res.send(respuesta);
        }
    });
});

export default routes;