import express from 'express';
import conx from './../config/db.js';
const router = express.Router();

// Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**):
router.get('/:especialidad', (req, res)=>{
    console.log(req.params.especialidad);
    res.send(req.params)
    let query = `SELECT * FROM medico`;
    conx.query(query, (err, respuesta, fil)=>{
        
    });
})

export default router;