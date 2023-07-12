import express from 'express';
import conx from './../config/db.js';
const router = express.Router();

// Obtener todas las citas alfabéticamente
router.get('/orden', (req, res)=>{
    let query = `SELECT * FROM cita ORDER BY cit_codigo`
    conx.query(query, (err, respuesta, fil)=>{
        if (err) {
            console.log("error en la consulta");
            res.send({"Message":"Error en la consulta", "Error":err})
        }else{
            res.send(respuesta);
        }
    })
})

export default router;